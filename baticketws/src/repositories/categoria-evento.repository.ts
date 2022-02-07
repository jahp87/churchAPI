import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {CategoriaEvento, CategoriaEventoRelations} from '../models';

export class CategoriaEventoRepository extends DefaultCrudRepository<
  CategoriaEvento,
  typeof CategoriaEvento.prototype.id,
  CategoriaEventoRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(CategoriaEvento, dataSource);
  }
}
