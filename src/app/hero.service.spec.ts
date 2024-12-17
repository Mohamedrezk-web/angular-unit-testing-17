import { inject, TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HeroService', () => {
  let mockMessagesService;
  let httpMock: HttpTestingController;
  let service: HeroService;
  beforeEach(() => {
    mockMessagesService = jasmine.createSpyObj(['add']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessagesService },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  describe('getHeroes', () => {
    it('should call get with the correct URL', () => {
      service.getHero(4).subscribe();

      const req = httpMock.expectOne('api/heroes/4');
      req.flush({ id: 4, name: 'SuperDude', strength: 100 });
      expect(req.request.method).toBe('GET');
      httpMock.verify();
    });
  });
});
