import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserProfileModel, UserProfileModelRelations} from '../models';

export class UserProfileModelRepository extends DefaultCrudRepository<
  UserProfileModel,
  typeof UserProfileModel.prototype.id,
  UserProfileModelRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(UserProfileModel, dataSource);
  }
}
