import { TransferState, makeStateKey } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';

import { DataService } from './data.service';

const APP_DATA_KEY = makeStateKey<IApplicationConfig>('appData');

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private transferState: TransferState, private dataService: DataService) { }

  public get appData(): IApplicationConfig {
    return this.transferState.get<IApplicationConfig>(APP_DATA_KEY, null as IApplicationConfig);
  }
  getAppData(): Promise<IApplicationConfig> {
    const transferredAppData = this.transferState.get<IApplicationConfig>(APP_DATA_KEY, null as IApplicationConfig);
    if (!transferredAppData) {
      return this.dataService
        .get('app/getapplicationdata')
        .toPromise()
        .then((data: IApplicationConfig) => {
          this.transferState.set<IApplicationConfig>(APP_DATA_KEY, data);
          return data;
        });
    }
    return new Promise((resolve, reject) => {
      resolve(transferredAppData);
    });
  }
}
