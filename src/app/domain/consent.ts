export interface Consent {
  readonly id: number;
  readonly universityId: string;
  consentGiven: boolean;
  givenDate: Date;
}
