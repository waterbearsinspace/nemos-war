// game store
import { nemosStore } from "../../../common/stores/nemosStore";
import { diceStore } from "../../../common/stores/diceStore";

// components
import { Test } from "../../Dice/Test";
import AdventureCard, { adventureCard } from "./AdventureCard";

// utils
import { getSubPhaseNumber } from "../../../common/scripts/nemosCore/nemosCoreUtils";

// css
import "./AdventureCardResolution.css";
import { useNemosCore } from "../../../common/scripts/nemosCore/useNemosCore";
import TableAndTest from "../../Dice/TableAndTest";

import testCardInfo from "../../../common/data/testCards.json";
import { useState } from "react";

interface AdventureCardResolutionInterface {
  card: adventureCard;
}

export default function AdventurCardResolution({
  card,
}: AdventureCardResolutionInterface) {
  const subPhase = nemosStore((state) => state.currentSubPhase);
  const showNextPhaseButton = nemosStore((state) => state.showNextPhaseButton);
  const dice = diceStore((state) => state.dice);
  const setDice = diceStore((state) => state.setDice);
  const drawPile = nemosStore((state) => state.drawPile);
  const setDrawPile = nemosStore((state) => state.setDrawPile);
  const setAdventureDeck = nemosStore((state) => state.setAdventureDeck);
  const setCurrentNautilusOceanName = nemosStore(
    (state) => state.setCurrentNautilusOceanName
  );
  const oceans = nemosStore((state) => state.oceans);
  const doneRolling = diceStore((state) => state.doneRolling);
  const setActiveDice = diceStore((state) => state.setActiveDice);

  const currentOcean = nemosStore((store) =>
    store.oceans.find((ocean) => ocean.name == store.currentNautilusOceanName)
  )!;
  const currentOceanShips = currentOcean.ships.filter(
    (ship) => typeof ship != "string"
  );
  const warshipsPresent = currentOceanShips.find((ship) => {
    return ship.groupId != "A";
  });

  const activeDice = ["w1", "w2"];
  const activeDiceArray = diceStore((state) => state.dice).filter((die) =>
    activeDice.includes(die.id)
  );
  const sumRolled = doneRolling
    ? activeDiceArray.reduce((sum, die) => sum + die.value, 0)
    : 0;

  const nemoExertionValue =
    nemosStore.getState().nemo.exertionDRM[nemosStore.getState().nemo.value];
  const crewExertionValue =
    nemosStore.getState().crew.exertionDRM[nemosStore.getState().crew.value];
  const hullExertionValue =
    nemosStore.getState().hull.exertionDRM[nemosStore.getState().hull.value];
  const nemoExerted = diceStore.getState().exertingNemo;
  const crewExerted = diceStore.getState().exertingCrew;
  const hullExerted = diceStore.getState().exertingHull;
  const exertionDRM =
    (nemoExerted ? nemoExertionValue : 0) +
    (crewExerted ? crewExertionValue : 0) +
    (hullExerted ? hullExertionValue : 0);

  const {
    setSubPhase,
    adjustNotorietyBy,
    passCard,
    failCard,
    applyFailedTestPenalty,
    gainXTreasures,
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,
  } = useNemosCore();

  const cardsToHideWhenResolving = [2];
  const [hideCard, setHideCard] = useState<boolean>(
    cardsToHideWhenResolving.includes(card.id) ? true : false
  );

  function getTestInfo(id: number) {
    let info = testCardInfo.find((card) => card.id == id);

    return info;
  }

  function NextPhaseButton(args?: any) {
    return (
      <div className="next-phase-wrapper">
        <button
          className="next-phase-button"
          onClick={() => {
            handleNextPhase(args);
          }}
        >
          {subPhase == getSubPhaseNumber("RESOLVE EVENT CARD")
            ? "Placement Roll"
            : "Continue"}
        </button>
      </div>
    );
  }

  function ResolveDisplay() {
    switch (card.id) {
      // simple tests
      case 1:
      case 9:
      case 12:
      case 15: {
        return (
          <div>
            <TableAndTest
              id={card.id.toString()}
              testValue={getTestInfo(card.id)?.testValue}
              exertables={getTestInfo(card.id)?.exertable}
            />
            {doneRolling && <NextPhaseButton />}
          </div>
        );
      }

      // case 2: {
      //   const noMoreShips = activeDice.length == 0 && !clickedOcean;

      //   if (noMoreShips) setShowNextPhaseButton(true);

      //   setShowNextPhaseButton(true);

      //   return (
      //     <>
      //       <Oceans />
      //       <p>TO IMPLEMENT</p>
      //     </>
      //   );
      // }

      case 21: {
        const [needToDecide, setNeedToDecide] = useState(false);
        const [doneDeciding, setDoneDeciding] = useState(false);
        const [decision, setDecision] = useState(<></>);
        const [decision2, setDecision2] = useState("");

        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;

        const handlePass = () => {
          passCard(card);
          setDoneDeciding(true);
          setDecision(
            <div className="centered">
              <p>
                You chose to <span className="circle p"></span>
              </p>
            </div>
          );
        };
        const handleFail = () => {
          failCard(card);
          setDecision2("nemo");
          setDoneDeciding(true);
          setDecision(
            <div className="centered">
              <h2>
                You chose to <span className="circle f"></span>.
                <br />
                <br />
                You gain <span className="nemo-text">1 Nemo</span>.
              </h2>
            </div>
          );
        };

        return (
          <>
            {!needToDecide && (
              <>
                <div>
                  <TableAndTest
                    id={card.id.toString()}
                    testValue={getTestInfo(card.id)?.testValue}
                    exertables={getTestInfo(card.id)?.exertable}
                  />
                </div>{" "}
                {doneRolling &&
                  finalValue >= getTestInfo(card.id)?.testValue! && (
                    <div className="next-phase-wrapper">
                      <button
                        className="next-phase-button"
                        onClick={() => {
                          setNeedToDecide(true);
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                {doneRolling &&
                  finalValue < getTestInfo(card.id)?.testValue! && (
                    <NextPhaseButton />
                  )}
              </>
            )}
            {needToDecide && (
              <>
                {!doneDeciding && (
                  <div className="centered">
                    <h2>Select an option:</h2>
                    <div className="centered row">
                      <button
                        onClick={() => {
                          !doneDeciding ? handlePass() : {};
                        }}
                        className={`circle-button ${
                          doneDeciding ? `disabled` : ``
                        }`}
                      >
                        <div className="circle p"></div>
                      </button>
                      <button
                        onClick={() => {
                          !doneDeciding ? handleFail() : {};
                        }}
                        className={`circle-button ${
                          doneDeciding ? `disabled` : ``
                        }`}
                      >
                        <div className="circle f"></div>
                      </button>
                    </div>
                  </div>
                )}
                {doneDeciding && (
                  <>
                    {decision}
                    <NextPhaseButton args={decision2} />
                  </>
                )}
              </>
            )}
          </>
        );
      }

      case 24: {
        const [needToDecide, setNeedToDecide] = useState(false);
        const [doneDeciding, setDoneDeciding] = useState(false);
        const [decision, setDecision] = useState(<></>);
        const [decision2, setDecision2] = useState("");

        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;

        const handleNemo = () => {
          setDoneDeciding(true);
          setDecision2("nemo");
          setDecision(
            <div className="centered">
              <p>
                You gain <span className="nemo-text">1 Nemo</span>.
              </p>
            </div>
          );
        };
        const handleHull = () => {
          setDoneDeciding(true);
          setDecision2("hull");
          setDecision(
            <div className="centered">
              <h2>
                You lose <span className="hull-text">1 Hull</span>.
              </h2>
            </div>
          );
        };

        return (
          <>
            {!needToDecide && (
              <>
                <div>
                  <TableAndTest
                    id={card.id.toString()}
                    testValue={getTestInfo(card.id)?.testValue}
                    exertables={getTestInfo(card.id)?.exertable}
                  />
                </div>{" "}
                {doneRolling &&
                  finalValue < getTestInfo(card.id)?.testValue! && (
                    <div className="next-phase-wrapper">
                      <button
                        className="next-phase-button"
                        onClick={() => {
                          setNeedToDecide(true);
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                {doneRolling &&
                  finalValue >= getTestInfo(card.id)?.testValue! && (
                    <NextPhaseButton />
                  )}
              </>
            )}
            {needToDecide && (
              <>
                {!doneDeciding && (
                  <div className="centered">
                    <h2>Select an option:</h2>
                    <div className="centered row">
                      <button
                        onClick={() => {
                          !doneDeciding ? handleNemo() : {};
                        }}
                        className={`circle-button ${
                          doneDeciding ? `disabled` : ``
                        }`}
                      >
                        <div className="nemo-text">-1 Nemo</div>
                      </button>
                      <button
                        onClick={() => {
                          !doneDeciding ? handleHull() : {};
                        }}
                        className={`circle-button ${
                          doneDeciding ? `disabled` : ``
                        }`}
                      >
                        <div className="hull-text">-1 Hull</div>
                      </button>
                    </div>
                  </div>
                )}
                {doneDeciding && (
                  <>
                    {decision}
                    <NextPhaseButton args={decision2} />
                  </>
                )}
              </>
            )}
          </>
        );
      }

      case 29: {
        const [needToDecide, setNeedToDecide] = useState(false);
        const [doneDeciding, setDoneDeciding] = useState(false);
        const [decision, setDecision] = useState(<></>);
        const [decision2, setDecision2] = useState("");

        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;

        const handleTreasures = () => {
          setDecision2("treasure");
          setDoneDeciding(true);
          setDecision(
            <div className="centered">
              <h1>
                You collect <strong>+2 Treasures</strong>.
              </h1>
            </div>
          );
        };
        const handleCrew = () => {
          setDecision2("crew");
          setDoneDeciding(true);
          setDecision(
            <div className="centered">
              <h2>
                You gain <span className="crew-text">1 Crew</span>.
              </h2>
            </div>
          );
        };

        return (
          <>
            {!needToDecide && (
              <>
                <div>
                  <TableAndTest
                    id={card.id.toString()}
                    testValue={getTestInfo(card.id)?.testValue}
                    exertables={getTestInfo(card.id)?.exertable}
                  />
                </div>{" "}
                {doneRolling &&
                  finalValue >= getTestInfo(card.id)?.testValue! && (
                    <div className="next-phase-wrapper">
                      <button
                        className="next-phase-button"
                        onClick={() => {
                          setNeedToDecide(true);
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                {doneRolling &&
                  finalValue < getTestInfo(card.id)?.testValue! && (
                    <NextPhaseButton />
                  )}
              </>
            )}
            {needToDecide && (
              <>
                {!doneDeciding && (
                  <div className="centered">
                    <h2>Select an option:</h2>
                    <div className="centered row">
                      <button
                        onClick={() => {
                          !doneDeciding ? handleTreasures() : {};
                        }}
                        className={`circle-button ${
                          doneDeciding ? `disabled` : ``
                        }`}
                      >
                        <p className="bold">2 Treasures</p>
                      </button>
                      <button
                        onClick={() => {
                          !doneDeciding ? handleCrew() : {};
                        }}
                        className={`circle-button ${
                          doneDeciding ? `disabled` : ``
                        }`}
                      >
                        <p className="crew-text">1 Crew</p>
                      </button>
                    </div>
                  </div>
                )}
                {doneDeciding && (
                  <>
                    {decision}
                    <NextPhaseButton args={decision2} />
                  </>
                )}
              </>
            )}
          </>
        );
      }

      case 34: {
        const [needToDecide, setNeedToDecide] = useState(false);
        const [doneDeciding, setDoneDeciding] = useState(false);
        const [decision, setDecision] = useState(<></>);
        const [decision2, setDecision2] = useState("");

        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;

        const handleCrew = () => {
          setDoneDeciding(true);
          setDecision2("crew 2");
          setDecision(
            <div className="centered">
              <p>
                You lose <span className="crew-text">2 Crew</span>.
              </p>
            </div>
          );
        };
        const handleHull = () => {
          setDoneDeciding(true);
          setDecision2("hull 2");
          setDecision(
            <div className="centered">
              <h2>
                You lose <span className="hull-text">2 Hull</span>.
              </h2>
            </div>
          );
        };
        const handleBoth = () => {
          setDoneDeciding(true);
          setDecision2("crew hull");
          setDecision(
            <div className="centered">
              <h2>
                You lose <span className="crew-text">1 Crew</span> and{" "}
                <span className="hull-text">1 Hull</span>.
              </h2>
            </div>
          );
        };

        return (
          <>
            {!needToDecide && (
              <>
                <div>
                  <TableAndTest
                    id={card.id.toString()}
                    testValue={getTestInfo(card.id)?.testValue}
                    exertables={getTestInfo(card.id)?.exertable}
                  />
                </div>{" "}
                {doneRolling &&
                  finalValue < getTestInfo(card.id)?.testValue! && (
                    <div className="next-phase-wrapper">
                      <button
                        className="next-phase-button"
                        onClick={() => {
                          setNeedToDecide(true);
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  )}
                {doneRolling &&
                  finalValue >= getTestInfo(card.id)?.testValue! && (
                    <NextPhaseButton />
                  )}
              </>
            )}
            {needToDecide && (
              <>
                {!doneDeciding && (
                  <div className="centered">
                    <h2>Select an option:</h2>
                    <div>
                      <div className="centered row">
                        <button
                          onClick={() => {
                            !doneDeciding ? handleCrew() : {};
                          }}
                          className={`circle-button ${
                            doneDeciding ? `disabled` : ``
                          }`}
                        >
                          <div className="nemo-text">-2 Crew</div>
                        </button>
                        <button
                          onClick={() => {
                            !doneDeciding ? handleHull() : {};
                          }}
                          className={`circle-button ${
                            doneDeciding ? `disabled` : ``
                          }`}
                        >
                          <div className="hull-text">-2 Hull</div>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        !doneDeciding ? handleBoth() : {};
                      }}
                      className={`circle-button ${
                        doneDeciding ? `disabled` : ``
                      }`}
                    >
                      <div className="bold">-1 Both</div>
                    </button>
                  </div>
                )}
                {doneDeciding && (
                  <>
                    {decision}
                    <NextPhaseButton args={decision2} />
                  </>
                )}
              </>
            )}
          </>
        );
      }

      case 1001: {
        return (
          <div>
            <Test id={"1001"} numDice={1} />
            {doneRolling && (
              <div className="next-phase-wrapper">
                <button
                  className="next-phase-button"
                  onClick={handleCardResolution}
                >
                  Draw Event Card
                </button>
              </div>
            )}
          </div>
        );
      }

      case 1002: {
        return <></>;
      }

      default:
        return (
          // displays when there is no card resolution for the current card
          <div>
            <p>Resolving Event #{card.id}</p>
            <div className="next-phase-wrapper">
              <button className="next-phase-button" onClick={handleNextPhase}>
                {subPhase == getSubPhaseNumber("RESOLVE EVENT CARD")
                  ? "Placement Roll"
                  : "Continue"}
              </button>
            </div>
          </div>
        );
    }
  }

  function handleCardResolution(args?: any) {
    switch (card.id) {
      case 1: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          adjustNotorietyBy(4);
          applyFailedTestPenalty();
        } else if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          adjustNotorietyBy(-2);
        }
        break;
      }
      case 9: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          applyFailedTestPenalty();
        } else if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          gainXTreasures(2);
        }
        break;
      }
      case 12: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          adjustNotorietyBy(2);
          adjustHullBy(-2);
          applyFailedTestPenalty();
        } else if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          adjustNotorietyBy(1);
          gainXTreasures(1);
        }
        break;
      }
      case 15: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          adjustCrewBy(-1);
          applyFailedTestPenalty();
        } else if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          adjustCrewBy(2);
        }
        break;
      }
      case 21: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue >= getTestInfo(card.id)!.testValue) {
          if (args.args == "nemo") {
            failCard(card);
            adjustNemoBy(1);
          } else {
            passCard(card);
          }
        }
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          adjustNemoBy(-1);
          applyFailedTestPenalty();
        }
        break;
      }
      case 24: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          if (args.args == "nemo") adjustNemoBy(-1);
          else if (args.args == "hull") adjustHullBy(-1);
          applyFailedTestPenalty();
        } else if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          adjustHullBy(1);
        }
        break;
      }
      case 29: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          if (args.args == "crew") adjustCrewBy(1);
          else if (args.args == "treasure") gainXTreasures(2);
        }
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          adjustHullBy(-2);
          applyFailedTestPenalty();
        }
        break;
      }
      case 34: {
        const finalValue = exertionDRM + (warshipsPresent ? -1 : 0) + sumRolled;
        if (finalValue < getTestInfo(card.id)!.testValue) {
          failCard(card);
          if (args.args == "crew 2") adjustCrewBy(-2);
          else if (args.args == "hull 2") adjustHullBy(-2);
          else if (args.args == "crew hull") {
            adjustCrewBy(-1);
            adjustHullBy(-1);
          }
          applyFailedTestPenalty();
        }
        if (finalValue >= getTestInfo(card.id)!.testValue) {
          passCard(card);
          gainXTreasures(2);
        }
        break;
      }

      case 1001: {
        setDice([
          {
            id: "w1",
            value: dice.find((die) => (die.id = "w1"))!.value,
            placement: true,
          },
          {
            id: "w2",
            value: dice.find((die) => (die.id = "w2"))!.value,
            placement: true,
          },
          {
            id: "w3",
            value: dice.find((die) => (die.id = "w3"))!.value,
            placement: false,
          },
          {
            id: "b1",
            value: dice.find((die) => (die.id = "b1"))!.value,
            placement: false,
          },
          {
            id: "b2",
            value: dice.find((die) => (die.id = "b2"))!.value,
            placement: false,
          },
        ]);

        setCurrentNautilusOceanName(
          oceans.find((ocean) => ocean.id == dice[0].value)!.name
        );

        let drawPileCopy = drawPile.filter((card, index) => {
          if (index != 0) return card;
        });
        setDrawPile(drawPileCopy);
        setSubPhase("DRAW EVENT CARD");

        break;
      }
      case 1002: {
        setDice([
          {
            id: "w1",
            value: dice.find((die) => (die.id = "w1"))!.value,
            placement: true,
          },
          {
            id: "w2",
            value: dice.find((die) => (die.id = "w2"))!.value,
            placement: true,
          },
          {
            id: "w3",
            value: dice.find((die) => (die.id = "w3"))!.value,
            placement: false,
          },
          {
            id: "b1",
            value: dice.find((die) => (die.id = "b1"))!.value,
            placement: false,
          },
          {
            id: "b2",
            value: dice.find((die) => (die.id = "b2"))!.value,
            placement: false,
          },
        ]);

        setActiveDice(
          dice.filter((die) => {
            return die.placement;
          })
        );
        break;
      }

      default:
        break;
    }
  }

  const handleNextPhase = (args?: any) => {
    handleCardResolution(args);
    setHideCard(false);
    if (subPhase == getSubPhaseNumber("RESOLVE EVENT CARD")) {
      let drawPileCopy = drawPile.filter((card, index) => {
        if (index != 0) return card;
      });
      setDrawPile(drawPileCopy);
      setSubPhase("PLACEMENT DICE ROLL");
    } else {
      let adventureDeckCopy = drawPile.filter((card, index) => {
        if (index != 0) return card;
      });
      setAdventureDeck(adventureDeckCopy);
      setSubPhase("ACTION SELECT");
    }
  };

  return (
    <>
      {!hideCard && <AdventureCard card={card} />}
      <ResolveDisplay />
      {showNextPhaseButton && ( // display when there is a card resolution added for the current card
        <NextPhaseButton />
      )}
    </>
  );
}
