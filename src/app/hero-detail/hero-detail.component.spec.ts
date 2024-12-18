import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let mockActivatedRoute, mockHeroService, mockLocation, fixture;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '3',
        },
      },
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
    });

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(
      of({
        id: 500,
        name: 'SuperDude',
        strength: 100,
      })
    );
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.textContent
    ).toContain('SUPERDUDE');
  });

  it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    flush();

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));
});
