export type CommandResult =
  | CommandResultOk
  | CommandResultHelp
  | CommandResultExit;

interface CommandResultOk {
  message: 'OK';
  result: Record<string, any>;
}

interface CommandResultHelp {
  message: 'HELP';
  result: string;
}

interface CommandResultExit {
  message: 'EXIT';
  result: string;
}
