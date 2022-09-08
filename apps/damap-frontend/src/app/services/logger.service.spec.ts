import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in dev mode', () => {
    spyOn(console, 'debug');
    spyOn(console, 'info');
    spyOn(console, 'warn');
    spyOn(console, 'error');
    spyOnProperty(service, 'prod', 'get').and.returnValue(false);
    service.debug('debug');
    service.info('info');
    service.warn('warn');
    service.error('error');
    expect(service.prod).toBeFalse();
    expect(console.debug).toHaveBeenCalledWith('debug');
    expect(console.info).toHaveBeenCalledWith('info');
    expect(console.warn).toHaveBeenCalledWith('warn');
    expect(console.error).toHaveBeenCalledWith('error');
  });

  it('should not log in prod mode', () => {
    spyOn(console, 'debug');
    spyOnProperty(service, 'prod', 'get').and.returnValue(true);
    service.debug('debug');
    expect(console.debug).not.toHaveBeenCalled();
  });
});
