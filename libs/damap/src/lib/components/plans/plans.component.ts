import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/states/app.state';
import {selectDmps, selectDmpsLoaded} from '../../store/selectors/dmp.selectors';
import {Observable} from 'rxjs';
import {loadDmps} from '../../store/actions/dmp.actions';
import {DmpListItem} from '../../domain/dmp-list-item';
import {BackendService} from '../../services/backend.service';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {AuthService} from '../../auth/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {ExportWarningDialogComponent} from "../../widgets/export-warning-dialog/export-warning-dialog.component";

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  dmps$: Observable<DmpListItem[]> = this.store.pipe(select(selectDmps));
  dmpsLoaded$: Observable<LoadingState> = this.store.pipe(select(selectDmpsLoaded));
  LoadingState = LoadingState;

  allDmps$: Observable<DmpListItem[]>;

  constructor(
    private store: Store<AppState>,
    private backendService: BackendService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.getDmps();

    if (this.isAdmin()) {
      this.allDmps$ = this.getAllDmps();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getDmps() {
    this.store.dispatch(loadDmps(true));
  }

  private getAllDmps(): Observable<DmpListItem[]> {
    return this.backendService.getAllDmps();
  }

  getDocument(id: number) {
    this.dialog.open(ExportWarningDialogComponent).afterClosed().subscribe(
      _ => this.backendService.getDmpDocument(id)
    );
  }

  getJsonFile(id: number) {
    this.dialog.open(ExportWarningDialogComponent).afterClosed().subscribe(
      _ => this.backendService.getMaDmpJsonFile(id)
    );
  }
}
