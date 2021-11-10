import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
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

  public readonly cityModel: BelongsToAccessor<CityModel, typeof ChurchModel.prototype.id>;

  public readonly stateModel: BelongsToAccessor<StateModel, typeof ChurchModel.prototype.id>;

  public readonly countryModel: BelongsToAccessor<CountryModel, typeof ChurchModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('CityModelRepository') protected cityModelRepositoryGetter: Getter<CityModelRepository>, @repository.getter('StateModelRepository') protected stateModelRepositoryGetter: Getter<StateModelRepository>, @repository.getter('countryModelRepository') protected countryModelRepositoryGetter: Getter<CountryModelRepository>,
  ) {
    super(ChurchModel, dataSource);
    this.countryModel = this.createBelongsToAccessorFor('countryModel', countryModelRepositoryGetter,);
    this.registerInclusionResolver('countryModel', this.countryModel.inclusionResolver);
    this.stateModel = this.createBelongsToAccessorFor('stateModel', stateModelRepositoryGetter,);
    this.registerInclusionResolver('stateModel', this.stateModel.inclusionResolver);
    this.cityModel = this.createBelongsToAccessorFor('cityModel', cityModelRepositoryGetter,);
    this.registerInclusionResolver('cityModel', this.cityModel.inclusionResolver);
  }
}
