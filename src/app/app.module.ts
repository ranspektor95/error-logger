import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {DefaultConfig, ErrorLoggerModule} from '@error-logger';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    environment.production ?  ErrorLoggerModule.forRoot(DefaultConfig) : [],
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
