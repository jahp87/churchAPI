import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, Service, ServiceRelations} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Service.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Service, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }

  async getServicesByChurch(churchId: string) {
    return this.find({
      where: {
        churchId: churchId
      },
      include: [
        {
          relation: 'church'
        }
      ]

    });
  }
}
