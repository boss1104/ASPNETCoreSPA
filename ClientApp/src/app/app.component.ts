import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Params, ActivatedRoute, Router } from '@angular/router';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

import { routerTransition } from './router.animations';
import { ExternalLoginStatus } from './app.models';
import { TransferState, makeStateKey } from '@angular/platform-browser';

const APP_DATA_KEY = makeStateKey('appData');
@Component({
  selector: 'appc-root',
  animations: [routerTransition],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
  appData: IApplicationConfig;

  constructor(
    private router: Router,
    private state: TransferState,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject(PLATFORM_ID) private platformId: string,
    private activatedRoute: ActivatedRoute,
    private oauthService: OAuthService,
    private http: HttpClient) {

    if (isPlatformBrowser(this.platformId)) {
      this.configureOidc();
    }

  }

  public ngOnInit() {
    // Change "Title" on every navigationEnd event
    // Titles come from the data.title property on all Routes (see app.routes.ts)
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const param = params['externalLoginStatus'];
      if (param) {
        const status = <ExternalLoginStatus>+param;
        switch (status) {
          case ExternalLoginStatus.CreateAccount:
            this.router.navigate(['createaccount']);
            break;

          default:
            break;
        }
      }
    });
  }

  public getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }

  private configureOidc() {
    this.oauthService.configure(authConfig(this.baseUrl));
    this.oauthService.setStorage(localStorage);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


}
