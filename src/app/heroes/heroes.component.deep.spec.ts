import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';
import { Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe('Heroes Component Deep', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'Windstorm', strength: 8 },
      { id: 12, name: 'Dr. Nice', strength: 10 },
      { id: 13, name: 'Bombasto', strength: 11 },
      { id: 14, name: 'Celeritas', strength: 9 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a hero component', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentsDEs.length).toBe(4);
    for (let i = 0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero.name).toBe(
        heroes[i].name
      );
    }
  });

  it(`should call the heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    heroComponentsDEs[0].query(By.css('button')).triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    const nameToAdd = 'Mr. Ice';

    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    mockHeroService.addHero.and.returnValue(
      of({ id: 900, name: nameToAdd, strength: 10 })
    );

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    const inputElement = fixture.debugElement.query(By.css('input'));
    const addButton = fixture.debugElement.query(By.css('button'));

    inputElement.nativeElement.value = nameToAdd;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroesText = fixture.debugElement.query(By.css('ul')).nativeElement
      .textContent;

    expect(heroesText).toContain(nameToAdd);
  });

  it('should have the correct route for the first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    const firstHero = heroComponentsDEs[0];
    const routerLink = firstHero
      .query(By.directive(RouterLinkDirectiveStub))
      .injector.get(RouterLinkDirectiveStub);

    firstHero.query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
