import { nemosStore } from "../../common/stores/nemosStore";

export default function GameOver() {
  const gameLostMessage = nemosStore((state) => state.gameLostMessage);

  return (
    <section>
      <h2>
        <p>You lost the game!</p>
        <p>{gameLostMessage != "" ? gameLostMessage : ""}</p>
      </h2>
    </section>
  );
}
