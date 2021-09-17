export interface CommandResult {
  result: Record<string, any> | Record<string, any>[] | string;
  initStringResult?: string;
  exit?: boolean;
}
