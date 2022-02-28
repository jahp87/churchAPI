import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Comuna} from '../models';
import {ComunaRepository} from './comuna.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly comuna: BelongsToAccessor<Comuna, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.comuna = this.createBelongsToAccessorFor('comuna', comunaRepositoryGetter,);
    this.registerInclusionResolver('comuna', this.comuna.inclusionResolver);
  }
}
