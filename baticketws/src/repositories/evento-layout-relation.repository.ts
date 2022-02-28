import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {EventoLayoutRelation, EventoLayoutRelationRelations, Evento, Layout} from '../models';
import {EventoRepository} from './evento.repository';
import {LayoutRepository} from './layout.repository';

export class EventoLayoutRelationRepository extends DefaultCrudRepository<
  EventoLayoutRelation,
  typeof EventoLayoutRelation.prototype.id,
  EventoLayoutRelationRelations
> {

  public readonly evento: BelongsToAccessor<Evento, typeof EventoLayoutRelation.prototype.id>;

  public readonly layout: BelongsToAccessor<Layout, typeof EventoLayoutRelation.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('EventoRepository') protected eventoRepositoryGetter: Getter<EventoRepository>, @repository.getter('LayoutRepository') protected layoutRepositoryGetter: Getter<LayoutRepository>,
  ) {
    super(EventoLayoutRelation, dataSource);
    this.layout = this.createBelongsToAccessorFor('layout', layoutRepositoryGetter,);
    this.registerInclusionResolver('layout', this.layout.inclusionResolver);
    this.evento = this.createBelongsToAccessorFor('evento', eventoRepositoryGetter,);
    this.registerInclusionResolver('evento', this.evento.inclusionResolver);
  }
}
