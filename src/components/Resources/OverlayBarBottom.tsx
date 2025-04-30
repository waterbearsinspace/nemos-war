import { nemosStore } from "../../common/stores/nemosStore";
import { TreasureToken } from "./TreasureToken";

export default function OverlayBarBottom() {
  const nemoValue = nemosStore((state) => state.nemo.value);
  const crewValue = nemosStore((state) => state.crew.value);
  const hullValue = nemosStore((state) => state.hull.value);
  const treasures = nemosStore((state) => state.currentTreasures);

  return (
    <section className="overlay-bar-content-wrapper">
      <section className="overlay-ship-resources-wrapper">
        <p>NEMO: {nemoValue}</p>
        <p>CREW: {crewValue}</p>
        <p>HULL: {hullValue}</p>
      </section>
      <section className="overlay-treasures-wrapper">
        <p className="overlay-treasures-header">TREASURES</p>

        {treasures.length > 0 ? (
          <div className="overlay-treasures-treasures">
            {treasures.map((treasure) => {
              return <TreasureToken treasure={treasure} key={treasure.id} />;
            })}
          </div>
        ) : (
          <div className="overlay-treasures-empty">
            <p>
              <em>No Treasures</em>
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
