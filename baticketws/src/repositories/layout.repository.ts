import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {TicketeradbDataSource} from '../datasources';
import {Layout, LayoutRelations, Empresa} from '../models';
import {EmpresaRepository} from './empresa.repository';

export class LayoutRepository extends DefaultCrudRepository<
  Layout,
  typeof Layout.prototype.id,
  LayoutRelations
> {

  public readonly empresa: BelongsToAccessor<Empresa, typeof Layout.prototype.id>;

  constructor(
    @inject('datasources.ticketeradb') dataSource: TicketeradbDataSource, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>,
  ) {
    super(Layout, dataSource);
    this.empresa = this.createBelongsToAccessorFor('empresa', empresaRepositoryGetter,);
    this.registerInclusionResolver('empresa', this.empresa.inclusionResolver);
  }
}
