import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';

describe('Heroes Component Shallow', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes;

  @Component({
    selector: 'app-hero',
    template: `
      <p>{{ hero.name }}</p>
      <p>{{ hero.strength }}</p>
    `,
  })
  class MockHeroComponent {
    @Input() hero: Hero;
    @Output() delete = new EventEmitter();
  }

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
      declarations: [HeroesComponent, MockHeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should set heroes correctly from the service', () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    //Act
    fixture.detectChanges();

    // Assert
    expect(fixture.componentInstance.heroes.length).toBe(4);
  });

  it('should create one li for each hero', () => {
    // Arrange
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    //Act
    fixture.detectChanges();

    // Assert
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(4);
  });
});
