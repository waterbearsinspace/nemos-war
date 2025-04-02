import { diceStore } from "../../../common/stores/diceStore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import AdventureCard from "./AdventureCard";

type ResolveAdventureCardProps = {
  id: number;
};

export default function ResolveAdventureCard({
  id,
}: ResolveAdventureCardProps) {
  const setSubPhase = nemosStore((state) => state.setCurrentSubPhase);
  const setActiveDice = diceStore((state) => state.setActiveDice);
  const drawPile = nemosStore((state) => state.drawPile);
  const setDrawPile = nemosStore((state) => state.setDrawPile);

  let resolveDisplay;

  function resolveAdventureCardsEffects() {
    switch (id) {
      case 1001:
        console.log("test");
        setActiveDice([
          {
            id: "w1",
            value: 1,
            active: true,
          },
          {
            id: "w2",
            value: 1,
            active: true,
          },
          {
            id: "w3",
            value: 1,
            active: true,
          },
          {
            id: "b1",
            value: 1,
            active: false,
          },
          {
            id: "b2",
            value: 1,
            active: false,
          },
        ]);
        break;

      default:
        break;
    }
  }

  switch (id) {
    case 1001:
      resolveDisplay = <p>Resolving Prologue</p>;
      break;

    default:
      resolveDisplay = <p>Resolving Event #{id}</p>;
      break;
  }

  return (
    <>
      {AdventureCard({ card: drawPile[0]! })}
      {resolveDisplay}
      <div className="next-phase-wrapper">
        <button
          className="next-phase-button"
          onClick={() => {
            resolveAdventureCardsEffects();
            let drawPileCopy = drawPile;
            drawPileCopy.shift();
            setDrawPile(drawPileCopy);
            setSubPhase(getSubPhaseNumber("PLACEMENT DICE ROLL"));
          }}
        >
          Placement Roll
        </button>
      </div>
    </>
  );
}
