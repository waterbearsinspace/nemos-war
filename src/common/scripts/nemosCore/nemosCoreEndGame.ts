import { nemosStore } from "../../stores/nemosStore";
import { setSubPhase } from "./nemosCoreGamePhase";
import { getSubPhaseNumber } from "./nemosCoreUtils";

// ============================
// END GAME
// ============================

// check for end game by ship resources or notoriety
export function loseGame(message: string) {
  const setGameLost = nemosStore.getState().setGameLost;
  const setGameLostMessage = nemosStore.getState().setGameLostMessage;
  const currentSubPhase = nemosStore.getState().currentSubPhase;

  setGameLost(true);
  setGameLostMessage(message);
  if (currentSubPhase != getSubPhaseNumber("GAME OVER"))
    setSubPhase("GAME OVER");
}

export function checkEndGame(type: string, newValue: number) {
  if (type == "Nemo" && newValue < 1) {
    loseGame("You reached 0 Nemo!");
  }
  if (type == "Crew" && newValue < 1) {
    loseGame("You reached 0 Crew!");
  }
  if (type == "Hull" && newValue < 1) {
    loseGame("You reached 0 Hull!");
  }

  // notoriety
  const motiveGameOver = nemosStore.getState().currentMotive.gameOver;
  if (type == "Notoriety" && newValue >= motiveGameOver) {
    loseGame("You gained too much Notoriety!");
  }
}
