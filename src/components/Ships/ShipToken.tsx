import { getSubPhaseNumber } from "../../common/scripts/nemosCore/nemosCoreUtils";
import { nemosStore } from "../../common/stores/nemosStore";
import { ocean } from "../../common/stores/slices/oceanSlice";
import { ship } from "../../common/stores/slices/shipPoolsSlice";

interface ShipTokenInterface {
  thisShip: ship | string;
  handleClickShip?: (thisShip: ship) => void;
  currentOcean?: ocean;
  size?: string;
}

export default function ShipToken({
  thisShip,
  handleClickShip,
  currentOcean,
  size,
}: ShipTokenInterface) {
  const clickOptions = nemosStore((state) => state.oceanClickOptions);
  const currentNautilusOceanName = nemosStore(
    (state) => state.currentNautilusOceanName
  );
  const currentNautilusOcean = nemosStore((state) =>
    state.oceans.find((ocean) => ocean.name == currentNautilusOceanName)
  );
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);
  const validClick =
    currentSubPhase == getSubPhaseNumber("ATTACK")
      ? currentNautilusOcean == currentOcean && clickOptions.includes(thisShip)
      : clickOptions.includes(thisShip);

  return (
    <div
      className={`ship-space ${size}`}
      data-ship-group={
        thisShip
          ? typeof thisShip != "string"
            ? thisShip?.groupId
            : "hidden"
          : ""
      }
      data-placement={validClick ? "highlight" : ""}
      onClick={() => {
        handleClickShip ? handleClickShip(thisShip as ship) : () => {};
      }}
    >
      <p className="ship-space-name">
        {thisShip
          ? typeof thisShip != "string"
            ? thisShip?.name
            : "Hidden Ship"
          : null}
      </p>
      <p className="ship-space-class">
        {thisShip
          ? typeof thisShip != "string"
            ? thisShip?.nationality + " " + thisShip?.shipClass
            : ""
          : null}
      </p>
      <p className="ship-space-attack">
        {thisShip
          ? typeof thisShip != "string"
            ? thisShip.attackStrength
            : ""
          : null}
      </p>
      <p className="ship-space-defense">
        {thisShip
          ? typeof thisShip != "string"
            ? thisShip.defenseStrength
            : ""
          : null}
      </p>
      <p className="ship-space-notoriety">
        {thisShip
          ? typeof thisShip != "string"
            ? thisShip.notoriety
            : ""
          : null}
      </p>
    </div>
  );
}
