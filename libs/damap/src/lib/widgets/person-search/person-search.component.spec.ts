import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSearchComponent} from './person-search.component';
import {TranslateTestingModule} from '../../testing/translate-testing/translate-testing.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {mockContributor1, mockContributor2} from '../../mocks/contributor-mocks';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatAutocompleteHarness} from '@angular/material/autocomplete/testing';

describe('PersonSearchComponent', () => {
  let component: PersonSearchComponent;
  let fixture: ComponentFixture<PersonSearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateTestingModule, MatFormFieldModule, MatInputModule,
        MatIconModule, MatAutocompleteModule, NoopAnimationsModule],
      declarations: [PersonSearchComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSearchComponent);
    component = fixture.componentInstance;
    component.result = [mockContributor1, mockContributor2]
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit contributor on selection', async () => {
    spyOn(component.personToAdd, 'emit');
    const input = await loader.getHarness(MatAutocompleteHarness);
    await input.enterText(mockContributor1.firstName);
    const options = await input.getOptions({text: mockContributor1.firstName + ' ' + mockContributor1.lastName});

    expect(await input.getValue()).toBe(mockContributor1.firstName);
    expect(options.length).toBe(1);
    expect(await options[0].getText()).toBe(`${mockContributor1.firstName} ${mockContributor1.lastName}`);

    await options[0].click();
    expect(component.personToAdd.emit).toHaveBeenCalledWith(mockContributor1);
  })
});
