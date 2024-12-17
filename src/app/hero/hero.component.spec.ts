import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
describe('Hero component', () => {
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],

      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(HeroComponent);
  });

  it('should have the correct hero', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'Windstorm',
      strength: 10,
    };

    expect(fixture.componentInstance.hero.name).toBe('Windstorm');
  });

  it('should render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = {
      id: 1,
      name: 'Windstorm',
      strength: 10,
    };

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').textContent).toContain(
      'Windstorm'
    );
  });

  // it('should have the correct route for the hero', () => {
  //   fixture.componentInstance.hero = {
  //     id: 1,
  //     name: 'Windstorm',
  //     strength: 10,
  //   };
  //   fixture.detectChanges();

  //   expect(
  //     fixture.nativeElement.querySelector('a').attributes.route.value
  //   ).toBe('/detail/1');
  // });
});
