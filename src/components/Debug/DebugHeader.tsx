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
  const currentSubPhaseName =
    gameSubPhases[currentSubPhaseNumber as keyof typeof gameSubPhases];

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
