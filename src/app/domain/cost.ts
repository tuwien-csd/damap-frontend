export interface Cost {
  readonly id?: number;
  title: string;
  value: number;
  currency_code: string; // controlled vocabulary: ISO 4217
  description?: string;
  type?: string; // controlled vocabulary: tbd
}
