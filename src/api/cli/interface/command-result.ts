export interface CommandResult {
  result: Record<string, any> | Record<string, any>[] | string;
  onExit?: boolean;
}
