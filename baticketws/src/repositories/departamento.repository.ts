import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations} from '../models';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
