export interface LicenseDetails {
  name: string;
  priority: number;
  available: boolean;
  url: string;
  description: string;
  categories: string[];
  labels: string[];
  code?: string;
  compatibility?: string[];
}
