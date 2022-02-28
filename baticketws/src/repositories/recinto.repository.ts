import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Recinto, RecintoRelations, Pais, Region, Comuna, Ciudad, Empresa} from '../models';
import {PaisRepository} from './pais.repository';
import {RegionRepository} from './region.repository';
import {ComunaRepository} from './comuna.repository';
import {CiudadRepository} from './ciudad.repository';
import {EmpresaRepository} from './empresa.repository';

export class RecintoRepository extends DefaultCrudRepository<
  Recinto,
  typeof Recinto.prototype.id,
  RecintoRelations
> {

  public readonly pais: BelongsToAccessor<Pais, typeof Recinto.prototype.id>;

  public readonly region: BelongsToAccessor<Region, typeof Recinto.prototype.id>;

  public readonly comuna: BelongsToAccessor<Comuna, typeof Recinto.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Recinto.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof Recinto.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>, @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Recinto, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
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
