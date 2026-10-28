export type PeriodType = "19. вијек" | "прва половина 20. вијека" | "друга половина 20. вијека";

export interface WriterWork {
  title: string;
  year: number | null;
}

export interface WriterQuote {
  text: string;
  work: string;
  year: number;
}

export interface Writer {
  slug: string;
  name: string;
  birthYear: number;
  deathYear: number;
  birthPlace: string;
  period: PeriodType;
  bio: string;
  works: WriterWork[];
  quotes: WriterQuote[];
  image: string;
  imageCredit: string;
  imageLicense: string;
  sources: string[];
  verified: boolean;
}

