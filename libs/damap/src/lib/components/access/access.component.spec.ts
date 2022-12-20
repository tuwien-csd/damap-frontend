import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AccessComponent } from "./access.component";
import { InfoMessageModule } from "../../widgets/info-message/info-message.module";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { PersonCardComponent } from "../../widgets/person-card/person-card.component";
import { BackendService, TranslateTestingModule } from "@damap/core";
import { ActivatedRoute } from "@angular/router";
import { mockAccess } from "../../mocks/access-mocks";
import { completeDmp } from "../../mocks/dmp-mocks";
import { EMPTY, of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";

describe("AccessComponent", () => {
  let component: AccessComponent;
  let fixture: ComponentFixture<AccessComponent>;
  let backendSpy;

  beforeEach(async () => {
    backendSpy = jasmine.createSpyObj("BackendService",
      ["getDmpById", "getAccess", "createAccess", "deleteAccess"]);
    backendSpy.getDmpById.and.returnValue(of([completeDmp]));
    backendSpy.getAccess.and.returnValue(of([mockAccess]));
    await TestBed.configureTestingModule({
      imports: [
        AccessComponent, TranslateTestingModule,
        PersonCardComponent, InfoMessageModule,
        RouterTestingModule.withRoutes([]),
        MatButtonModule, MatCheckboxModule, MatIconModule],
      providers: [
        { provide: BackendService, useValue: backendSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (id: number) => mockAccess.dmpId } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create editor", () => {
    backendSpy.createAccess.and.returnValue(of(mockAccess));
    const $event = new MatCheckboxChange();
    $event.checked = true;
    component.editorToggle($event, mockAccess);
    expect(backendSpy.createAccess).toHaveBeenCalledTimes(1);
  });

  it("should delete editor", () => {
    backendSpy.deleteAccess.and.returnValue(EMPTY);
    const $event = new MatCheckboxChange();
    $event.checked = false;
    component.editorToggle($event, mockAccess);
    expect(backendSpy.deleteAccess).toHaveBeenCalledOnceWith(mockAccess.id);
  });
});
