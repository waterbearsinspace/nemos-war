import { nemosStore } from "../../../common/stores/nemosStore";
import "./Oceans.css";

export default function Oceans() {
  const oceans = nemosStore((state) => state.oceans);
  const currentNautilusOcean = nemosStore(
    (state) => state.currentNautilusOcean
  );

  function OceanSpaces() {
    return (
      <div className="ocean-space-container">
        {oceans.map((ocean) => {
          function shipSpaces() {
            let shipSpaces = [];
            for (let i = 0; i < ocean.maxShips; i++) {
              shipSpaces.push(
                <div className="ship-space" key={i}>
                  <p>{ocean.ships[i] == "Hidden Ship" ? "Hidden Ship" : ""}</p>
                </div>
              );
            }
            return shipSpaces;
          }
          return (
            <div className="ocean-space" key={ocean.name}>
              {ocean.name}
              <p className="ocean-nautilus">
                {currentNautilusOcean == ocean.name ? "You Are Here" : ""}
              </p>
              {shipSpaces()}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="ocean-board">
        <OceanSpaces />
      </div>
    </>
  );
}
