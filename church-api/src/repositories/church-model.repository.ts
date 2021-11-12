import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, ChurchModelRelations, CityModel, CountryModel, StateModel} from '../models';
import {CityModelRepository} from './city-model.repository';
import {CountryModelRepository} from './country-model.repository';
import {StateModelRepository} from './state-model.repository';

export class ChurchModelRepository extends DefaultCrudRepository<
  ChurchModel,
  typeof ChurchModel.prototype.id,
  ChurchModelRelations
> {

  public readonly city: BelongsToAccessor<CityModel, typeof ChurchModel.prototype.id>;

  public readonly country: BelongsToAccessor<CountryModel, typeof ChurchModel.prototype.id>;

  public readonly state: BelongsToAccessor<StateModel, typeof ChurchModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('CityModelRepository') protected cityModelRepositoryGetter: Getter<CityModelRepository>, @repository.getter('CountryModelRepository') protected countryModelRepositoryGetter: Getter<CountryModelRepository>, @repository.getter('StateModelRepository') protected stateModelRepositoryGetter: Getter<StateModelRepository>,
  ) {
    super(ChurchModel, dataSource);
    this.state = this.createBelongsToAccessorFor('state', stateModelRepositoryGetter,);
    this.registerInclusionResolver('state', this.state.inclusionResolver);
    this.country = this.createBelongsToAccessorFor('country', countryModelRepositoryGetter,);
    this.registerInclusionResolver('country', this.country.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityModelRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
  }
}
