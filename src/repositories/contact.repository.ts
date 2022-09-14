import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, Contact, ContactRelations} from '../models';
import {ChurchModelRepository} from './church-model.repository';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {

  public readonly church: BelongsToAccessor<ChurchModel, typeof Contact.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(Contact, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter,);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
  }

  async getContactByChurch(churchId: string) : Promise<Contact | null> {
    return this.findOne({
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
