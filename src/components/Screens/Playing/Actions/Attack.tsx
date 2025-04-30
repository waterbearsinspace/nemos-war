// game store
import { nemosStore } from "../../../../common/stores/nemosStore";
import { useNemosCore } from "../../../../common/scripts/nemosCore/useNemosCore";

// components
import Oceans from "../Oceans";

// css
import "./Attack.css";
import ShipToken from "../../../Ships/ShipToken";
import { diceStore } from "../../../../common/stores/diceStore";
import TableAndTest from "../../../Dice/TableAndTest";
import { adjustNotorietyBy } from "../../../../common/scripts/nemosCore/nemosCoreNotoriety";
import TonnageTrack from "../TonnageTrack";

export default function Attack() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const previousSubPhase = nemosStore((state) => state.previousSubPhase);
  const attackTarget = nemosStore((state) => state.attackTarget);
  const oceans = nemosStore((state) => state.oceans);
  const setOceans = nemosStore((state) => state.setOceans);
  const setAttackType = nemosStore((state) => state.setAttackType);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const currentNautilusOcean = oceans.find((ocean) => {
    return ocean.name == currentNautilusOceanName;
  });
  const doneRolling = diceStore((state) => state.doneRolling);
  const combatPhase = nemosStore((state) => state.combatPhase);
  const setCombatPhase = nemosStore((state) => state.setCombatPhase);
  const setDoneRolling = diceStore((state) => state.setDoneRolling);
  const resolving = nemosStore((state) => state.resolving);
  const setResolving = nemosStore((state) => state.setResolving);
  const attackType = nemosStore((state) => state.attackType);
  const hitAmount = nemosStore((state) => state.hitAmount);
  const setHitAmount = nemosStore((state) => state.setHitAmount);

  const activeDice = ["w1", "w2"];
  const activeDiceArray = diceStore((state) => state.dice).filter((die) =>
    activeDice.includes(die.id)
  );
  const sumRolled = doneRolling
    ? activeDiceArray.reduce((sum, die) => sum + die.value, 0)
    : 0;

  const selectTargetText = "Select a ship to attack";
  const selectAttackType = "Select an Attack type";

  const currentOcean = nemosStore((store) =>
    store.oceans.find((ocean) => ocean.name == store.currentNautilusOceanName)
  )!;
  const currentOceanShips = currentOcean.ships.filter(
    (ship) => typeof ship != "string"
  );
  const otherWarshipsPresent = currentOceanShips.find((ship) => {
    return ship != attackTarget && ship.groupId != "A";
  });

  const upgrades = nemosStore((state) => state.currentUpgrades);
  const hasReinforcedArmor = upgrades.find(
    (upgrade) => upgrade.name == "Reinforced Armor"
  );
  const hasStrengthenedProw = upgrades.find(
    (upgrade) => upgrade.name == "Strengthened Prow"
  );
  const hasMonstrousDesign = upgrades.find(
    (upgrade) => upgrade.name == "Monstrous Design"
  );

  const successfulMonstrousStalk = hasMonstrousDesign && attackType == "Stalk";
  const reducedMonstrousStalkNotoriety =
    attackTarget?.notoriety! - 1 >= 0 ? attackTarget?.notoriety! - 1 : 0;

  const nemoExertionValue = nemosStore(
    (state) => state.nemo.exertionDRM[state.nemo.value]
  );
  const crewExertionValue = nemosStore(
    (state) => state.crew.exertionDRM[state.crew.value]
  );
  const hullExertionValue = nemosStore(
    (state) => state.hull.exertionDRM[state.hull.value]
  );

  const nemoExerted = diceStore.getState().exertingNemo;
  const crewExerted = diceStore.getState().exertingCrew;
  const hullExerted = diceStore.getState().exertingHull;

  const exertionDRM =
    (nemoExerted ? nemoExertionValue : 0) +
    (crewExerted ? crewExertionValue : 0) +
    (hullExerted ? hullExertionValue : 0);

  const dieValues = diceStore((state) => state.dice)
    .filter((die) => {
      return ["w1", "w2"].includes(die.id);
    })
    .map((die) => {
      return die.value;
    });

  const lowestDieValue = Math.min(...dieValues);

  const warshipAttackValue =
    (hasReinforcedArmor ? 1 : 0) + (otherWarshipsPresent ? -1 : 0) + sumRolled;

  const nautilusAttackValue =
    (attackType == "Stalk" ? 1 : 0) +
    exertionDRM +
    (hasStrengthenedProw ? 1 : 0) +
    (otherWarshipsPresent ? -1 : 0) +
    sumRolled;

  const {
    setSubPhase,
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,
    resetCombat,
    addTonnage,
    addSalvage,
    updateAttackOptions,
    applyFailedTestPenalty,
  } = useNemosCore();

  function OceanSelect() {
    return (
      <>
        <Oceans />
        <div className="move-select-side-pane">
          {!attackTarget ? (
            <h2>{selectTargetText}</h2>
          ) : (
            <div>
              <h2>Target Selected</h2>
              <div className="next-phase-wrapper">
                <button
                  className="next-phase-button"
                  onClick={() => {
                    if (!attackType) {
                      setCombatPhase("Selecting Attack Type");
                    } else {
                      if (attackTarget.groupId != "A") {
                        setCombatPhase("Warship Attacking");
                      } else setCombatPhase("Nautilus Attacking");
                    }
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  function AttackTypeSelect() {
    const handleClick = (type: string) => {
      setAttackType(type);
      if (attackTarget?.groupId != "A") {
        setCombatPhase("Warship Attacking");
      } else setCombatPhase("Nautilus Attacking");
    };
    return (
      <div className="move-select-side-pane">
        <div className="attack-target-info">
          <h2>Attacking</h2>
          <ShipToken thisShip={attackTarget!} size="large" />
          <p>
            with <strong>{currentNautilusOcean!.ships.length - 1} </strong>
            ship(s) remaining in the <strong>Nautilus</strong>'s ocean
          </p>
        </div>
        <div>
          <h2>{selectAttackType}</h2>
          <div className="attack-type-buttons">
            <button
              onClick={() => {
                handleClick("Bold");
              }}
            >
              Bold Attack
            </button>
            <button
              onClick={() => {
                handleClick("Stalk");
              }}
            >
              Stalk Attack
            </button>
          </div>
        </div>
      </div>
    );
  }

  function WarshipAttacking() {
    function resolveWarshipAttack() {
      setHitAmount(null);
      // if snake eyes
      if (sumRolled == 2) {
        // suffer 1d6 hits
        setCombatPhase("Roll For Number of Hits");
      }
      // else if less than target attack
      else if (warshipAttackValue < attackTarget?.attackStrength!) {
        // suffer hits equal to the lowest die's result
        setHitAmount(lowestDieValue);
        setCombatPhase("Suffer Warship Hits");
      }
      // if greater than or equal to ship attack
      else if (warshipAttackValue >= attackTarget?.attackStrength!) {
        // no effect
        setCombatPhase("Nautilus Attacking");
      }
      // end attack
      setResolving(true);
      setDoneRolling(false);
    }
    return (
      <div className="combat-screen">
        <TableAndTest id="Warship Attacking" />
        {doneRolling && (
          <div className="next-phase-wrapper">
            <button
              className="next-phase-button"
              onClick={() => {
                resolveWarshipAttack();
              }}
            >
              <p>Continue</p>
            </button>
          </div>
        )}
      </div>
    );
  }

  function RollForNumberOfHits() {
    return (
      <div className="apply-hits-roll-area">
        <>
          <TableAndTest id={"Roll for Number of Hits"} />
          {doneRolling && (
            <div className="next-phase-wrapper">
              <button
                className="next-phase-button"
                onClick={() => {
                  setDoneRolling(false);
                  setHitAmount(activeDiceArray[0].value);
                  setCombatPhase("Suffer Warship Hits");
                }}
              >
                <p>Apply Hits</p>
              </button>
            </div>
          )}
        </>
      </div>
    );
  }

  function SufferWarshipHits() {
    function applyHitAtLocation() {
      switch (activeDiceArray[0].value) {
        case 1:
          adjustNemoBy(-1);
          break;
        case 2:
        case 3:
          adjustCrewBy(-1);
          break;
        case 4:
        case 5:
        case 6:
          adjustHullBy(-1);
          break;
      }
    }
    return (
      <>
        <div className="combat-screen">
          {hitAmount! >= 1 && resolving && (
            <>
              <TableAndTest id={"Roll to Apply Hits"} />
              {doneRolling && (
                <div className="next-phase-wrapper">
                  <button
                    className="next-phase-button"
                    onClick={() => {
                      if (hitAmount! - 1 != 0) setDoneRolling(false);
                      applyHitAtLocation();
                      setHitAmount(hitAmount! - 1);
                      if (hitAmount! - 1 == 0) setResolving(false);
                    }}
                  >
                    <p>Apply Hit</p>
                  </button>
                </div>
              )}
            </>
          )}
          {!resolving && (
            <>
              <h2>All hits applied!</h2>
              <div className="next-phase-wrapper">
                <button
                  className="next-phase-button"
                  onClick={() => {
                    setDoneRolling(false);
                    setCombatPhase("Nautilus Attacking");
                  }}
                >
                  <p>Continue</p>
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }

  function NautilusAttacking() {
    function resolveNautilusAttack() {
      const newCurrentOceanShips = currentNautilusOcean?.ships.filter(
        (ship) => {
          return ship != attackTarget;
        }
      );
      const newOceans = oceans.map((ocean) => {
        return ocean == currentNautilusOcean
          ? { ...ocean, ships: newCurrentOceanShips! }
          : ocean;
      });

      // if greater than ship defense
      if (nautilusAttackValue >= attackTarget?.defenseStrength!) {
        // gain notoriety
        // 1 (min 0) if monstrous design and stalk attack
        adjustNotorietyBy(
          successfulMonstrousStalk
            ? reducedMonstrousStalkNotoriety
            : attackTarget?.notoriety!
        );
        setOceans(newOceans);
        setResolving(true);
        setCombatPhase("Select Tonnage Salvage");
      } else {
        // else if snake eyes
        if (sumRolled == 2) {
          // gain two notoriety
          adjustNotorietyBy(2);
          // lose two exerted ship resources
          if (nemoExerted) adjustNemoBy(-2);
          if (crewExerted) adjustCrewBy(-2);
          if (hullExerted) adjustHullBy(-2);
        }
        // else if less than target defense
        else if (nautilusAttackValue < attackTarget?.defenseStrength!) {
          // gain one notoriety
          adjustNotorietyBy(1);
          applyFailedTestPenalty();
        }
        // finish attack
        setShowNextPhaseButton(false);
        setSubPhase(previousSubPhase);
      }
    }
    return (
      <div className="combat-screen">
        <TableAndTest id="Nautilus Attacking" />
        {doneRolling && (
          <div className="next-phase-wrapper">
            <button
              className="next-phase-button"
              onClick={() => {
                resolveNautilusAttack();
              }}
            >
              <p>Continue</p>
            </button>
          </div>
        )}
      </div>
    );
  }

  function SelectTonnageSalvage() {
    const salvageable = nemosStore((state) => state.salvage) < 4;
    const foughtSeaSerpent = attackTarget?.name == "Sea Serpent";
    const seaSerpentSunk = "slain";
    const seaSerpentWreckage = "corpse";

    function selectTonnage() {
      if (currentNautilusOcean?.dieValue) {
        addTonnage(currentNautilusOcean.name);
        setResolving(false);
      } else {
        setResolving(true);
      }
      setCombatPhase("Placing Tonnage");
    }
    function selectSalvage() {
      addSalvage(attackTarget!);
      setCombatPhase("Claiming Salvage");
    }

    return (
      <div className="combat-screen">
        <div className="select-tonnage-salvage-area">
          <h2>
            You've {foughtSeaSerpent ? seaSerpentSunk : "sunk"} the{" "}
            {attackTarget?.name}!
          </h2>
          <ShipToken thisShip={attackTarget!} size={"large"} />
          {salvageable ? (
            <p>
              Claim the <strong>{attackTarget?.name}'s </strong>{" "}
              {foughtSeaSerpent ? seaSerpentWreckage : "wreckage"} as{" "}
              <strong>Tonnage</strong> to earn its
              <strong> Victory Points</strong>? Or use it as{" "}
              <strong>Salvage</strong>, forgoing its{" "}
              <strong>Victory Points</strong> so you may put it towards
              purchasing an <strong>Upgrade</strong>?
            </p>
          ) : (
            <>
              <p>
                Claim the sunken <strong>Ship</strong> as{" "}
                <strong>Tonnage</strong> to earn its
                <strong> Victory Points</strong>!
              </p>
              <p>
                (You are at the maximum amount of <strong>Salvage</strong> and
                cannot claim the {attackTarget?.name} as such)
              </p>
            </>
          )}

          <section className="select-tonnage-salvage-buttons">
            <button onClick={selectTonnage}>Tonnage</button>
            {salvageable && <button onClick={selectSalvage}>Salvage</button>}
          </section>
        </div>
      </div>
    );
  }

  function PlacingTonnage() {
    function handleClick() {
      if (attackType == "Bold" && currentNautilusOcean?.ships.length! > 0) {
        setCombatPhase("Bold Continue");
      } else {
        setShowNextPhaseButton(false);
        setSubPhase(previousSubPhase);
      }
    }
    return (
      <div className="tonnage-screen">
        <TonnageTrack />
        <div className="tonnage-side-pane">
          {resolving && (
            <div className="tonnage-select-track">
              <p>
                Select a <strong>Tonnage</strong> track to place
              </p>
              <ShipToken thisShip={attackTarget!} size="large" />
            </div>
          )}
          {!resolving && (
            <div className="tonnage-placed">
              <p>
                The <strong>{attackTarget?.name}</strong>
              </p>
              <p>
                claimed as <strong>Tonnage</strong>
              </p>
            </div>
          )}
        </div>
        {!resolving && (
          <div className="next-phase-wrapper">
            <button
              className="next-phase-button"
              onClick={() => {
                handleClick();
              }}
            >
              <p>Continue</p>
            </button>
          </div>
        )}
      </div>
    );
  }

  function ClaimingSalvage() {
    return (
      <div>
        <h2>
          {attackTarget?.name} taken as <strong>Salvage</strong>!
        </h2>

        <div className="next-phase-wrapper">
          <button
            className="next-phase-button"
            onClick={() => {
              setShowNextPhaseButton(false);
              setSubPhase(previousSubPhase);
            }}
          >
            <p>Continue</p>
          </button>
        </div>
      </div>
    );
  }

  function BoldAttackContinue() {
    function handleContinueAttack() {
      resetCombat();
      setAttackType("Bold");
      setCombatPhase("Selecting Target");
      updateAttackOptions();
    }
    return (
      <div className="bold-continue-screen">
        <h2>Continue to attack?</h2>
        <p>There are {currentOcean.ships.length} ship(s) remaining.</p>
        <div className="bold-continue-buttons">
          <button
            onClick={() => {
              setShowNextPhaseButton(false);
              setSubPhase(previousSubPhase);
            }}
          >
            <span className="text-red">No</span>
          </button>
          <button
            onClick={() => {
              handleContinueAttack();
            }}
          >
            <span className="text-green">Yes</span>
          </button>
        </div>
      </div>
    );
  }

  function Render() {
    switch (combatPhase) {
      case "Selecting Target":
        return <OceanSelect />;
      case "Selecting Attack Type":
        return <AttackTypeSelect />;
      case "Warship Attacking":
        return <WarshipAttacking />;
      case "Roll For Number of Hits":
        return <RollForNumberOfHits />;
      case "Suffer Warship Hits":
        return <SufferWarshipHits />;
      case "Nautilus Attacking":
        return <NautilusAttacking />;
      case "Select Tonnage Salvage":
        return <SelectTonnageSalvage />;
      case "Placing Tonnage":
        return <PlacingTonnage />;
      case "Claiming Salvage":
        return <ClaimingSalvage />;
      case "Bold Continue":
        return <BoldAttackContinue />;
    }
  }

  return (
    <div className="move-select">
      <Render />
    </div>
  );
}
