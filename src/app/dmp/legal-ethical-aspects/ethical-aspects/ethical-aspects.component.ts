import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-ethical-aspects',
  templateUrl: './ethical-aspects.component.html',
  styleUrls: ['./ethical-aspects.component.css']
})
export class EthicalAspectsComponent implements OnInit {

  @Input() legalEthicalStep: FormGroup;

  questions = [
    {
      label: 'Will you involve human participants in the project and thereby collect or process their personal data?',
      model: 'humanParticipants',
      comment: 'The participation may include activities such as interviews, prototype testing, observations, surveys, etc.'
    },
    {
      label: 'Beyond the use of sensitive personal data, are there any other ethical issues associated with your research? ',
      model: 'ethicalIssues',
      comment: 'For example: Your research involves human embryos, foetuses, cells or tissues, animals, activities ' +
        'that may adversely affect the environment or the health and safety of involved persons, artificial intelligence, ' +
        'activities outside the EU, or there are dual use or misuse aspects that must be addressed.'
    },
    {
      label: 'Was your research plan reviewed by an ethics committee, the TU Wien Pilot Research Ethics Committee, or a similar body?',
      model: 'committeeReviewed',
      comment: ''
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
