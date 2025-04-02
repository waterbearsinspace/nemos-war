import { diceStore } from "../../../common/stores/diceStore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { getSubPhaseNumber } from "../../../common/utils/utils";
import DiceTray from "../../Dice/DiceTray";
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

  function Test() {
    return (
      <div>
        <DiceTray />
      </div>
    );
  }

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
            active: false,
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

  function ResolveDisplay() {
    switch (id) {
      case 1001:
        return (
          <div>
            <Test />
          </div>
        );

      default:
        return <p>Resolving Event #{id}</p>;
    }
  }

  return (
    <>
      {AdventureCard({ card: drawPile[0]! })}
      <ResolveDisplay />
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
