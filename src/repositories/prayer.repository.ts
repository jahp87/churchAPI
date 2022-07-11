import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Prayer, PrayerRelations, TypePrayer} from '../models';
import {TypePrayerRepository} from './type-prayer.repository';

export class PrayerRepository extends DefaultCrudRepository<
  Prayer,
  typeof Prayer.prototype.id,
  PrayerRelations
> {

  public readonly typePrayer: BelongsToAccessor<TypePrayer, typeof Prayer.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('TypePrayerRepository') protected typePrayerRepositoryGetter: Getter<TypePrayerRepository>,
  ) {
    super(Prayer, dataSource);
    this.typePrayer = this.createBelongsToAccessorFor('typePrayer', typePrayerRepositoryGetter,);
    this.registerInclusionResolver('typePrayer', this.typePrayer.inclusionResolver);
  }
}
