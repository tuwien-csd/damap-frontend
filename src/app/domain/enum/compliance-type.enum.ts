export enum ComplianceType {
  INFORMED_CONSENT = 'by gaining informed consent for processing personal data',
  ANONYMISATION = 'by anonymisation of personal data for preservation and/or sharing (truly anonymous data are no longer considered personal data)',
  PSEUDONYMISATION = 'by pseudonymisation of personal data (the main differences with anonymisation is that pseudonymisation is reversible)',
  ENCRYPTION = 'by encryption of personal data (the encryption key must be stored separately from the data, for instance by a trusted third party)',
  OTHER = 'other measures'
}
