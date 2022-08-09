import {ErrorHandler, Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {bufferTime} from 'rxjs/operators';
import {Target, ErrorMsg, LoggerConfig} from './models';


export class BufferedQueue<T> {
  private queue: Subject<T> = new Subject<T>();
  interval: number;

  constructor(interval: number) {
    this.interval = interval;
  }

  push(item: T): void {
    this.queue.next(item);
  }

  get bufferedQueue(): Observable<T[]> {
    return this.queue.pipe(
      bufferTime(this.interval)
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorLogger implements ErrorHandler {
  queue: BufferedQueue<ErrorMsg> = new BufferedQueue<ErrorMsg>(this.config.intervalInMs);
  constructor(@Inject('config') private config: LoggerConfig) {
    this.init();
  }

  init(): void {
    this.queue.bufferedQueue.subscribe((errors: ErrorMsg[]) => {
        this.logError(errors);
    });
  }

  logError(q: ErrorMsg[] = []): void {
    q.forEach( err => {
      const msg = this.config.msgFormat(err);
      if (this.config.target === Target.CONSOLE) {
        console.error(msg);
      } else {
        localStorage.setItem(this.config.msgNameFormat(err), msg);
      }
    });
  }

  handleError(err: any): void {
    const ts = Date.now();
    const trace = 'trace';
    this.queue.push({ts, trace, err});
  }
}
