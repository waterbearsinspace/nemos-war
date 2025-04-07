export default function AdventureCardInstructions(id: number) {
  switch (id) {
    case 1001:
      return (
        <>
          <p>
            Roll a die and place the <em>Nautilus</em> in the corresponding{" "}
            <strong>Major Ocean</strong>.
          </p>
          <br />
          <p>Commence play with the next card.</p>
          <br />
          <p>
            <strong>
              Roll only two white dice to begin each Placement Phase.
            </strong>
          </p>
        </>
      );

    case 1002:
      return (
        <>
          <p>
            Add the <strong>Dark Yellow Reinforcement Ship Group</strong> to the{" "}
            <strong>Ship Draw Pool</strong> and continue play with the next
            card.
          </p>
          <br />
          <p>
            <strong>
              Roll two white dice and one black die to begin each Placement
              Phase.
            </strong>
          </p>
        </>
      );

    case 1003:
      return (
        <>
          <p>
            Change{" "}
            <strong>
              Nemo's Motive <em>OR</em>
            </strong>{" "}
            select a <em>Nautilus</em> <strong>Upgrade</strong> card for
            purchase.
          </p>
          <br />
          <p>
            Add the <strong>Orange Reinforcement Ship Group</strong> to the{" "}
            <strong>Ship Draw Pool</strong> and continue play with the next
            card.
          </p>
          <br />
          <p>
            <strong>
              Roll three white dice and one black die to begin each Placement
              Phase, choosing any two of the white dice to determine Action
              Points or a Lull turn.
            </strong>
          </p>
        </>
      );

    case 1004:
      return <></>;

    default:
      return <p>Unimplemented Card ID {id}</p>;
  }
}
