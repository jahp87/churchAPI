import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {CanalVenta} from '../models';
import {CanalVentaRepository} from '../repositories';

export class CanalVentaController {
  constructor(
    @repository(CanalVentaRepository)
    public canalVentaRepository: CanalVentaRepository,
  ) { }

  @post('/api/canalventas')
  @response(200, {
    description: 'CanalVenta model instance',
    content: {'application/json': {schema: getModelSchemaRef(CanalVenta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CanalVenta, {
            title: 'NewCanalVenta',
            exclude: ['id'],
          }),
        },
      },
    })
    canalVenta: Omit<CanalVenta, 'id'>,
  ): Promise<CanalVenta> {
    return this.canalVentaRepository.create(canalVenta);
  }

  @get('/api/canalventas/count')
  @response(200, {
    description: 'CanalVenta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CanalVenta) where?: Where<CanalVenta>,
  ): Promise<Count> {
    return this.canalVentaRepository.count(where);
  }

  @get('/api/canalventas')
  @response(200, {
    description: 'Array of CanalVenta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CanalVenta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CanalVenta) filter?: Filter<CanalVenta>,
  ): Promise<CanalVenta[]> {
    return this.canalVentaRepository.find(filter);
  }

  @patch('/api/canalventas')
  @response(200, {
    description: 'CanalVenta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CanalVenta, {partial: true}),
        },
      },
    })
    canalVenta: CanalVenta,
    @param.where(CanalVenta) where?: Where<CanalVenta>,
  ): Promise<Count> {
    return this.canalVentaRepository.updateAll(canalVenta, where);
  }

  @get('/api/canalventas/{id}')
  @response(200, {
    description: 'CanalVenta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CanalVenta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CanalVenta, {exclude: 'where'}) filter?: FilterExcludingWhere<CanalVenta>
  ): Promise<CanalVenta> {
    return this.canalVentaRepository.findById(id, filter);
  }

  @patch('/api/canalventas/{id}')
  @response(204, {
    description: 'CanalVenta PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CanalVenta, {partial: true}),
        },
      },
    })
    canalVenta: CanalVenta,
  ): Promise<void> {
    await this.canalVentaRepository.updateById(id, canalVenta);
  }

  @put('/api/canalventas/{id}')
  @response(204, {
    description: 'CanalVenta PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() canalVenta: CanalVenta,
  ): Promise<void> {
    await this.canalVentaRepository.replaceById(id, canalVenta);
  }

  @del('/api/canalventas/{id}')
  @response(204, {
    description: 'CanalVenta DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.canalVentaRepository.deleteById(id);
  }
}
