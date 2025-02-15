// modules
import { createClient } from "@supabase/supabase-js";

// interfaces
import { Database } from "./common/utils/supabase";

// components and css
import DiceTray from "./components/Dice/DiceTray";
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
    <>
      <DiceTray />
    </>
  );
}

export default Game;
