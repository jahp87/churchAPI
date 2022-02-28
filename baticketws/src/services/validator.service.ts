import {HttpErrors} from '@loopback/rest';
import isemail from 'isemail';
import {Credentials, CredentialsNacional} from '../repositories';

export function validateCredentials(credentials: Credentials) {
  // Validate Email
  if (!isemail.validate(credentials.email)) {
    throw new HttpErrors.UnprocessableEntity('invalid email');
  }

  // Validate Password Length
  if (!credentials.password || credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 8 characters',
    );
  }
}

export function validateCredentialsNacional(credentials: CredentialsNacional) {

  if (!credentials.rut) {
    throw new HttpErrors.UnprocessableEntity('rut is require');
  }
  // Validate Password Length
  if (!credentials.password || credentials.password.length < 8) {
    throw new HttpErrors.UnprocessableEntity(
      'password must be minimum 8 characters',
    );
  }
}
