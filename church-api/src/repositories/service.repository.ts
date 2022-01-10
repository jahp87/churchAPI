import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {Service, ServiceRelations} from '../models';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.id,
  ServiceRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(Service, dataSource);
  }
}
