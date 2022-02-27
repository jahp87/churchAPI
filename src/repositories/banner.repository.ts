import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Banner, BannerRelations, ChurchModel} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class BannerRepository extends DefaultCrudRepository<
  Banner,
  typeof Banner.prototype.id,
  BannerRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Banner.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Banner, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }
}
