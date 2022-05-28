import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { moduleHttpLoaderFactory } from './module-http-loader-factory';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'pt-br',
      loader: {
        provide: TranslateLoader,
        useFactory: moduleHttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule]
})
export class I18nModule {}
