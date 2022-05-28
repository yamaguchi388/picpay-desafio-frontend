import { ColoredLogo, LogoVariations, WhiteLogo } from '../../types/logo.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() logoVariation: LogoVariations;
  whiteLogo: WhiteLogo = 'WhiteLogo';
  coloredLogo: ColoredLogo = 'ColoredLogo';
}
