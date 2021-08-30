import { Injectable } from '@nestjs/common';
import { CurrencyType } from '../../types/currency.type';
import { FaceType } from '../../types/face.type';
import { ParserException } from '../exseption/parser-exception';

@Injectable()
export class PropertyParser {
  parse(value: any, type: string) {
    switch (type) {
      case 'string':
        return PropertyParser.parseString(value);
      case 'number':
        return PropertyParser.parseNumber(value);
      case 'boolean':
        return PropertyParser.parseBoolean(value);
      case 'CurrencyType':
        return PropertyParser.parseCurrencyType(value);
      case 'FaceType':
        return PropertyParser.parseFaceType(value);
      case 'Date':
        return PropertyParser.parseDate(value);
      default:
        throw new ParserException('unknown type');
    }
  }

  private static parseString(value: any): string {
    const string = String(value);

    if (!string && string !== '') {
      throw new ParserException('String parser error');
    }

    return string;
  }

  private static parseNumber(value: any): number {
    const number = Number(value);

    if (!number && number !== 0) {
      throw new ParserException('Number parser error');
    }

    return number;
  }

  private static parseBoolean(value: any): boolean {
    return Boolean(value);
  }

  private static parseCurrencyType(value: any): CurrencyType {
    if (
      value !== CurrencyType.RUB ||
      value !== CurrencyType.USD ||
      value !== CurrencyType.EUR
    ) {
      throw new ParserException('Currency Type parser error');
    }

    return value;
  }

  private static parseFaceType(value: any): FaceType {
    if (value !== FaceType.INDIVIDUAL || value !== FaceType.ENTITY) {
      throw new ParserException('Face Type parser error');
    }

    return value;
  }

  private static parseDate(value: any): Date {
    if (value instanceof Date) return value;

    throw new ParserException('Face Type parser error');
  }
}
