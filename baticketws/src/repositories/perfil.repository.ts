import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Perfil, PerfilRelations, User, Departamento, Pais, Region, Comuna} from '../models';
import {UserRepository} from './user.repository';
import {DepartamentoRepository} from './departamento.repository';
import {PaisRepository} from './pais.repository';
import {RegionRepository} from './region.repository';
import {ComunaRepository} from './comuna.repository';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.id,
  PerfilRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Perfil.prototype.id>;

  public readonly departamento: BelongsToAccessor<Departamento, typeof Perfil.prototype.id>;

  public readonly pais: BelongsToAccessor<Pais, typeof Perfil.prototype.id>;

  public readonly region: BelongsToAccessor<Region, typeof Perfil.prototype.id>;

  public readonly comuna: BelongsToAccessor<Comuna, typeof Perfil.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>, @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>,
  ) {
    super(Perfil, dataSource);
    this.comuna = this.createBelongsToAccessorFor('comuna', comunaRepositoryGetter,);
    this.registerInclusionResolver('comuna', this.comuna.inclusionResolver);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
