import { useNemosCore } from "../../common/scripts/nemosCore/useNemosCore";
import { nemosStore } from "../../common/stores/nemosStore";
import { gameSubPhases } from "../../common/stores/slices/gamePhaseSlice";

export default function OverlayBarTop() {
  const notoriety = nemosStore((state) => state.notoriety);
  const { getTotalScore } = useNemosCore();
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const setShowModal = nemosStore((state) => state.setShowModal);
  const setModalContentsId = nemosStore((state) => state.setModalContentsId);

  const showScores = () => {
    setShowModal(true);
    setModalContentsId("score");
  };

  return (
    <section className="overlay-bar-content-wrapper">
      <div className="overlay-info phase">
        {gameSubPhases[currentSubPhase as keyof typeof gameSubPhases]}
      </div>
      <div className="overlay-info notoriety">NOTORIETY: {notoriety}</div>
      <div className="overlay-info score" onClick={showScores}>
        SCORE: {getTotalScore()}
      </div>
    </section>
  );
}
