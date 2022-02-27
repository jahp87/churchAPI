import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, Preach, PreachRelations} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class PreachRepository extends DefaultCrudRepository<
  Preach,
  typeof Preach.prototype.id,
  PreachRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Preach.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Preach, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }

  async getPreachByChurch(churchId: string) {
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


