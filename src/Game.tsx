// modules
import { createClient } from "@supabase/supabase-js";

// interfaces
import { Database } from "./common/utils/supabase";

// components
import DiceTray from "./components/Dice/DiceTray";
import AdventureCard from "./components/Cards/AdventureCard.tsx/AdventureCard";

// css
import "./Game.css";

// data
import adventure_cards from "./common/data/adventure_cards.json";

function Game() {
  console.log(adventure_cards);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
      <DiceTray />
      <AdventureCard card={adventure_cards[0]} />
    </div>
  );
}

export default Game;
