import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './ngrx/auth.effects';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './ngrx/auth.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature('auth', authReducer)
  ]
})
export class AuthModule { }
