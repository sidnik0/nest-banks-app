export abstract class CommandInterface {
  abstract execute(params: { [i: string]: string }[]): Promise<string>;
}
