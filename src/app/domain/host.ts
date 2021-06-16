export interface Host {
  readonly id: number;
  hostId: string; // r3data id
  title: string;
  date?: Date;
  datasets?: string[]; // referenceHashes
}
