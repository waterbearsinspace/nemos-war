import { useNemosCore } from "../../../common/scripts/nemosCore/useNemosCore";
import { nemosStore } from "../../../common/stores/nemosStore";
import { ship } from "../../../common/stores/slices/shipPoolsSlice";
import ShipToken from "../../Ships/ShipToken";
import "./TonnageTrack.css";

export default function TonnageTrack() {
  const resolving = nemosStore((state) => state.resolving);
  const setResolving = nemosStore((state) => state.setResolving);
  const curentOcean = nemosStore((state) =>
    state.oceans.find((ocean) => {
      return ocean.name == state.currentNautilusOceanName;
    })
  );
  const adjacentOceans = nemosStore(
    (state) =>
      state.oceans.find((ocean) => {
        return ocean.name == state.currentNautilusOceanName;
      })?.adjacentOceans
  );
  const adjacentOceanNames = adjacentOceans?.map((ocean) => {
    return ocean.name;
  });

  const { addTonnage } = useNemosCore();

  const tonnageTracks = [
    nemosStore((state) => state.westernPacificTonnage),
    nemosStore((state) => state.easternPacificTonnage),
    nemosStore((state) => state.northAtlanticTonnage),
    nemosStore((state) => state.southAtlanticTonnage),
    nemosStore((state) => state.europeanSeasTonnage),
    nemosStore((state) => state.indianOceanTonnage),
  ];
  const oceanNames: string[] = [
    "Western Pacific",
    "Eastern Pacific",
    "North Atlantic",
    "South Atlantic",
    "European Seas",
    "Indian Ocean",
  ];
  const tonnageTrackLabels = [
    { label: "", value: "" },
    { label: "Inconvenience", value: "8" },
    { label: "Nuisance", value: "12" },
    { label: "Threat", value: "17" },
    { label: "Danger", value: "23" },
    { label: "Menace", value: "30" },
    { label: "Scourge", value: "40" },
  ];

  interface TonnageTrackSpacesInterface {
    track: ship[];
    index: number;
  }

  function TonnageTrackSpaces({ track, index }: TonnageTrackSpacesInterface) {
    let spaces = [];
    const latestTrackSpace = track.length;

    const isValid = adjacentOceanNames?.includes(oceanNames[index]);

    const handleClick = () => {
      addTonnage(oceanNames[index]);
      setResolving(false);
    };

    for (let i = 0; i < 6; i++) {
      if (i == latestTrackSpace) {
      }
      spaces.push(
        <div className="tonnage-track-space" key={i + 1 * index}>
          {track[i] ? (
            <ShipToken thisShip={track[i]} />
          ) : resolving && i == latestTrackSpace ? (
            <div>
              <div
                className={`${isValid ? `tonnage-track-click-space` : ``}`}
                onClick={() => {
                  resolving && isValid ? handleClick() : {};
                }}
              >
                <p>{isValid ? "Place here" : ""}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }

    return (
      <>
        <p className="tonnage-track-label">{oceanNames[index]}</p>
        {spaces}
      </>
    );
  }

  return (
    <section className="tonnage-track-wrapper">
      <div className="tonnage-track-board">
        <section className="tonnage-track-grid-wrapper">
          <div className="tonnage-track-grid">
            {tonnageTrackLabels.map((label) => {
              return (
                <div className="tonnage-track-head" key={label.label}>
                  <p>{label.value}</p>
                  <p>{label.label}</p>
                </div>
              );
            })}
            {tonnageTracks.map((track, index) => {
              return <TonnageTrackSpaces track={track} index={index} />;
            })}
          </div>
        </section>
      </div>
    </section>
  );
}
