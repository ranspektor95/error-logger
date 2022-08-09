import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {ErrorLogger} from './error-logger.service';
import {DefaultConfig, LoggerConfig} from './models';

@NgModule()
export class ErrorLoggerModule {
  static forRoot(config?: LoggerConfig): ModuleWithProviders<any> {
    return {
      ngModule: ErrorLoggerModule,
      providers: [
        { provide: 'config', useValue: config || DefaultConfig },
        { provide: ErrorHandler, useClass: ErrorLogger }]
    };
  }
}
