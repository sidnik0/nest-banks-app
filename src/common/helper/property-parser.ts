import { Injectable } from '@nestjs/common';
import { CurrencyType } from '../../types/currency.type';
import { FaceType } from '../../types/face.type';
import { ConvertorException } from '../exception/convertor.exception';
import { OperationType } from '../../types/operation.type';

type PropertyParserType = { value?: any; error?: string };

@Injectable()
export class PropertyParser {
  parse(value: any, type: string, returnsAnErrorMessage?: boolean): PropertyParserType {
    switch (type) {
      case 'string':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseString);
      case 'number':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseNumber);
      case 'boolean':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseBoolean);
      case 'CurrencyType':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseCurrencyType);
      case 'FaceType':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseFaceType);
      case 'OperationType':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseOperationType);
      case 'Date':
        return PropertyParser.returnProperty(value, returnsAnErrorMessage, PropertyParser.parseDate);
      case 'help':
        return { value: true };
      default:
        throw new ConvertorException('unknown type');
    }
  }

  private static returnProperty(
    value: any,
    returnsAnErrorMessage: boolean,
    callback: (value: any) => PropertyParserType,
  ): PropertyParserType {
    const parseDate = callback(value);

    if (returnsAnErrorMessage && parseDate.error) {
      throw new ConvertorException(parseDate.error);
    }

    return parseDate;
  }

  private static parseString(value: any): { value?: string; error?: string } {
    if (!value && value !== '') {
      return { error: 'String parser error' };
    }

    return { value: String(value) };
  }

  private static parseNumber(value: any): { value?: number; error?: string } {
    const number = Number(value);

    if (!number && number !== 0) {
      return { error: 'Number parser error' };
    }

    return { value: number };
  }

  private static parseBoolean(value: any): { value?: boolean; error?: string } {
    return { value: Boolean(value) };
  }

  private static parseCurrencyType(value: any): { value?: CurrencyType; error?: string } {
    if (value !== CurrencyType.BYN && value !== CurrencyType.USD && value !== CurrencyType.EUR) {
      return { error: 'Currency Type parser error' };
    }

    return { value };
  }

  private static parseFaceType(value: any): { value?: FaceType; error?: string } {
    if (value !== FaceType.INDIVIDUAL && value !== FaceType.ENTITY) {
      return { error: 'Face Type parser error' };
    }

    return { value };
  }

  private static parseOperationType(value: any): { value?: OperationType; error?: string } {
    if (value !== OperationType.REPLENISHMENT && value !== OperationType.WITHDRAWAL) {
      return { error: 'Operation type parser error' };
    }

    return { value };
  }

  private static parseDate(value: any): { value?: Date; error?: string } {
    const date = new Date(value);

    if (date.toString() === 'Invalid Date') {
      return { error: 'Date parser error: Invalid Date' };
    }

    return { value: date };
  }
}
