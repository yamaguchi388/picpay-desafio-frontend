import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  defaultLang: string = 'pt-br';

  // eslint-disable-next-line no-unused-vars
  constructor(private translate: TranslateService) {
    this.initNgxTranslateConfiguration();
  }

  initNgxTranslateConfiguration() {
    this.translate.setDefaultLang(this.defaultLang);
    this.translate.use(this.defaultLang);
  }
}
