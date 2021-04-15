export interface Host {
  id: string; // r3data id
  title: string;
  date?: Date;
  datasets?: string[]; // referenceHashes
}
