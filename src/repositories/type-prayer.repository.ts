import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {TypePrayer, TypePrayerRelations} from '../models';

export class TypePrayerRepository extends DefaultCrudRepository<
  TypePrayer,
  typeof TypePrayer.prototype.id,
  TypePrayerRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(TypePrayer, dataSource);
  }
}
