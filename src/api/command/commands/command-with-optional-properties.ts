import { Command } from './command';

export abstract class CommandWithOptionalProperties extends Command {
  protected optionalProperties: Record<string, string>;

  protected parseOptionalProperties<T>(properties: Map<string, string>): T {
    if (!this.optionalProperties) return null;

    const obj: Record<string, any> = {};

    for (const prop of Object.keys(this.optionalProperties)) {
      if (!properties.has(prop)) continue;

      obj[prop] = this.propertyParser.parse(
        properties.get(prop),
        this.optionalProperties[prop],
      );
    }

    return obj as T;
  }
}
