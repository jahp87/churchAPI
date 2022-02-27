import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, Schedule, ScheduleRelations} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Schedule.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Schedule, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }

  async getSchedulesByChurch(churchId: string) {
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
        'name DESC'
      ]

    });
  }
}
