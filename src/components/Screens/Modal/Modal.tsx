import TreasureIcon from "../../../common/assets/TreasureIcon";
import { useNemosCore } from "../../../common/scripts/nemosCore/useNemosCore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { TreasureToken } from "../../Resources/TreasureToken";
import "./Modal.css";

export default function Modal() {
  const modalContentsId = nemosStore((state) => state.modalContentsId);
  const setModalContentsId = nemosStore((state) => state.setModalContentsId);
  const setShowModal = nemosStore((state) => state.setShowModal);
  const currentlyUsedTreasure = nemosStore(
    (state) => state.currentlyUsedTreasure
  );
  const setCurrentlyUsedTreasure = nemosStore(
    (state) => state.setCurrentlyUsedTreasure
  );

  const { useTreasure } = useNemosCore();

  const dismissModal = () => {
    setShowModal(false);
    setModalContentsId(null);
    setCurrentlyUsedTreasure(null);
  };

  const handleUseTreasure = () => {
    useTreasure(currentlyUsedTreasure!.id);
    dismissModal();
  };

  function UseTreasureButtons() {
    return (
      <div className="use-treasure-buttons">
        <button onClick={dismissModal}>No</button>
        <button onClick={handleUseTreasure}>Yes</button>
      </div>
    );
  }

  function ModalContents() {
    if (modalContentsId?.includes("treasure")) {
      if (modalContentsId.includes("11") || modalContentsId.includes("12")) {
        return (
          <>
            <TreasureToken treasure={currentlyUsedTreasure!} display={true} />
            <div className="centered row text">
              <span>Discard this </span>
              <strong>
                <TreasureIcon />{" "}
              </strong>
              <span>
                to gain <span className="nemo-text">1 Nemo</span>?
              </span>
            </div>
            <UseTreasureButtons />
          </>
        );
      } else if (modalContentsId.includes("13")) {
        return (
          <>
            <TreasureToken treasure={currentlyUsedTreasure!} display={true} />
            <div className="centered row text">
              <span>Discard this </span>
              <strong>
                <TreasureIcon />{" "}
              </strong>
              <span>
                to gain <span className="crew-text">1 Crew</span>?
              </span>
            </div>
            <UseTreasureButtons />
          </>
        );
      } else if (modalContentsId.includes("14")) {
        return (
          <>
            <TreasureToken treasure={currentlyUsedTreasure!} display={true} />
            <div className="centered row text">
              <span>Discard this </span>
              <strong>
                <TreasureIcon />{" "}
              </strong>
              <span>
                to gain <span className="hull-text">1 Hull</span>?
              </span>
            </div>
            <UseTreasureButtons />
          </>
        );
      } else if (
        modalContentsId.includes("15") ||
        modalContentsId.includes("16") ||
        modalContentsId.includes("17") ||
        modalContentsId.includes("18")
      ) {
        return (
          <>
            <TreasureToken treasure={currentlyUsedTreasure!} display={true} />
            <div className="centered row text">
              <span>Discard this </span>
              <strong>
                <TreasureIcon text={false} />{" "}
              </strong>
              <span>
                to gain <span className="bold">1 Action</span>?
              </span>
            </div>
            <UseTreasureButtons />
          </>
        );
      } else if (
        modalContentsId.includes("19") ||
        modalContentsId.includes("20") ||
        modalContentsId.includes("21") ||
        modalContentsId.includes("22")
      ) {
        return (
          <>
            <TreasureToken treasure={currentlyUsedTreasure!} display={true} />
            <div className="centered row text">
              <span>Discard this </span>
              <strong>
                <TreasureIcon />{" "}
              </strong>
              <span>
                to gain <span className="bold">1 Re-Roll</span>?
              </span>
            </div>
            <UseTreasureButtons />
          </>
        );
      }
    }
  }

  return (
    <div className="modal-screen">
      <div className="modal-wrapper">
        <div className="modal">
          <ModalContents />
        </div>
      </div>
    </div>
  );
}
