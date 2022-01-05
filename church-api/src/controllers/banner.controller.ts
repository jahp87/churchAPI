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
import {Banner} from '../models';
import {BannerRepository} from '../repositories';


export class BannerController {
  constructor(
    @repository(BannerRepository)
    public bannerRepository: BannerRepository,
  ) { }

  @post('/banners')
  @response(200, {
    description: 'Banner model instance',
    content: {'application/json': {schema: getModelSchemaRef(Banner)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Banner, {
            title: 'NewBanner',
            exclude: ['id'],
          }),
        },
      },
    })
    banner: Omit<Banner, 'id'>,
  ): Promise<Banner> {
    return this.bannerRepository.create(banner);
  }

  @get('/banners/count')
  @response(200, {
    description: 'Banner model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Banner) where?: Where<Banner>,
  ): Promise<Count> {
    return this.bannerRepository.count(where);
  }

  @get('/banners')
  @response(200, {
    description: 'Array of Banner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Banner, {includeRelations: true}),
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
    @param.filter(Banner) filter?: Filter<Banner>,
  ): Promise<Banner[]> {
    return this.bannerRepository.find(filter);
  }

  @patch('/banners')
  @response(200, {
    description: 'Banner PATCH success count',
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
          schema: getModelSchemaRef(Banner, {partial: true}),
        },
      },
    })
    banner: Banner,
    @param.where(Banner) where?: Where<Banner>,
  ): Promise<Count> {
    return this.bannerRepository.updateAll(banner, where);
  }

  @get('/banners/{id}')
  @response(200, {
    description: 'Banner model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Banner, {includeRelations: true}),
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
    @param.filter(Banner, {exclude: 'where'}) filter?: FilterExcludingWhere<Banner>
  ): Promise<Banner> {
    return this.bannerRepository.findById(id, filter);
  }

  @patch('/banners/{id}')
  @response(204, {
    description: 'Banner PATCH success',
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
          schema: getModelSchemaRef(Banner, {partial: true}),
        },
      },
    })
    banner: Banner,
  ): Promise<void> {
    await this.bannerRepository.updateById(id, banner);
  }

  @put('/banners/{id}')
  @response(204, {
    description: 'Banner PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() banner: Banner,
  ): Promise<void> {
    await this.bannerRepository.replaceById(id, banner);
  }

  @del('/banners/{id}')
  @response(204, {
    description: 'Banner DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bannerRepository.deleteById(id);
  }

  @get('/banners/bannersbychurch')
  @response(200, {
    description: 'Array of Banner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Banner, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  async bannersbychurch(
    @param.query.string('churchId') churchId: string
  ): Promise<Banner[]> {
    return this.bannerRepository.find({
      where: {
        churchId: churchId
      }
    });
  }
}
