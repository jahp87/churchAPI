import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Promotor, PromotorRelations, Pais, Region, Comuna, Ciudad, Departamento, User} from '../models';
import {PaisRepository} from './pais.repository';
import {RegionRepository} from './region.repository';
import {ComunaRepository} from './comuna.repository';
import {CiudadRepository} from './ciudad.repository';
import {DepartamentoRepository} from './departamento.repository';
import {UserRepository} from './user.repository';

export class PromotorRepository extends DefaultCrudRepository<
  Promotor,
  typeof Promotor.prototype.id,
  PromotorRelations
> {

  public readonly pais: BelongsToAccessor<Pais, typeof Promotor.prototype.id>;

  public readonly region: BelongsToAccessor<Region, typeof Promotor.prototype.id>;

  public readonly comuna: BelongsToAccessor<Comuna, typeof Promotor.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Promotor.prototype.id>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Promotor.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Promotor.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>, @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Promotor, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.comuna = this.createBelongsToAccessorFor('comuna', comunaRepositoryGetter,);
    this.registerInclusionResolver('comuna', this.comuna.inclusionResolver);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
  }
}
