import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Access } from "../../domain/access";
import { BackendService } from "../../services/backend.service";
import { FunctionRole } from "../../domain/enum/function-role.enum";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { PersonCardComponent } from "../../widgets/person-card/person-card.component";
import { MatCheckboxChange, MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "damap-access",
  standalone: true,
  imports: [CommonModule, TranslateModule, PersonCardComponent, MatCheckboxModule, MatIconModule],
  templateUrl: "./access.component.html",
  styleUrls: ["./access.component.css"]
})
export class AccessComponent implements OnInit {

  accesses$: Observable<Access[]>;
  id: number;
  readonly accessType: any = FunctionRole;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getAccess(this.id);
    } else {
      this.router.navigate(["/"]);
    }
  }

  private getAccess(id: number) {
    this.accesses$ = this.backendService.getAccess(id);
  }

  editorToggle($event: MatCheckboxChange, access: Access): void {
    if ($event.checked) {
      // create new access
      access.dmpId = this.id;
      access.access = FunctionRole.EDITOR;
      this.backendService.createAccess(access).subscribe(
        { next: (response) => access.id = response.id });
    } else {
      this.backendService.deleteAccess(access.id).subscribe();
    }
  }
}
