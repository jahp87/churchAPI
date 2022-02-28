import {
  AuthenticateFn, AuthenticationBindings, AUTHENTICATION_STRATEGY_NOT_FOUND, USER_PROFILE_NOT_FOUND
} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {DefaultSequence, RequestContext} from '@loopback/rest';


export class MySequence extends DefaultSequence {
  @inject(AuthenticationBindings.AUTH_ACTION)
  protected authenticateRequest: AuthenticateFn;
  async handle(context: RequestContext) {
    try {
      const {request, response} = context;
      const finished = await this.invokeMiddleware(context);
      if (finished) return;
      const route = this.findRoute(request);    //call authentication action
      await this.authenticateRequest(request); const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.send(response, result);
    } catch (err) {
      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        Object.assign(err, {statusCode: 401 /* Unauthorized */});
      }

      this.reject(context, err);
      return;
    }
  }


}
