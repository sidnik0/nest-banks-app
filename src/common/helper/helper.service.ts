export class HelperService {
  createId(): string {
    return Date.now().toString(36);
  }

  convertingArgs(
    args: ReadonlyArray<string>,
    currentProperties: ReadonlyArray<string>,
  ): any {
    const result = {};

    const processedArgs = args.map((item) => {
      const arrayStrings = item.split('=');

      return arrayStrings.map((item) => item.trim());
    });

    processedArgs.forEach((arg) => {
      currentProperties.forEach((property) => {
        if (arg[0] === property) {
          result[arg[0]] = arg[1];
        }
      });
    });

    return result;
  }
}
