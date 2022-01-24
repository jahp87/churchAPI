import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, Prayer, PrayerRelations} from '../models';
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

  async getPrayerByChurch(churchId: string) {
    return this.find({
      where: {
        churchId: churchId
      },
      include: [
        {
          relation: 'church'
        }
      ],
      order: [
        'created DESC'
      ]

    });
  }
}


