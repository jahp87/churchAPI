import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {CityModel, CityModelRelations} from '../models';

export class CityModelRepository extends DefaultCrudRepository<
  CityModel,
  typeof CityModel.prototype.id,
  CityModelRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(CityModel, dataSource);
  }
}
