import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, ChurchModelRelations} from '../models';

export class ChurchModelRepository extends DefaultCrudRepository<
  ChurchModel,
  typeof ChurchModel.prototype.id,
  ChurchModelRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(ChurchModel, dataSource);
  }
}
