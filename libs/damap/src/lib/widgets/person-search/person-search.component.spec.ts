import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  mockContributor1,
  mockContributor2,
} from '../../mocks/contributor-mocks';

import { By } from '@angular/platform-browser';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PersonSearchComponent } from './person-search.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TranslateTestingModule } from '../../testing/translate-testing/translate-testing.module';

describe('PersonSearchComponent', () => {
  let component: PersonSearchComponent;
  let fixture: ComponentFixture<PersonSearchComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
      declarations: [PersonSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSearchComponent);
    component = fixture.componentInstance;
    component.result = [mockContributor1, mockContributor2];
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit contributor on selection', waitForAsync(async () => {
    spyOn(component.personToAdd, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    inputElement.value = mockContributor1.firstName;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const personItems = fixture.debugElement.queryAll(By.css('.person-item'));
    expect(personItems.length).toBe(2);

    personItems[0].triggerEventHandler('click', null);
    expect(component.personToAdd.emit).toHaveBeenCalledWith(mockContributor1);
  }));

  it('should clear results when input is empty', waitForAsync(async () => {
    spyOn(component.termToSearch, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement;
    inputElement.value = 'Some text';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    let personItems = fixture.debugElement.queryAll(By.css('.person-item'));
    expect(personItems.length).toBeGreaterThan(0);

    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    personItems = fixture.debugElement.queryAll(By.css('.person-item'));
    expect(personItems.length).toBe(0);
    expect(component.result.length).toBe(0);
  }));
});
