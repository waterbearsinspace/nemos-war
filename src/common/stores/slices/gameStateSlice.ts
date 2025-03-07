// game state
interface GameStateInterface {
  state: number;
  setState: (newState: number) => void;
}

const gamePhases = Object.freeze({
  MENU: 0,
  SETUP: 1,
  EVENT: 2,
  PLACEMENT: 3,
  ACTION: 4,
});

const setupSubphases = Object.freeze({});
