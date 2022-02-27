import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {StateModel, StateModelRelations} from '../models';

export class StateModelRepository extends DefaultCrudRepository<
  StateModel,
  typeof StateModel.prototype.id,
  StateModelRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(StateModel, dataSource);
  }
}
