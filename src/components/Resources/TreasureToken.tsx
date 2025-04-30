import TreasureIcon from "../../common/assets/TreasureIcon";
import { getSubPhaseNumber } from "../../common/scripts/nemosCore/nemosCoreUtils";
import { nemosStore } from "../../common/stores/nemosStore";
import { treasure } from "../../common/stores/slices/treasuresSlice";

interface TreasureTokenInterface {
  treasure: treasure;
  display?: boolean;
}

export function TreasureToken({ treasure, display }: TreasureTokenInterface) {
  const setShowModal = nemosStore((state) => state.setShowModal);
  const setModalContentsId = nemosStore((state) => state.setModalContentsId);
  const setCurrentlyUsedTreasure = nemosStore(
    (state) => state.setCurrentlyUsedTreasure
  );
  const currentSubPhase = nemosStore((state) => state.currentSubPhase);

  const isXForAction = treasure.id >= 15 && treasure.id <= 18;
  const xForActionUsable =
    isXForAction && currentSubPhase == getSubPhaseNumber("ACTION SELECT");

  function handleXTreasure(treasure: treasure) {
    if (isXForAction) {
      if (xForActionUsable) {
        setModalContentsId("treasure " + treasure.id);
        setShowModal(true);
        setCurrentlyUsedTreasure(treasure);
      }
    } else {
      setModalContentsId("treasure " + treasure.id);
      setShowModal(true);
      setCurrentlyUsedTreasure(treasure);
    }
  }

  switch (treasure.type) {
    case "vp": {
      return (
        <div className="treasure-token">
          <div className="treasure-token-sides">
            <div className="treasure-token-sides-front ">
              <TreasureIcon white={true} />
            </div>
            <div className="treasure-token-sides-back">
              <p>{treasure.vp.treasures} VP</p>
            </div>
          </div>
        </div>
      );
    }
    case "wonder": {
      return (
        <div className="treasure-token">
          <div className="treasure-token-sides">
            <div className="treasure-token-sides-front ">
              <p>{treasure.vp.wondersSeen} VP</p>
            </div>
            <div className="treasure-token-sides-back smaller-text">
              <p>{treasure.name}</p>
            </div>
          </div>
        </div>
      );
    }
    case "retain": {
      return (
        <div
          className={`treasure-token ${
            display ? "" : "treasure-x"
          } smaller-text`}
          onClick={() => {
            handleXTreasure(treasure);
          }}
        >
          <p>
            {treasure.vp.treasures} VP OR
            <br />
            {treasure.name}
          </p>
        </div>
      );
    }
  }
}
