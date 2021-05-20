import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../store/states/app.state';
import {selectDmps, selectDmpsLoaded} from '../store/selectors/dmp.selectors';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {LoadDmps} from '../store/actions/dmp.actions';
import {DmpListItem} from '../domain/dmp-list-item';
import {BackendService} from '../services/backend.service';
import {LoadingState} from '../domain/enum/loading-state.enum';

@Component({
  selector: 'app-plan',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  userId: string;
  dmps$: Observable<DmpListItem[]> = this.store.pipe(select(selectDmps));
  dmpsLoaded$: Observable<LoadingState> = this.store.pipe(select(selectDmpsLoaded));
  LoadingState = LoadingState;

  constructor(
    private auth: KeycloakService,
    private store: Store<AppState>,
    private backendService: BackendService
  ) {
  }

  ngOnInit() {
    this.dmpsLoaded$.subscribe(loaded => {
      if (loaded === LoadingState.NOT_LOADED) {
        this.auth.loadUserProfile().then(
          p => {
            this.userId = p['attributes']?.tissID?.[0];
            this.getDmps(this.userId);
          }
        );
      }
    })
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
}
