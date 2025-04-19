import { nemosStore } from "../../common/stores/nemosStore";
import { ship } from "../../common/stores/slices/shipPoolsSlice";

interface ShipTokenInterface {
  thisShip: ship | string;
  handleClickShip?: (thisShip: ship) => void;
}

export default function ShipToken({
  thisShip,
  handleClickShip,
}: ShipTokenInterface) {
  const placementOptions = nemosStore((state) => state.oceanClickOptions);

  return (
    <div
      className="ship-space"
      data-ship-group={
        thisShip
          ? typeof thisShip != "string"
            ? thisShip?.groupId
            : "hidden"
          : ""
      }
      data-placement={placementOptions.includes(thisShip) ? "highlight" : ""}
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
    </div>
  );
}
