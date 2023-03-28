import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { deleteDmp, loadDmps } from '../../store/actions/dmp.actions';
import {
  selectDmps,
  selectDmpsLoaded,
} from '../../store/selectors/dmp.selectors';

import { AppState } from '../../store/states/app.state';
import { AuthService } from '../../auth/auth.service';
import { BackendService } from '../../services/backend.service';
import { DeleteWarningDialogComponent } from '../../widgets/delete-warning-dialog/delete-warning-dialog.component';
import { DmpListItem } from '../../domain/dmp-list-item';
import { ETemplateType } from '../../domain/enum/export-template-type.enum';
import { ExportWarningDialogComponent } from '../../widgets/export-warning-dialog/export-warning-dialog.component';
import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Funding } from '../../domain/funding';
import { LoadingState } from '../../domain/enum/loading-state.enum';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
  dmps$: Observable<DmpListItem[]> = this.store.pipe(select(selectDmps));
  dmpsLoaded$: Observable<LoadingState> = this.store.pipe(
    select(selectDmpsLoaded)
  );
  LoadingState = LoadingState;
  projectFunding: Funding;
  exportDmpType: ETemplateType;
  dmpForm: FormGroup = this.formService.dmpForm;

  allDmps$: Observable<DmpListItem[]>;

  constructor(
    private store: Store<AppState>,
    private backendService: BackendService,
    private authService: AuthService,
    private formService: FormService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getDmps();

    if (this.isAdmin()) {
      this.getAllDmps();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getDmps() {
    this.store.dispatch(loadDmps(false));
  }

  getDocument(id: number) {
    if (this.dmpForm.controls.funding) {
      this.backendService.getDmpDocument(id);
    } else {
      const dialogRef = this.dialog.open(ExportWarningDialogComponent, {
        data: {
          projectFunding: this.projectFunding,
        },
      });

      dialogRef.componentInstance.projectFunding = this.projectFunding;
      dialogRef.beforeClosed().subscribe(result => {
        if (result === undefined) {
          return;
        } else {
          const template = result;
          if (template) {
            this.exportDmpType = template;
            this.backendService.exportDmpTemplate(id, this.exportDmpType);
          } else {
            this.backendService.getDmpDocument(id);
          }
        }
      });
    }
  }

  getJsonFile(id: number) {
    this.backendService.getMaDmpJsonFile(id);
  }

  deleteDmp(id: number) {
    this.dialog
      .open(DeleteWarningDialogComponent)
      .afterClosed()
      .subscribe({
        next: response => {
          if (response) {
            this.backendService.deleteDmp(id).subscribe({
              next: _ => {
                if (this.isAdmin()) {
                  this.getAllDmps();
                }
                return this.store.dispatch(deleteDmp({ id }));
              },
            });
          }
        },
      });
  }

  private getAllDmps(): void {
    this.allDmps$ = this.backendService.getAllDmps();
  }
}
