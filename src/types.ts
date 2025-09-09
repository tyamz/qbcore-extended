export interface JobGrade {
  name: string;
  payment: number;
  isboss?: boolean;
}

export interface Job {
  label: string;
  defaultDuty: boolean;
  offDutyPay: boolean;
  grades: Record<string, JobGrade>;
}

export interface Shared {
  RandomStr(length: number): string;
  RandomInt(length: number): string;
  SplitStr(input: string, separator: string): string[];
  Trim(input: string): string;
  FirstToUpper(input: string): string;
  Round(value: number, numDecimalPlaces?: number): number;
  Jobs: Record<string, Job>;
}

export type CommandHandler = (
  source: number,
  args: string[],
  raw: string,
) => void;

export interface ServerFunctions {
  GetPlayer(source: number): any;
  GetPlayerByCitizenId(citizenId: string): any;
  GetPlayers(): number[];
  GetIdentifier(source: number, idType?: string): string;
}
