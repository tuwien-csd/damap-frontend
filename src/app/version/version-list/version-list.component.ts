import {Component, OnInit} from '@angular/core';
import {BackendService} from '../../services/backend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Version} from '../../domain/version';
import {Store} from '@ngrx/store';
import {selectDmpById} from '../../store/selectors/dmp.selectors';
import {AppState} from '../../store/states/app.state';
import {DmpListItem} from '../../domain/dmp-list-item';
import {loadDmps} from '../../store/actions/dmp.actions';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.css']
})
export class VersionListComponent implements OnInit {

  versions$: Observable<Version[]>;
  dmp$: Observable<DmpListItem>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private backendService: BackendService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getDmpList();
    this.dmp$ = this.store.select(selectDmpById({id: id}));
    this.getVersions(id);
  }

  getDmpList() {
    this.store.dispatch(loadDmps(false));
  }

  getVersions(id: number) {
    this.versions$ = this.backendService.getDmpVersions(id);
  }

  onViewVersion($event: number) {
    this.router.navigate([$event], {relativeTo: this.route});
  }
}
