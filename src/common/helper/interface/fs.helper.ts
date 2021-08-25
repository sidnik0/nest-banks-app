export abstract class IFsHelper {
  abstract readFile<T>(file: string): { [index: string]: T };
  abstract writeFile(file: string, json: { [index: string]: any }): void;
}
