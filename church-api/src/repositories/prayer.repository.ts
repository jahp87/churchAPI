import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Prayer, PrayerRelations, ChurchModel} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class PrayerRepository extends DefaultCrudRepository<
  Prayer,
  typeof Prayer.prototype.id,
  PrayerRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Prayer.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Prayer, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }
}
