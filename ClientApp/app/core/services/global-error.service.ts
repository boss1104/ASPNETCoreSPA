import { ErrorHandler, Injectable, ApplicationRef, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import { NotificationsService } from '../simple-notifications';
import { UtilityService } from './utility.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private ns: NotificationsService, private inj: Injector) { }

  handleError(errorResponse: HttpErrorResponse): void {
    console.log('***** HANDLE ERROR *****');
    if (errorResponse.status === 401) {
      this.ns.error('Unauthorised', 'Pleae login again.');
      this.inj.get(ApplicationRef).tick();
      this.inj.get(UtilityService).navigateToSignIn();
    } else if (errorResponse.status === 400) {
      this.ns.error(errorResponse.error.message, errorResponse.error);
      this.inj.get(ApplicationRef).tick();
    }
    // IMPORTANT: Don't Rethrow the error otherwise it will not emit errors after once
    // https://stackoverflow.com/questions/44356040/angular-global-error-handler-working-only-once
    // throw errorResponse;
  }

}
