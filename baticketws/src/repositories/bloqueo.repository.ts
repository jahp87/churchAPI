import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Bloqueo, BloqueoRelations} from '../models';

export class BloqueoRepository extends DefaultCrudRepository<
  Bloqueo,
  typeof Bloqueo.prototype.id,
  BloqueoRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(Bloqueo, dataSource);
  }
}
