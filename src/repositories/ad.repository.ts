import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Ad, AdRelations, ChurchModel} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class AdRepository extends DefaultCrudRepository<
  Ad,
  typeof Ad.prototype.id,
  AdRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Ad.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Ad, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }
}
