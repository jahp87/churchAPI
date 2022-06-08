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
import {Ad} from '../models';
import {AdRepository} from '../repositories';

export class AdController {
  constructor(
    @repository(AdRepository)
    public adRepository : AdRepository,
  ) {}

  @post('/ads')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Ad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ad, {
            title: 'NewAd',
            exclude: ['id'],
          }),
        },
      },
    })
    ad: Omit<Ad, 'id'>,
  ): Promise<Ad> {
    return this.adRepository.create(ad);
  }

  @get('/ads/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Ad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ad) where?: Where<Ad>,
  ): Promise<Count> {
    return this.adRepository.count(where);
  }

  @get('/ads')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Ad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ad) filter?: Filter<Ad>,
  ): Promise<Ad[]> {
    return this.adRepository.find(filter);
  }

  @patch('/ads')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Ad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ad, {partial: true}),
        },
      },
    })
    ad: Ad,
    @param.where(Ad) where?: Where<Ad>,
  ): Promise<Count> {
    return this.adRepository.updateAll(ad, where);
  }

  @get('/ads/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Ad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ad>
  ): Promise<Ad> {
    return this.adRepository.findById(id, filter);
  }

  @patch('/ads/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Ad PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ad, {partial: true}),
        },
      },
    })
    ad: Ad,
  ): Promise<void> {
    await this.adRepository.updateById(id, ad);
  }

  @put('/ads/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Ad PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ad: Ad,
  ): Promise<void> {
    await this.adRepository.replaceById(id, ad);
  }

  @del('/ads/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Ad DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adRepository.deleteById(id);
  }

  @get('/ads/adsbychurch')
  @response(200, {
    description: 'Array of Ad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ad, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  async adsbychurch(
    @param.query.string('churchId') churchId: string
  ): Promise<Ad[]> {
    return this.adRepository.find({
      where: {
        churchId: churchId
      },
      include: [
        {
          relation: 'church'
        }
      ],
      order: ['createdDate DESC'],
      limit: 10
    });
  }
}
