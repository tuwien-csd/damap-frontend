import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { Contributor } from "../../domain/contributor";
import { IdentifierType } from "../../domain/enum/identifier-type.enum";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { OrcidModule } from "../orcid/orcid.module";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'damap-person-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatCardModule, MatIconModule, OrcidModule],
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css'],
})
export class PersonCardComponent {

  @Input() person: Contributor;

  readonly identifierType: any = IdentifierType;
}
