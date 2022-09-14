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
import {Contact} from '../models';
import {ContactRepository} from '../repositories';

export class ContactController {
  constructor(
    @repository(ContactRepository)
    public contactRepository : ContactRepository,
  ) {}

  @post('/contacts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Contact model instance',
    content: {'application/json': {schema: getModelSchemaRef(Contact)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {
            title: 'NewContact',
            exclude: ['id'],
          }),
        },
      },
    })
    contact: Omit<Contact, 'id'>,
  ): Promise<Contact> {
    return this.contactRepository.create(contact);
  }

  @get('/contacts/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Contact model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Contact) where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.count(where);
  }

  @get('/contacts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Contact model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contact, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Contact) filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    return this.contactRepository.find(filter);
  }

  @patch('/contacts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Contact PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
    @param.where(Contact) where?: Where<Contact>,
  ): Promise<Count> {
    return this.contactRepository.updateAll(contact, where);
  }

  @get('/contacts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Contact model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Contact, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Contact, {exclude: 'where'}) filter?: FilterExcludingWhere<Contact>
  ): Promise<Contact> {
    return this.contactRepository.findById(id, filter);
  }

  @patch('/contacts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Contact PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Contact, {partial: true}),
        },
      },
    })
    contact: Contact,
  ): Promise<void> {
    await this.contactRepository.updateById(id, contact);
  }

  @put('/contacts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Contact PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() contact: Contact,
  ): Promise<void> {
    await this.contactRepository.replaceById(id, contact);
  }

  @del('/contacts/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Contact DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.contactRepository.deleteById(id);
  }

  @get('/contacts/getcontactsbychurch')
  @response(200, {
    description: 'Array of conact model instances',
    parameters: [{churchId: 'churchId', schema: {type: 'string'}, in: 'query'}],
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Contact, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async getContactByChurch(
    @param.query.string('churchId') churchId: string,
  ): Promise<Contact | null> {
    return this.contactRepository.getContactByChurch(churchId);
  }
}
