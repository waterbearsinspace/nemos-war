import { nemosStore } from "../../common/stores/nemosStore";
import {
  gamePhases,
  gameSubPhases,
} from "../../common/stores/slices/gamePhaseSlice";

import "./DebugHeader.css";

function Phase() {
  const currentPhaseNumber = nemosStore((state) => state.phase);
  const currentSubPhaseNumber = nemosStore((state) => state.subPhase);

  const currentPhaseName =
    gamePhases[currentPhaseNumber as keyof typeof gamePhases];
  let currentSubPhaseName;
  const currentSubPhaseNameSetup =
    gameSubPhases[currentSubPhaseNumber as keyof typeof gameSubPhases];

  switch (currentPhaseName) {
    case "MENU":
      currentSubPhaseName = "NONE";
      break;
    case "SETUP":
      currentSubPhaseName = currentSubPhaseNameSetup;
      break;
  }

  return (
    <>
      <div className="phase-info">
        <p></p>
        <p>Current Phase: {currentPhaseName}</p>
        <p>Current Sub Phase: {currentSubPhaseName}</p>
      </div>
    </>
  );
}

export default function DebugHeader() {
  return <Phase />;
}
