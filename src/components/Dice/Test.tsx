import { nemosStore } from "../../common/stores/nemosStore";
import { ResourceSelect } from "../Resources/ResourceSelect";
import ShipToken from "../Ships/ShipToken";
import DiceTray from "./DiceTray";

interface TestInterface {
  id: string;
  numDice?: number;
  exertables?: string[];
}
export function Test({ id, numDice, exertables }: TestInterface) {
  const attackTarget = nemosStore((state) => state.attackTarget);
  const resolving = nemosStore((state) => state.resolving);

  switch (id) {
    case "Rest":
      return (
        <div className="test">
          <DiceTray
            numDice={2}
            buttonText="Roll for Rest Result"
            nemoExertable={true}
            hullExertable={true}
            amountExertable={1}
          />
        </div>
      );
    case "Repair":
      return (
        <div className="test">
          <DiceTray
            numDice={2}
            buttonText="Roll for Repair Result"
            nemoExertable={true}
            crewExertable={true}
            amountExertable={1}
          />
        </div>
      );
    case "Search":
      return (
        <div className="test">
          {!resolving ? (
            <DiceTray
              numDice={2}
              buttonText="Roll for Search Result"
              nemoExertable={true}
              crewExertable={true}
              hullExertable={true}
              amountExertable={1}
            />
          ) : (
            <div className="resource-space">
              <ResourceSelect option="crew" amountSelectable={1} />
              <ResourceSelect option="hull" amountSelectable={1} />
            </div>
          )}
        </div>
      );
    case "Warship Attacking":
      return (
        <>
          <div className="ship-and-dice-tray">
            <section className="attack-target">
              <h2>Being Attacked By</h2>
              <ShipToken thisShip={attackTarget!} size={"large"} />
            </section>
            <div className="test">
              <DiceTray numDice={2} buttonText="Roll to Defend" />
            </div>
          </div>
        </>
      );
    case "Nautilus Attacking":
      return (
        <>
          <div className="ship-and-dice-tray">
            <section className="attack-target">
              <h2>Attacking</h2>
              <ShipToken thisShip={attackTarget!} size={"large"} />
            </section>
            <div className="test">
              <DiceTray
                numDice={2}
                buttonText="Roll to Attack"
                nemoExertable={true}
                crewExertable={true}
                hullExertable={true}
                amountExertable={1}
              />
            </div>
          </div>
        </>
      );
    case "Roll for Number of Hits":
      return (
        <>
          <div className="ship-and-dice-tray">
            <div className="test">
              <DiceTray numDice={1} buttonText="Roll for Number of Hits" />
            </div>
          </div>
        </>
      );
    case "Roll to Apply Hits":
      return (
        <>
          <div className="ship-and-dice-tray">
            <div className="test">
              <DiceTray numDice={1} buttonText="Roll for Resource to Lose" />
            </div>
          </div>
        </>
      );

    // ===============================================
    // ADVENTURE CARDS
    // ===============================================
    case "1":
    case "9":
    case "12":
    case "15":
    case "21":
    case "24":
    case "34":
      return (
        <div className="test">
          <DiceTray
            numDice={2}
            buttonText="Roll Dice"
            nemoExertable={exertables?.includes("nemo")}
            crewExertable={exertables?.includes("crew")}
            hullExertable={exertables?.includes("hull")}
            amountExertable={exertables?.length}
          />
        </div>
      );

    // ===============================================
    // ACT CARDS
    // ===============================================

    case "1001":
      return (
        <div className="test">
          <DiceTray numDice={numDice} buttonText="Roll for Starting Ocean" />
        </div>
      );

    default:
      return (
        <div className="test">
          <DiceTray numDice={2} buttonText="Roll Dice" />
        </div>
      );
  }
}
