import {inject, Getter} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Layout, LayoutRelations, Recinto, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {

  public readonly recinto: BelongsToAccessor<Recinto, typeof Layout.prototype.id>;

  public readonly empresa: BelongsToAccessor<Empresa, typeof Layout.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,

  ) {
    super(Layout, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);

    this.registerInclusionResolver('recinto', this.recinto.inclusionResolver);
  }
}
