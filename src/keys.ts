import {TokenService, UserService} from '@loopback/authentication';
import {BindingKey} from '@loopback/context';
import {UserModel} from './models';
import {Credentials} from './repositories';
import {PasswordHasher} from './services';
import {FileUploadHandler} from './types';


export const FILE_UPLOAD_SERVICE =
  BindingKey.create<FileUploadHandler>('services.FileUpload',);// Binding key for the storage directory
export const STORAGE_DIRECTORY = BindingKey.create<string>
  ('storage.directory');

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'churchjwt';
  export const TOKEN_EXPIRES_IN_VALUE = '86000';
}

export namespace TokenServiceBindings {
  export const TOKEN_SECRET = BindingKey.create<string>(
    'authentication.jwt.secret',
  );
  export const TOKEN_EXPIRES_IN = BindingKey.create<string>(
    'authentication.jwt.expires.in.seconds',
  );
  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<UserService<UserModel, Credentials>>(
    'services.user.service',
  );
}


