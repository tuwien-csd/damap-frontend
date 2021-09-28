import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {OAuthService} from 'angular-oauth2-oidc';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('OAuthService', ['getIdentityClaims']);
    spy.getIdentityClaims.and.returnValue({name: 'name', groups: 'groups', preferred_username: 'username'});
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{provide: OAuthService, useValue: spy}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
