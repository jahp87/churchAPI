import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, Vineyard, VineyardRelations} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class VineyardRepository extends DefaultCrudRepository<
  Vineyard,
  typeof Vineyard.prototype.id,
  VineyardRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Vineyard.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Vineyard, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }

  async getVineyardByChurch(churchId: string) {
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
        'image DESC'
      ]

    });
  }
}
