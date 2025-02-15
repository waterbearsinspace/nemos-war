// modules
import { createClient } from "@supabase/supabase-js";

// interfaces
import { Database } from "./common/utils/supabase";

// components
import DiceTray from "./components/Dice/DiceTray";
import AdventureCard from "./components/Cards/AdventureCard.tsx/AdventureCard";

// css
import "./Game.css";

const supabaseUrl = "https://zisayqpykesvibypzfuy.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

let { data: adventure_cards, error } = await supabase
  .from("adventure_cards")
  .select("*")
  .order("id");

function Game() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
      <DiceTray />
      <AdventureCard card={adventure_cards[6]} />
    </div>
  );
}

export default Game;
