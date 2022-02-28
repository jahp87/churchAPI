import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Empresa, EmpresaRelations} from '../models';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(Empresa, dataSource);
  }
}
