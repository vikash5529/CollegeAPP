import {PersistanceService} from './persistance.service';

describe('It should Test Persistance service', () => {
  const persister = new PersistanceService();
  it('should test setter and getter for Positive case', () => {
    persister.set('test', {test: 'test'});
    const value = persister.get('test');
    expect(value).toBeTruthy();
  });
  it('should test getter for negative case', () => {
    expect(persister.get('random_key')).toBe(null);
  });
});
