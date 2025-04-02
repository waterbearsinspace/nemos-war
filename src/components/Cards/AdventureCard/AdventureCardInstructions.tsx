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
    default:
      return <p>Invalid Card ID {id}</p>;
  }
}
