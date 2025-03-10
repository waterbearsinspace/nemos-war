// components
import DebugHeader from "./components/Debug/DebugHeader";
import Menu from "./components/Screens/Menu/Menu";
import Setup from "./components/Screens/Setup/Setup";

// data and enumerations
import { gamePhases } from "./common/stores/slices/gamePhaseSlice";

// game store
import { nemosStore } from "./common/stores/nemosStore";

// css
import "./Game.css";

export default function Game() {
  const currentPhase = nemosStore((state) => state.phase);

  return (
    <>
      {/* Debug Header */}
      <DebugHeader />

      {/* Menu Screen */}
      {gamePhases[currentPhase as keyof typeof gamePhases] == "MENU" && (
        <Menu />
      )}

      {/* Setup Screen */}
      {gamePhases[currentPhase as keyof typeof gamePhases] == "SETUP" && (
        <Setup />
      )}
    </>
  );
}
