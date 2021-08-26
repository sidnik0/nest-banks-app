export abstract class CommandInterface {
  abstract execute(params: string[]): Promise<string>;
}
