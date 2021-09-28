import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutComponent} from './layout.component';
import {OAuthService} from 'angular-oauth2-oidc';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('OAuthService', ['getIdentityClaims']);
    spy.getIdentityClaims.and.returnValue({name: 'name'});
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [{provide: OAuthService, useValue: spy}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
