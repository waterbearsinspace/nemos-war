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
    case "Rest":
      return (
        <div className="test">
          <DiceTray numDice={2} buttonText="Roll for Rest Result" />
        </div>
      );
    case "Repair":
      return (
        <div className="test">
          <DiceTray numDice={2} buttonText="Roll for Repair Result" />
        </div>
      );
    case "Search":
      return (
        <div className="test">
          <DiceTray numDice={2} buttonText="Roll for Search Result" />
        </div>
      );
    default:
      return <></>;
  }
}
