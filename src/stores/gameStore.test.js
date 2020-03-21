import { updatePhase } from './gameStore';

describe('gameStore', () => {
  describe('updatePhase', () => {
    it('should return WIN when the player has 21', () => {
      expect(updatePhase({ playerPoints: 21 })).toEqual('WIN');
    });

    it('should not return WIN playerPoints < 21', () => {
      expect(updatePhase({ playerPoints: 15, phase: 'PLAYING' })).toEqual(
        'PLAYING',
      );
    });

    it('should return LOST if the house has 21 points', () => {
      expect(
        updatePhase({ playerPoints: 15, housePoints: 21, phase: 'WAITING' }),
      ).toEqual('LOST');
    });

    it('should return LOST if the house is closer to 21 points', () => {
      expect(
        updatePhase({ playerPoints: 11, housePoints: 18, phase: 'WAITING' }),
      ).toEqual('LOST');
    });

    it('should return WIN if the player is closer to 21', () => {
      expect(
        updatePhase({ playerPoints: 20, housePoints: 11, phase: 'WAITING' }),
      ).toEqual('WIN');
    });

    it('should return the current phase if none of the players are winning', () => {
      expect(
        updatePhase({ playerPoints: 10, housePoints: 11, phase: 'PLAYING' }),
      ).toEqual('PLAYING');
    });
  });
});
