export class Dataset {
  private id: number;
  private title: string;
  private description: string;
  private language;
  private datasetType;
  private datasetId;
  private datasetIdType;
  private personalData: boolean;
  private sensitiveData: boolean;
  private preservationStatement: string;
  private dataQualityAssurance: string[];
  private distribution;
  private keyword: string[];
  // private issued: Date;
  private metadata;
  private securityAndPrivacy: string[][];
  private technicalResource;

  setTitle(title: string): void {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }
}
