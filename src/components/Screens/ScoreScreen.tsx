import { useNemosCore } from "../../common/scripts/nemosCore/useNemosCore";
import { nemosStore } from "../../common/stores/nemosStore";

import "./ScoreScreen.css";

export default function ScoreScreen() {
  const { getScore, getTotalScore } = useNemosCore();
  const motive = nemosStore((state) => state.currentMotive);

  return (
    <div className="score-grid">
      <p>
        Warships Sunk (
        {motive.warships < 0 ? motive.warships : "+" + motive.warships})
      </p>
      <p>{getScore().warships}</p>
      <p>
        Non Warships Sunk (
        {motive.nonWarships < 0 ? motive.nonWarships : "+" + motive.nonWarships}
        )
      </p>
      <p>{getScore().nonWarships}</p>
      <p>Scourge of the Seas</p>
      <p>{getScore().scourgeOfTheSeas}</p>

      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>

      <p>
        Adventure Cards Passed (
        {motive.adventureCards < 0
          ? motive.adventureCards
          : "+" + motive.adventureCards}
        )
      </p>
      <p>{getScore().adventurePassedCardsScore}</p>
      <p>
        Adventure Upgrades (
        {motive.adventureCards < 0
          ? motive.adventureCards
          : "+" + motive.adventureCards}
        )
      </p>
      <p>{getScore().adventureUpgradesScore}</p>

      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>

      <p>
        Treasure (
        {motive.treasure < 0 ? motive.treasure : "+" + motive.treasure})
      </p>
      <p>{getScore().treasureScore}</p>

      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>

      <p>Science Cards Passed (x{motive.scienceDiscovered})</p>
      <p>{getScore().sciencePassedCardsScore}</p>
      <p>Science Upgrades (x{motive.scienceDiscovered})</p>
      <p>{getScore().scienceUpgradesScore}</p>
      <p>Science Hull Score (x{motive.scienceDiscovered})</p>
      <p>{getScore().scienceHullScore}</p>
      <p>Science Aronnax Score (x{motive.scienceDiscovered})</p>
      <p>{getScore().scienceAronnaxScore}</p>

      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>

      <p>Wonder Treasure Score (x{motive.wondersSeen})</p>
      <p>{getScore().wonderTreasureScore}</p>
      <p>Wonder Upgrades Score (x{motive.wondersSeen})</p>
      <p>{getScore().wonderUpgradesScore}</p>
      <p>Wonders Passed Cards Score (x{motive.wondersSeen})</p>
      <p>{getScore().wondersPassedCardsScore}</p>
      <p>Wonders Nemo Score (x{motive.wondersSeen})</p>
      <p>{getScore().wondersNemoScore}</p>
      <p>Wonder Ships Sunken (x{motive.wondersSeen})</p>
      <p>{getScore().wonderShipsSunken}</p>

      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>

      <p>Character Crew Score</p>
      <p>{getScore().charcterCrewScore}</p>
      <p>Character Passed Card Score</p>
      <p>{getScore().characterPassedCardScore}</p>

      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>
      <p className="empty"></p>

      <p>Penalties</p>
      <p>
        -
        {getScore().penaltyNemo +
          getScore().penaltyCrew +
          getScore().penaltyHull}
      </p>
      <p className="bold">Total</p>
      <p>{getTotalScore()}</p>
    </div>
  );
}
