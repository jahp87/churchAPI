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
import {CanalVentaEstado} from '../models';
import {CanalVentaEstadoRepository} from '../repositories';

export class CanalVentaEstadoController {
  constructor(
    @repository(CanalVentaEstadoRepository)
    public canalVentaEstadoRepository : CanalVentaEstadoRepository,
  ) {}

  @post('/canalventaestados')
  @response(200, {
    description: 'CanalVentaEstado model instance',
    content: {'application/json': {schema: getModelSchemaRef(CanalVentaEstado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CanalVentaEstado, {
            title: 'NewCanalVentaEstado',
            exclude: ['id'],
          }),
        },
      },
    })
    canalVentaEstado: Omit<CanalVentaEstado, 'id'>,
  ): Promise<CanalVentaEstado> {
    return this.canalVentaEstadoRepository.create(canalVentaEstado);
  }

  @get('/canalventaestados/count')
  @response(200, {
    description: 'CanalVentaEstado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CanalVentaEstado) where?: Where<CanalVentaEstado>,
  ): Promise<Count> {
    return this.canalVentaEstadoRepository.count(where);
  }

  @get('/canalventaestados')
  @response(200, {
    description: 'Array of CanalVentaEstado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CanalVentaEstado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CanalVentaEstado) filter?: Filter<CanalVentaEstado>,
  ): Promise<CanalVentaEstado[]> {
    return this.canalVentaEstadoRepository.find(filter);
  }

  @patch('/canalventaestados')
  @response(200, {
    description: 'CanalVentaEstado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CanalVentaEstado, {partial: true}),
        },
      },
    })
    canalVentaEstado: CanalVentaEstado,
    @param.where(CanalVentaEstado) where?: Where<CanalVentaEstado>,
  ): Promise<Count> {
    return this.canalVentaEstadoRepository.updateAll(canalVentaEstado, where);
  }

  @get('/canalventaestados/{id}')
  @response(200, {
    description: 'CanalVentaEstado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CanalVentaEstado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CanalVentaEstado, {exclude: 'where'}) filter?: FilterExcludingWhere<CanalVentaEstado>
  ): Promise<CanalVentaEstado> {
    return this.canalVentaEstadoRepository.findById(id, filter);
  }

  @patch('/canalventaestados/{id}')
  @response(204, {
    description: 'CanalVentaEstado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CanalVentaEstado, {partial: true}),
        },
      },
    })
    canalVentaEstado: CanalVentaEstado,
  ): Promise<void> {
    await this.canalVentaEstadoRepository.updateById(id, canalVentaEstado);
  }

  @put('/canalventaestados/{id}')
  @response(204, {
    description: 'CanalVentaEstado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() canalVentaEstado: CanalVentaEstado,
  ): Promise<void> {
    await this.canalVentaEstadoRepository.replaceById(id, canalVentaEstado);
  }

  @del('/canalventaestados/{id}')
  @response(204, {
    description: 'CanalVentaEstado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.canalVentaEstadoRepository.deleteById(id);
  }
}
