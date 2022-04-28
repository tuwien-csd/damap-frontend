import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../domain/project';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manual-project-input',
  templateUrl: './manual-project-input.component.html',
  styleUrls: ['./manual-project-input.component.css']
})
export class ManualProjectInputComponent implements OnChanges {

  @Input() project: Project;
  @Output() projectUpdate = new EventEmitter<Project>();

  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    description: new FormControl('', [Validators.maxLength(4000)]),
    start: new FormControl(null),
    end: new FormControl(null)
  })

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.project && !this.project?.universityId) {
      this.form.patchValue(this.project);
    }
  }

  updateProject(): void {
    const project = this.form.getRawValue();
    this.projectUpdate.emit(project);
  }

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
