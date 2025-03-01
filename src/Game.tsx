// // modules
// import { createClient } from "@supabase/supabase-js";

// // interfaces
// import { Database } from "./common/utils/supabase";

// components
import DiceTray from "./components/Dice/DiceTray";
import MotiveSelector from "./components/Temp/MotiveSelector";
import DrawPile from "./components/Cards/DrawPile";

// css
import "./Game.css";

// data
import adventureCards from "./common/data/adventure_cards.json";
import motives from "./common/data/motives.json";
import { gameStateStore } from "./common/stores/gameStateStore";
import { useEffect } from "react";
import AdventureDeck from "./components/Cards/AdventureDeck";

export default function Game() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Nemo's War</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <DiceTray />
        <MotiveSelector />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <h2></h2>
        <DrawPile />
        <AdventureDeck />
      </div>
    </div>
  );
}
