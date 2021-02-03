export interface Dataset {
  title: string;
  type: any;
  size: any;
  comment: string;
  publish: boolean;
  license: string;
  startDate: Date;
  referenceHash: string; // user ID + timestamp hash
}
