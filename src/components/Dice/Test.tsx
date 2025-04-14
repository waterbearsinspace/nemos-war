import DiceTray from "./DiceTray";

export function Test(arg: any) {
  switch (arg.id) {
    case "Act One":
      return (
        <div className="test">
          <DiceTray
            numDice={arg.numDice}
            buttonText="Roll for Starting Ocean"
          />
        </div>
      );
    default:
      return <></>;
  }
}
