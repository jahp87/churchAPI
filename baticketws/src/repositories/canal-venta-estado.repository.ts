import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {CanalVentaEstado, CanalVentaEstadoRelations} from '../models';

export class CanalVentaEstadoRepository extends DefaultCrudRepository<
  CanalVentaEstado,
  typeof CanalVentaEstado.prototype.id,
  CanalVentaEstadoRelations
> {
  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource,
  ) {
    super(CanalVentaEstado, dataSource);
  }
}
