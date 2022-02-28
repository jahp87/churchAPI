import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Pais, PaisRelations} from '../models';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.id,
  PaisRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(Pais, dataSource);
  }
}
