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
    public prayerRepository: PrayerRepository,
  ) { }

  @post('/prayers')
  @response(200, {
    description: 'Prayer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Prayer)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
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
  @response(200, {
    description: 'Prayer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Prayer) where?: Where<Prayer>,
  ): Promise<Count> {
    return this.prayerRepository.count(where);
  }

  @get('/prayers')
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Prayer) filter?: Filter<Prayer>,
  ): Promise<Prayer[]> {
    return this.prayerRepository.find(filter);
  }

  @patch('/prayers')
  @response(200, {
    description: 'Prayer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
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
  @response(200, {
    description: 'Prayer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Prayer, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Prayer, {exclude: 'where'}) filter?: FilterExcludingWhere<Prayer>
  ): Promise<Prayer> {
    return this.prayerRepository.findById(id, filter);
  }

  @patch('/prayers/{id}')
  @response(204, {
    description: 'Prayer PATCH success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
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
  @response(204, {
    description: 'Prayer PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prayer: Prayer,
  ): Promise<void> {
    await this.prayerRepository.replaceById(id, prayer);
  }

  @del('/prayers/{id}')
  @response(204, {
    description: 'Prayer DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.prayerRepository.deleteById(id);
  }

  @get('/prayers/getprayerbychurch')
  @response(200, {
    description: 'Array of prayer model instances',
    parameters: [{churchId: 'churchId', schema: {type: 'string'}, in: 'query'}],
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Prayer, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async getPrayerByChurch(
    @param.query.string('churchId') churchId: string,
  ): Promise<Prayer[]> {
    return this.prayerRepository.getPrayerByChurch(churchId);
  }
}
