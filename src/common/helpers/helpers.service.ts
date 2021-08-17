export abstract class HelpersService {
  abstract createId(): string;

  abstract convertingArgs(
    args: ReadonlyArray<string>,
    currentProperties: ReadonlyArray<string>,
  ): any;
}
