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
import { updateAttackOptions } from "../../../../common/scripts/nemosCore/nemoscoreCombat";

export default function Attack() {
  const setShowNextPhaseButton = nemosStore(
    (state) => state.setShowNextPhaseButton
  );
  const previousSubPhase = nemosStore((state) => state.previousSubPhase);
  const doneAttacking = nemosStore((state) => state.doneAttacking);
  const setDoneAttacking = nemosStore((state) => state.setDoneAttacking);
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

  const {
    setSubPhase,
    adjustNemoBy,
    adjustCrewBy,
    adjustHullBy,
    resetCombat,
    addTonnage,
    addSalvage,
  } = useNemosCore();

  const OceanSelect = () => {
    return (
      <>
        <Oceans />
        <div className="move-select-side-pane">
          <h2>{selectTargetText}</h2>
        </div>
      </>
    );
  };

  const setStartingCombatPhase = (type: string) => {
    setAttackType(type);
    if (attackTarget?.groupId != "A") {
      setCombatPhase("Warship Attacking");
    } else setCombatPhase("Nautilus Attacking");
  };

  const AttackTypeSelect = () => {
    return (
      <div className="move-select-side-pane">
        <div className="attack-target-info">
          <h2>Attacking</h2>
          <ShipToken thisShip={attackTarget!} />
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
                setStartingCombatPhase("Bold");
              }}
            >
              Bold Attack
            </button>
            <button
              onClick={() => {
                setStartingCombatPhase("Stalk");
              }}
            >
              Stalk Attack
            </button>
          </div>
        </div>
      </div>
    );
  };

  function applyWarshipHit() {
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
        adjustHullBy(-1);
        break;
    }
  }

  function RolltoApplyWarshipHits() {
    return (
      <div className="apply-hits-roll-area">
        {hitAmount == null && (
          <>
            <TableAndTest id={"Roll for Number of Hits"} />
            {doneRolling && (
              <div className="next-phase-wrapper">
                <button
                  className="next-phase-button"
                  onClick={() => {
                    setDoneRolling(false);
                    setHitAmount(activeDiceArray[0].value);
                  }}
                >
                  <p>Apply Hits</p>
                </button>
              </div>
            )}
          </>
        )}
        {hitAmount != null &&
          (hitAmount > 0 ? (
            <>
              <TableAndTest id={"Roll to Apply Hits"} />
              {hitAmount > 0 && doneRolling && (
                <div className="next-phase-wrapper">
                  <button
                    className="next-phase-button"
                    onClick={() => {
                      setDoneRolling(false);
                      applyWarshipHit();
                      setHitAmount(hitAmount - 1);
                      if (hitAmount - 1 == 0) setResolving(false);
                    }}
                  >
                    <p>Apply Hit</p>
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <h2>Done Applying Hits!</h2>
            </>
          ))}
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
      }
      setCombatPhase("Placing Tonnage");
    }
    function selectSalvage() {
      addSalvage(attackTarget!);
      setCombatPhase("Salvaged");
    }

    return (
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
            <strong>Victory Points</strong> so you may put it towards purchasing
            an <strong>Upgrade</strong>?
          </p>
        ) : (
          <>
            <p>
              Claim the sunken <strong>Ship</strong> as <strong>Tonnage</strong>{" "}
              to earn its
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
    );
  }

  const CombatScreen = () => {
    const warshipAttackValue =
      (hasReinforcedArmor ? 1 : 0) +
      (otherWarshipsPresent ? -1 : 0) +
      sumRolled;

    const nautilusAttackValue =
      (attackType == "Stalk" ? 1 : 0) +
      exertionDRM +
      (hasStrengthenedProw ? 1 : 0) +
      (otherWarshipsPresent ? -1 : 0) +
      sumRolled;

    function resolveWarshipAttack() {
      setHitAmount(null);
      // if greater than or equal to ship attack
      if (warshipAttackValue >= attackTarget?.attackStrength!) {
        // no effect
        setCombatPhase("Nautilus Attacking");
      }
      // else if snake eyes
      else if (sumRolled == 2) {
        // suffer 1d6 hits
        setCombatPhase("Suffer Warship Hits");
      }
      // else if less than target attack
      else if (warshipAttackValue < attackTarget?.attackStrength!) {
        // suffer hits equal to the lowest die's result
        setHitAmount(lowestDieValue);
        setCombatPhase("Suffer Warship Hits");
      }
      // end attack
      setDoneRolling(false);
      setResolving(true);
    }

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
      }
      // else if snake eyes
      else if (sumRolled == 2) {
        // gain two notoriety
        adjustNotorietyBy(2);
        // lose two exerted ship resources
        if (nemoExerted) adjustNemoBy(-2);
        if (crewExerted) adjustCrewBy(-2);
        if (hullExerted) adjustHullBy(-2);
        // finish attack
        setShowNextPhaseButton(false);
        setSubPhase(previousSubPhase);
      }
      // else if less than target defense
      else if (nautilusAttackValue < attackTarget?.defenseStrength!) {
        // gain one notoriety
        adjustNotorietyBy(1);
        // if lowest die roll is 1
        if (lowestDieValue == 1) {
          // lose 1 exerted ship resource
          if (nemoExerted) adjustNemoBy(-1);
          if (crewExerted) adjustCrewBy(-1);
          if (hullExerted) adjustHullBy(-1);
        }
        // else lose 2 exerted ship resource
        else {
          if (nemoExerted) adjustNemoBy(-2);
          if (crewExerted) adjustCrewBy(-2);
          if (hullExerted) adjustHullBy(-2);
        }
        // finish attack
        setShowNextPhaseButton(false);
        setSubPhase(previousSubPhase);
      }
    }

    function boldContinue() {
      if (attackType == "Bold" && currentNautilusOcean?.ships.length! > 0) {
        resetCombat();
        setAttackType("Bold");
        setCombatPhase("Bold Continue");
      } else {
        setShowNextPhaseButton(false);
        setSubPhase(previousSubPhase);
      }
    }

    if (combatPhase == "Warship Attacking") {
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
    } else if (combatPhase == "Suffer Warship Hits") {
      return (
        <div className="combat-screen">
          <RolltoApplyWarshipHits />
          {!resolving && (
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
          )}
        </div>
      );
    } else if (combatPhase == "Nautilus Attacking") {
      if (!doneAttacking) {
        return (
          <div className="combat-screen">
            <TableAndTest id="Nautilus Attacking" />
            {doneRolling && (
              <div className="next-phase-wrapper">
                <button
                  className="next-phase-button"
                  onClick={() => {
                    resolveNautilusAttack();
                    setDoneAttacking(true);
                    setResolving(true);
                  }}
                >
                  <p>Continue</p>
                </button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div className="combat-screen">
            <SelectTonnageSalvage />
            {!resolving && (
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
            )}
          </div>
        );
      }
    } else if (combatPhase == "Placing Tonnage") {
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
                  boldContinue();
                }}
              >
                <p>Continue</p>
              </button>
            </div>
          )}
        </div>
      );
    } else if (combatPhase == "Salvaged") {
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
    } else if (combatPhase == "Bold Continue") {
      return (
        <div className="bold-continue-screen">
          <h2>Continue to attack?</h2>
          <p>There are {currentOceanShips.length} ships remaining.</p>
          <div className="bold-continue-buttons">
            <button>
              <p
                className="text-red"
                onClick={() => {
                  setShowNextPhaseButton(false);
                  setSubPhase(previousSubPhase);
                }}
              >
                No
              </p>
            </button>
            <button>
              <p
                className="text-green"
                onClick={() => {
                  setCombatPhase("Selecting Target");
                  setAttackType("Bold");
                  updateAttackOptions();
                }}
              >
                Yes
              </p>
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="move-select">
      <>
        {combatPhase == "Selecting Target" ? (
          <OceanSelect />
        ) : combatPhase == "Selecting Attack Type" ? (
          <AttackTypeSelect />
        ) : (
          <CombatScreen />
        )}
      </>
    </div>
  );
}
