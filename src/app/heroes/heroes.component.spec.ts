import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('Heros Component', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Windstorm', strength: 8 },
      { id: 12, name: 'Dr. Nice', strength: 10 },
      { id: 13, name: 'Bombasto', strength: 11 },
      { id: 14, name: 'Celeritas', strength: 9 },
      { id: 15, name: 'Magneta', strength: 12 },
      { id: 16, name: 'RubberMan', strength: 13 },
      { id: 17, name: 'Dynama', strength: 14 },
      { id: 18, name: 'Dr. IQ', strength: 15 },
      { id: 19, name: 'Magma', strength: 16 },
      { id: 20, name: 'Tornado', strength: 17 },
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deleteHero',
    ]);
    component = new HeroesComponent(mockHeroService);

    mockHeroService.getHeroes.and.returnValue(of(HEROES));
  });

  describe('delete', () => {
    it('should remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Arrange
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert
      expect(component.heroes.length).toBe(9);
    });

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      // Arrange
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });

    it('should subscribe to deleteHero', () => {
      // Arrange
      const deleteHeroSpy = mockHeroService.deleteHero.and.returnValue(
        of(true)
      );
      component.heroes = HEROES;

      // Act
      component.delete(HEROES[2]);

      // Assert
      expect(deleteHeroSpy).toHaveBeenCalled();
    });
  });
});
