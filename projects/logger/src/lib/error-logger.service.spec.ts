import {ErrorLogger} from './error-logger.service';
import {ErrorMsg, LoggerConfig, Target} from './models';

const DefaultConfigTesting: LoggerConfig = {
  target: Target.CONSOLE,
  msgFormat: (err) => 'error',
  msgNameFormat: (err) => `ran55`,
  intervalInMs: 0
};

const DefaultConfigTestingWithLocalStorage: LoggerConfig = {
  target: Target.LOCAL_STORAGE,
  msgFormat: (err) => 'error',
  msgNameFormat: (err) => `ran55`,
  intervalInMs: 0
};

const ErrorMock: ErrorMsg = {
  ts: 1,
  err: 'Error',
  trace: 'Trace'
};

describe('ErrorLogger', () => {
  let service: ErrorLogger;

  beforeEach(() => {
    service = new ErrorLogger(DefaultConfigTesting);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError', () => {
    it('should push error to queue', () => {
      spyOn(service.queue, 'push');
      spyOn(Date, 'now').and.returnValue(1);
      service.handleError('Error');
      expect(service.queue.push).toHaveBeenCalledTimes(1);
      expect(service.queue.push).toHaveBeenCalledWith({trace: 'trace', ts: 1, err: 'Error'});
    });
  });

  describe('init', () => {
    it('should call logError every interval', (done) => {
      spyOn(service, 'logError');
      service.handleError(ErrorMock);
      setTimeout(() => {
        expect(service.logError).toHaveBeenCalledTimes(1);
        done();
      }, 1);
    });
  });

  describe('logError', () => {
    it('should log error to console', () => {
      spyOn(console, 'error');
      spyOn(DefaultConfigTesting, 'msgFormat').and.returnValue('error');
      service.logError([ErrorMock, ErrorMock]);
      expect(console.error).toHaveBeenCalledTimes(2);
      expect(DefaultConfigTesting.msgFormat).toHaveBeenCalledTimes(2);
      expect(DefaultConfigTesting.msgFormat).toHaveBeenCalledWith(ErrorMock);
      expect(console.error).toHaveBeenCalledWith('error');
     });

    it('should log error to local storage', () => {
      service = new ErrorLogger(DefaultConfigTestingWithLocalStorage);
      spyOn(localStorage, 'setItem');
      spyOn(DefaultConfigTestingWithLocalStorage, 'msgFormat').and.returnValue('error');
      spyOn(DefaultConfigTestingWithLocalStorage, 'msgNameFormat').and.returnValue('ran55');
      service.logError([ErrorMock, ErrorMock]);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(DefaultConfigTestingWithLocalStorage.msgFormat).toHaveBeenCalledTimes(2);
      expect(DefaultConfigTestingWithLocalStorage.msgNameFormat).toHaveBeenCalledTimes(2);
      expect(DefaultConfigTestingWithLocalStorage.msgFormat).toHaveBeenCalledWith(ErrorMock);
      expect(DefaultConfigTestingWithLocalStorage.msgNameFormat).toHaveBeenCalledWith(ErrorMock);
      expect(localStorage.setItem).toHaveBeenCalledWith('ran55', 'error');
    });
  });
});

