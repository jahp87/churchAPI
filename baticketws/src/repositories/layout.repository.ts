import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Layout, LayoutRelations, Empresa, Evento, EventoLayoutRelation} from '../models';
import {EmpresaRepository} from './empresa.repository';
import {EventoLayoutRelationRepository} from './evento-layout-relation.repository';
import {EventoRepository} from './evento.repository';

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Layout.prototype.id>;

  public readonly eventos: HasManyThroughRepositoryFactory<Evento, typeof Evento.prototype.id,
          EventoLayoutRelation,
          typeof Layout.prototype.id
        >;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('EventoLayoutRelationRepository') protected eventoLayoutRelationRepositoryGetter: Getter<EventoLayoutRelationRepository>, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>,
  ) {
    super(Layout, dataSource);
    this.eventos = this.createHasManyThroughRepositoryFactoryFor('eventos', eventoRepositoryGetter, eventoLayoutRelationRepositoryGetter,);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
