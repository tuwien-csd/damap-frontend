import {Component, OnInit} from '@angular/core';
import {Dmp} from '../domain/dmp';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/states/app.state';
import {selectDmps, selectDmpsLoaded} from '../store/selectors/dmp.selectors';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {LoadDmps} from '../store/actions/dmp.actions';
import {DmpListItem} from '../domain/dmp-list-item';
import {BackendService} from '../services/backend.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  userId: string;
  dmps$: Observable<DmpListItem[]>;
  dmpsLoaded$: Observable<boolean>;

  constructor(
    private auth: KeycloakService,
    private store: Store<AppState>,
    private backendService: BackendService
  ) {
    this.dmpsLoaded$ = this.store.pipe(select(selectDmpsLoaded));
    this.dmps$ = this.store.pipe(select(selectDmps));
    this.dmpsLoaded$.subscribe(loaded => {
      if (!loaded) {
        this.auth.loadUserProfile().then(
          p => {
            this.userId = p['attributes']?.tissID?.[0];
            this.getDmps(this.userId);
          }
        );
      }
    })
  }

  ngOnInit() {
  }

  getDmps(userId: string) {
    console.log('Fetch Dmps for id: ' + userId);
    this.store.dispatch(new LoadDmps({userId}));
  }

  getDocument(id: number) {
    return this.backendService.getDmpDocument(id);
  }

  getJsonFile(id: number) {
    return this.backendService.getMaDmpJsonFile(id);
  }

  removeDmp(dmp: Dmp) {
    // todo
  }
}
