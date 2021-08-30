export interface CommandResult {
  result: Record<string, any> | string;
  onExit?: boolean;
}
