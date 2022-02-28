import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {CanalVenta, CanalVentaRelations, CanalVentaEstado} from '../models';
import {CanalVentaEstadoRepository} from './canal-venta-estado.repository';

export class CanalVentaRepository extends DefaultCrudRepository<
  CanalVenta,
  typeof CanalVenta.prototype.id,
  CanalVentaRelations
> {

  public readonly estado: BelongsToAccessor<CanalVentaEstado, typeof CanalVenta.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('CanalVentaEstadoRepository') protected canalVentaEstadoRepositoryGetter: Getter<CanalVentaEstadoRepository>,
  ) {
    super(CanalVenta, dataSource);
    this.estado = this.createBelongsToAccessorFor('estado', canalVentaEstadoRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
  }
}
