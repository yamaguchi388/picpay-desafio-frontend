import {
  IModuleTranslationOptions,
  ModuleTranslateLoader
} from '@larscom/ngx-translate-module-loader';
import { HttpClient } from '@angular/common/http';

export function moduleHttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = './assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      { baseTranslateUrl, moduleName: 'payments' },
      { baseTranslateUrl, moduleName: 'auth' }
    ]
  };

  return new ModuleTranslateLoader(http, options);
}
