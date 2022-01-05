import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Perfil} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository : PerfilRepository,
  ) {}

  @post('/perfiles')
  @response(200, {
    description: 'Perfil model instance',
    content: {'application/json': {schema: getModelSchemaRef(Perfil)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {
            title: 'NewPerfil',
            exclude: ['id'],
          }),
        },
      },
    })
    perfil: Omit<Perfil, 'id'>,
  ): Promise<Perfil> {
    return this.perfilRepository.create(perfil);
  }

  @get('/perfiles/count')
  @response(200, {
    description: 'Perfil model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.count(where);
  }

  @get('/perfiles')
  @response(200, {
    description: 'Array of Perfil model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perfil, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perfil) filter?: Filter<Perfil>,
  ): Promise<Perfil[]> {
    return this.perfilRepository.find(filter);
  }

  @patch('/perfiles')
  @response(200, {
    description: 'Perfil PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
    @param.where(Perfil) where?: Where<Perfil>,
  ): Promise<Count> {
    return this.perfilRepository.updateAll(perfil, where);
  }

  @get('/perfiles/{id}')
  @response(200, {
    description: 'Perfil model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perfil, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Perfil, {exclude: 'where'}) filter?: FilterExcludingWhere<Perfil>
  ): Promise<Perfil> {
    return this.perfilRepository.findById(id, filter);
  }

  @patch('/perfiles/{id}')
  @response(204, {
    description: 'Perfil PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perfil, {partial: true}),
        },
      },
    })
    perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.updateById(id, perfil);
  }

  @put('/perfiles/{id}')
  @response(204, {
    description: 'Perfil PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() perfil: Perfil,
  ): Promise<void> {
    await this.perfilRepository.replaceById(id, perfil);
  }

  @del('/perfiles/{id}')
  @response(204, {
    description: 'Perfil DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.perfilRepository.deleteById(id);
  }
}
