import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Layout, LayoutRelations, Recinto} from '../models';
import {RecintoRepository} from './recinto.repository';

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {

  public readonly recinto: BelongsToAccessor<Recinto, typeof Layout.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('RecintoRepository') protected recintoRepositoryGetter: Getter<RecintoRepository>,
  ) {
    super(Layout, dataSource);
    this.recinto = this.createBelongsToAccessorFor('recinto', recintoRepositoryGetter,);
    this.registerInclusionResolver('recinto', this.recinto.inclusionResolver);
  }
}
