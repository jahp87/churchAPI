import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Evento, EventoRelations, CategoriaEvento, Empresa, Pais, Region, Comuna, Ciudad} from '../models';
import {CategoriaEventoRepository} from './categoria-evento.repository';
import {EmpresaRepository} from './empresa.repository';
import {PaisRepository} from './pais.repository';
import {RegionRepository} from './region.repository';
import {ComunaRepository} from './comuna.repository';
import {CiudadRepository} from './ciudad.repository';

export class EventoRepository extends DefaultCrudRepository<
  Evento,
  typeof Evento.prototype.id,
  EventoRelations
> {

  public readonly categoriaEvento: BelongsToAccessor<CategoriaEvento, typeof Evento.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof Evento.prototype.id>;

  public readonly pais: BelongsToAccessor<Pais, typeof Evento.prototype.id>;

  public readonly region: BelongsToAccessor<Region, typeof Evento.prototype.id>;

  public readonly comuna: BelongsToAccessor<Comuna, typeof Evento.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Evento.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('CategoriaEventoRepository') protected categoriaEventoRepositoryGetter: Getter<CategoriaEventoRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>, @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Evento, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.comuna = this.createBelongsToAccessorFor('comuna', comunaRepositoryGetter,);
    this.registerInclusionResolver('comuna', this.comuna.inclusionResolver);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
    this.categoriaEvento = this.createBelongsToAccessorFor('categoriaEvento', categoriaEventoRepositoryGetter,);
    this.registerInclusionResolver('categoriaEvento', this.categoriaEvento.inclusionResolver);
  }
}
