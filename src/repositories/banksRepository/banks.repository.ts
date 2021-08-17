import { BanksModelFs } from '../../models/banksModel/banks.model.fs';

export abstract class BanksRepository {
  abstract create(createData: BanksModelFs): Promise<BanksModelFs>;
  abstract getById(idBank: string): Promise<BanksModelFs>;
  abstract get(): Promise<Array<BanksModelFs>>;
  abstract updateById(
    idBank: string,
    updateData: BanksModelFs,
  ): Promise<BanksModelFs>;
  abstract deleteById(idBank: string): Promise<void>;
}
