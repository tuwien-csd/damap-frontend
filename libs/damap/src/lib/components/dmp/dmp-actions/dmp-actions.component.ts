import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  createDmp,
  exportDmp,
  exportDmpTemplate,
  saveDmpVersion,
  updateDmp
} from '../../../store/actions/dmp.actions';

import { AppState } from '../../../store/states/app.state';
import { ETemplateType } from '../../../domain/enum/export-template-type.enum';
import { ExportWarningDialogComponent } from '../../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../../services/form.service';
import { Project } from '../../../domain/project';
import { selectDmpSaving } from '../../../store/selectors/dmp.selectors';
import { selectFormChanged } from '../../../store/selectors/form.selectors';

@Component({
  selector: 'app-actions',
  templateUrl: './dmp-actions.component.html',
  styleUrls: ['./dmp-actions.component.css'],
})
export class DmpActionsComponent implements OnInit, OnDestroy {
  @Input() stepChanged$: Subject<any>;
  @Input() admin = false;
  projectFunding: Project;

  dmpForm: FormGroup = this.formService.dmpForm;

  formChanged$: Observable<boolean>;
  formChanged: boolean;
  savingDmp$: Observable<boolean>;
  savingDmp: boolean;

  exportDmpType: ETemplateType;

  private subscriptions: Subscription[] = [];

  constructor(
    private formService: FormService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formChanged$ = this.store.pipe(select(selectFormChanged));
    this.savingDmp$ = this.store.pipe(select(selectDmpSaving));
    this.subscriptions.push(
      this.formChanged$.subscribe(value => (this.formChanged = value))
    );
    this.subscriptions.push(
      this.savingDmp$.subscribe(value => (this.savingDmp = value))
    );
    // Prevent autosave for admins
    if (!this.admin) {
      this.subscriptions.push(this.stepChanged$.subscribe(_ => this.saveDmp()));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  saveDmp() {
    if (this.dmpForm.valid && this.formChanged && !this.savingDmp) {
      const dmp = this.formService.exportFormToDmp();
      if (this.dmpForm.value.id) {
        this.store.dispatch(updateDmp({ dmp }));
      } else {
        this.store.dispatch(createDmp({ dmp }));
      }
    }
  }

  saveDmpVersion(): void {
    const dialogRef = this.dialog.open(SaveVersionDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(versionName => {
      if (versionName) {
        this.store.dispatch(
          saveDmpVersion({
            dmp: this.formService.exportFormToDmp(),
            versionName,
          })
        );
      }
    });
  }

  exportDmpTemplate(): void {
    if (this.projectFunding) {
      this.store.dispatch(
        exportDmp({ dmp: this.formService.exportFormToDmp() })
      );
    } else {
      const dialogRef = this.dialog.open(ExportWarningDialogComponent, {
        data: {
          projectFunding: this.projectFunding,
        },
      });
  
      dialogRef.componentInstance.projectFunding = this.projectFunding;
  
      dialogRef.afterClosed().subscribe(template => {
        if (template) {
          this.exportDmpType = template;
          this.store.dispatch(
            exportDmpTemplate({
              dmp: this.formService.exportFormToDmp(),
              dmpTemplateType: this.exportDmpType,
            })
          );
        } else {
          this.store.dispatch(
            exportDmp({ dmp: this.formService.exportFormToDmp() })
          );
        }
      });
  
      dialogRef.backdropClick().subscribe(() => {
        dialogRef.close();
        this.store.dispatch(
          exportDmp({ dmp: this.formService.exportFormToDmp() })
        );
      });
    }
  }
}
  

@Component({
  selector: 'app-save-version-dialog',
  templateUrl: 'save-version-dialog.html',
  styleUrls: ['./dmp-actions.component.css'],
})
export class SaveVersionDialogComponent {
  versionName = '';

  constructor(public dialogRef: MatDialogRef<SaveVersionDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
