// modules
import { useState } from "react";

// css
import "./MotiveSelector.css";

// gameState
import { gameStateStore } from "../../common/stores/gameStateStore";

// types
import { MotiveType } from "../../common/stores/game-state-slices/motiveSlice";

// data
import motiveData from "../../common/data/motives.json";

export default function MotiveSelector() {
  const motiveIndex = gameStateStore((state) => state.motiveIndex);
  const setMotiveIndex = gameStateStore((state) => state.setMotiveIndex);

  const handleClick = (inc: number) => {
    if (motiveIndex + inc > motiveData.length - 1) {
      setMotiveIndex(0);
    } else if (motiveIndex + inc < 0) {
      setMotiveIndex(motiveData.length - 1);
    } else setMotiveIndex(motiveIndex + inc);
  };

  return (
    <div className="card">
      <div className="title">{"Motive"}</div>
      <div className="type">{motiveData[motiveIndex].name}</div>
      <div className="flavor-text">{}</div>
      <div className="button-wrapper">
        <button
          onClick={() => {
            handleClick(-1);
          }}
        >
          ←
        </button>
        <button
          onClick={() => {
            handleClick(1);
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
