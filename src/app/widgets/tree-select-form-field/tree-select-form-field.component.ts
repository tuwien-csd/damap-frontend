import {Component, ElementRef, Injectable, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

/* TODO:
*   - Tests
*   - Accessibility
*/

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  item: { id: string, label: string };
  visible: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  item: { id: string, label: string };
  level: number;
  visible: boolean;
  expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
  }

  initialize(TREE_DATA: any) {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: { id: string, label: string, children?: any } }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const node = new TodoItemNode();
      node.item = {id: obj[key].id, label: obj[key].label};
      node.visible = true;

      if (obj[key].children) {
        node.children = this.buildFileTree(obj[key].children, level + 1);
      }

      return accumulator.concat(node);
    }, []);
  }

  /**
   * Notify tree data change when searching
   */
  filterTree() {
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-tree-select-form-field',
  templateUrl: './tree-select-form-field.component.html',
  styleUrls: ['./tree-select-form-field.component.css'],
  providers: [ChecklistDatabase]
})
export class TreeSelectFormFieldComponent implements OnInit {

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  treeControl: FlatTreeControl<TodoItemFlatNode>;

  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  searchFilter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Input() label: string;
  @Input() treeData: any;

  @Output() params = new EventEmitter<string[]>();

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);
  /**
   * The selection used for the form field and GET query
   * Stores selected top nodes only
   */
  selectionList: TodoItemFlatNode[] = [];

  @ViewChild('treeselect') treeSelect: ElementRef<HTMLDivElement>;
  @ViewChild('input') treeInput: ElementRef<HTMLInputElement>;
  showTree = false;

  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    // Update form field selection
    this.checklistSelection.changed.pipe(
      debounceTime(50) // emits twice on change
    ).subscribe(
      _ => {
        this.setFocus();
        this.setSelectionList();
        this.updateAndEmitParams();
      }
    );
  }

  ngOnInit(): void {
    if (this.treeData) {
      this._database.initialize(this.treeData);
    }
    this._database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
    this.searchFilter.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(text => {
          const data = this._database.data;
          for (const node of data) {
            this.filterTree(node, text);
          }
          this._database.filterTree();
        }
      );
  }

  getLevel = (node: TodoItemFlatNode) => node.level;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item.label === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new TodoItemFlatNode();
    flatNode.item = node.item;
    flatNode.visible = node.visible;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  /** Set focus to input field */
  private setFocus() {
    this.treeInput.nativeElement.focus();
  }

  /** Find top nodes in checklistSelection and store them in selectionList */
  private setSelectionList() {
    this.selectionList = [];
    for (const item of this.checklistSelection.selected) {
      const parent = this.getParentNode(item);
      if (parent == null || !this.checklistSelection.selected.includes(parent)) {
        this.selectionList.push(item);
      }
    }
  }

  private updateAndEmitParams() {
    const params: string[] = [];
    for (const item of this.selectionList) {
      params.push(item.item.id);
    }
    this.params.emit(params);
  }

  showTreeSelection() {
    this.showTree = this.treeSelect.nativeElement.matches(':focus-within');
  }

  applyFilter(event: Event) {
    let filterText = (event.target as HTMLInputElement).value;
    filterText = filterText == null ? '' : filterText;
    this.searchFilter.next(filterText);
  }

  private filterTree(node: TodoItemNode, filterText: string) {
    node.visible = node.item.label.toLowerCase().includes(filterText.toLowerCase())
    if (!node.visible && node.children) {
      for (const child of node.children) {
        if (child.children) {
          this.filterTree(child, filterText);
        } else {
          child.visible = child.item.label.toLowerCase().includes(filterText.toLowerCase());
        }
        node.visible = child.visible || node.visible;
      }
    }
  }
}
