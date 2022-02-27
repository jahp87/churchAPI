import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Entity, model, property, repository} from '@loopback/repository';
import {get, getModelSchemaRef, HttpErrors, param, post, requestBody, SchemaObject} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {basicAuthorization} from '../middlewares/auth.midd';
import {KeyAndPasswordModel, ResetPasswordInitModel, UserModel, UserProfileModel} from '../models';
import {ChurchModelRepository, Credentials, UserModelRepository, UserProfileModelRepository} from '../repositories';
import {EmailService, PasswordHasher, validateCredentials} from '../services';

const UserProfileSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {type: 'string'},
    email: {type: 'string'},
    name: {type: 'string'},
  },
};


@model()
export class NewUserRequest extends UserModel {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};
@model()
export class ChangePasswordRequest extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  confirm: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;
}



export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @repository(UserModelRepository) public userRepository: UserModelRepository,
    @repository(UserProfileModelRepository) public userProfileRepository: UserProfileModelRepository,
    @repository(ChurchModelRepository) public churchModelRepository: ChurchModelRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<UserModel, Credentials>,
    @inject('services.EmailService')
    public emailService: EmailService,
  ) {
  }

  @post('/users/sign-up', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': UserModel,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
            exclude: ['id', 'role', 'resetKey']
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<UserModel> {
    newUserRequest.role = 'user';

    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    const isUniqueUser = await this.userRepository.findOne({where: {email: newUserRequest.email}});

    if (isUniqueUser !== null) {
      throw new HttpErrors.BadRequest('Email value is already taken');
    }

    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/sign-up/admin', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': UserModel,
            },
          },
        },
      },
    },
  })
  async createadmin(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<UserModel> {
    // All new users have the "customer" role by default
    newUserRequest.role = 'admin';
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    try {
      // create the new user
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }


  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': UserModel,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<UserModel> {
    return this.userRepository.findById(userId);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<UserModel> {

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }
  // We will add our password reset here
  @post('/users/reset-password/init')
  async resetPasswordInit(
    @requestBody() resetPasswordInit: ResetPasswordInitModel,
  ): Promise<{email: string}> {
    // checks whether email is valid as per regex pattern provided
    const email = await this.validateEmail(resetPasswordInit.email);

    // At this point we are dealing with valid email.
    // Lets check whether there is an associated account
    const foundUser = await this.userRepository.findOne({
      where: {email},
    });

    // No account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No account associated with the provided email address.',
      );
    }

    // We generate unique reset key to associate with reset request
    foundUser.resetKey = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      // Updates the user to store their reset key with error handling
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }
    // Send an email to the user's email address
    const nodeMailer: SMTPTransport.SentMessageInfo = await this.emailService.sendResetPasswordMail(
      foundUser,
    );

    // Nodemailer has accepted the request. All good
    if (nodeMailer.accepted.length) {
      return {email: foundUser.email};
    }

    // Nodemailer did not complete the request alert the user
    throw new HttpErrors.InternalServerError(
      'Error sending reset password email',
    );
  }

  @post('/users/reset-password/finish')
  async resetPasswordFinish(
    @requestBody() keyAndPassword: KeyAndPasswordModel,
  ): Promise<UserModel> {
    // Checks whether password and reset key meet minimum security requirements
    const {resetKey, password} = await this.validateKeyPassword(keyAndPassword);

    // Search for a user using reset key
    const foundUser = await this.userRepository.findOne({
      where: {resetKey: resetKey},
    });

    // No user account found
    if (!foundUser) {
      throw new HttpErrors.NotFound(
        'No associated account for the provided reset key',
      );
    }

    // Encrypt password to avoid storing it as plain text
    const passwordHash = await hash(password, await genSalt());

    try {
      // Update user password with the newly provided password
      await this.userRepository
        .userCredentials(foundUser.id)
        .patch({password: passwordHash});

      // Remove reset key from database its no longer valid
      foundUser.resetKey = '';

      // Update the user removing the reset key
      await this.userRepository.updateById(foundUser.id, foundUser);
    } catch (e) {
      return e;
    }

    return foundUser;
  }

  async validateKeyPassword(keyAndPassword: KeyAndPasswordModel): Promise<KeyAndPasswordModel> {
    if (!keyAndPassword.password || keyAndPassword.password.length < 8) {
      throw new HttpErrors.UnprocessableEntity(
        'Password must be minimum of 8 characters',
      );
    }

    if (keyAndPassword.password !== keyAndPassword.confirmPassword) {
      throw new HttpErrors.UnprocessableEntity(
        'Password and confirmation password do not match',
      );
    }

    if (
      _.isEmpty(keyAndPassword.resetKey) ||
      keyAndPassword.resetKey.length === 0 ||
      keyAndPassword.resetKey.trim() === ''
    ) {
      throw new HttpErrors.UnprocessableEntity('Reset key is mandatory');
    }

    return keyAndPassword;
  }

  async validateEmail(email: string): Promise<string> {
    const emailRegPattern = /\S+@\S+\.\S+/;
    if (!emailRegPattern.test(email)) {
      throw new HttpErrors.UnprocessableEntity('Invalid email address');
    }
    return email;
  }

  @get('/users/getprofile', {
    responses: {
      '200': {
        description: 'UserProfileModel',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': UserProfileModel,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  async getProfile(
    @param.query.string('email') email: string,
    @param.query.string('churchId') churchId: string
  ): Promise<UserProfileModel | null> {

    const foundUser = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    // No user account found
    if (foundUser === null) {
      return Promise.reject(new HttpErrors.NotFound('User not found'));
    }
    else {
      let userProfile = await this.userProfileRepository.findOne({
        where: {
          userId: foundUser.id
        },
        include: [
          {relation: 'user'},
          {relation: 'church'}
        ]
      });
      const activeChurch = await this.churchModelRepository.findById(churchId);
      if (userProfile === null) {

        if (activeChurch === null) {
          return Promise.reject(new HttpErrors.NotFound('Church not found'));
        }
        const userNewProfileSchema = {

          firstname: '-',
          lastname: '-',
          userId: foundUser.id,
          churchId: activeChurch.id

        }
        const createdUser = await this.userProfileRepository.create(userNewProfileSchema);
        userProfile = await this.userProfileRepository.findOne({
          where: {
            userId: createdUser.userId
          },
          include: [
            {relation: 'user'},
            {relation: 'church'}
          ]
        });
        return userProfile;

      }
      else {
        const userProfileSchema = {

          firstname: userProfile.firstname,
          lastname: userProfile.lastname,
          userId: foundUser.id,
          churchId: activeChurch.id

        }
        await this.userProfileRepository.updateAll(userProfileSchema);
        return this.userProfileRepository.findOne({
          where: {
            userId: foundUser.id
          },
          include: [
            {relation: 'user'},
            {relation: 'church'}
          ]
        });
      }


    }



  }


}
