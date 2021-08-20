export abstract class CliHelper {
  abstract convertingArgs(
    args: ReadonlyArray<string>,
    properties: ReadonlyArray<string>,
  ): { [i: string]: string };
}
