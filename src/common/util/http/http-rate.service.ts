import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface RateType {
  rubUsd: number;
  rubEur: number;
  usdEur: number;
}

@Injectable()
export class HttpRateService {
  constructor(private readonly httpService: HttpService) {}

  async getRates(): Promise<RateType> {
    const allRates = await this.httpService
      .get('https://belarusbank.by/api/kursExchange?city=%D0%93%D1%80%D0%BE%D0%B4%D0%BD%D0%BE')
      .toPromise();

    const { USD_in, EUR_in, USD_EUR_in } = allRates.data[0];

    const rubUsd = HttpRateService.getScaleRate(USD_in);
    const rubEur = HttpRateService.getScaleRate(EUR_in);
    const usdEur = HttpRateService.getScaleRate(USD_EUR_in);

    return { rubUsd, rubEur, usdEur };
  }

  private static getScaleRate(rate: string): number {
    const number = Number(rate);

    if (!number && number !== 0) {
      return 1;
    }

    return Math.round(number * 100) / 100;
  }
}
