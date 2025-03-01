// // modules
// import { createClient } from "@supabase/supabase-js";

// // interfaces
// import { Database } from "./common/utils/supabase";

// components
import DiceTray from "./components/Dice/DiceTray";
import AdventureCard from "./components/Cards/AdventureCard.tsx/AdventureCard";
import MotiveSelector from "./components/Temp/MotiveSelector";

// css
import "./Game.css";

// data
import adventure_cards from "./common/data/adventure_cards.json";

function Game() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
      <DiceTray />
      <AdventureCard card={adventure_cards[0]} />
      <MotiveSelector />
    </div>
  );
}

export default Game;
