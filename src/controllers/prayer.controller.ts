import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
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
import {basicAuthorization} from '../middlewares/auth.midd';
import {Prayer} from '../models';
import {PrayerRepository} from '../repositories';

export class PrayerController {
  constructor(
    @repository(PrayerRepository)
    public prayerRepository : PrayerRepository,
  ) {}

  @post('/prayers')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Prayer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prayer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prayer, {
            title: 'NewPrayer',
            exclude: ['id'],
          }),
        },
      },
    })
    prayer: Omit<Prayer, 'id'>,
  ): Promise<Prayer> {
    return this.prayerRepository.create(prayer);
  }

  @get('/prayers/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Prayer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Prayer) where?: Where<Prayer>,
  ): Promise<Count> {
    return this.prayerRepository.count(where);
  }

  @get('/prayers')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Prayer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prayer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Prayer) filter?: Filter<Prayer>,
  ): Promise<Prayer[]> {
    return this.prayerRepository.find(filter);
  }

  @patch('/prayers')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Prayer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prayer, {partial: true}),
        },
      },
    })
    prayer: Prayer,
    @param.where(Prayer) where?: Where<Prayer>,
  ): Promise<Count> {
    return this.prayerRepository.updateAll(prayer, where);
  }

  @get('/prayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Prayer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prayer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prayer, {exclude: 'where'}) filter?: FilterExcludingWhere<Prayer>
  ): Promise<Prayer> {
    return this.prayerRepository.findById(id, filter);
  }

  @patch('/prayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Prayer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Prayer, {partial: true}),
        },
      },
    })
    prayer: Prayer,
  ): Promise<void> {
    await this.prayerRepository.updateById(id, prayer);
  }

  @put('/prayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Prayer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prayer: Prayer,
  ): Promise<void> {
    await this.prayerRepository.replaceById(id, prayer);
  }

  @del('/prayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Prayer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.prayerRepository.deleteById(id);
  }
}
