import {Target} from './target.enum';
import {ErrorMsg} from './error-msg.model';

export class LoggerConfig {
  target?: Target;
  msgFormat: (err: ErrorMsg) => string;
  msgNameFormat: (err: ErrorMsg) => string;
  intervalInMs: number;
}

export const DefaultConfig: LoggerConfig = {
  target: Target.CONSOLE,
  msgFormat: (err) => {
    const errorMsg = JSON.stringify(err.err, Object.getOwnPropertyNames(err.err));
    return `error:${errorMsg} | ts:${err.ts} | trace:${err.trace}`},
  msgNameFormat: (err) => `${err.trace} | ${err.ts}`,
  intervalInMs: 5000
};
