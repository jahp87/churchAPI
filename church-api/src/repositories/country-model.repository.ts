import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {CountryModel, CountryModelRelations} from '../models';

export class CountryModelRepository extends DefaultCrudRepository<
  CountryModel,
  typeof CountryModel.prototype.id,
  CountryModelRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(CountryModel, dataSource);
  }
}
