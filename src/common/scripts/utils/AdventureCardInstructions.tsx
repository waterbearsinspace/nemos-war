import TreasureIcon from "../../assets/TreasureIcon";

interface AdventureCardInstructionsInterface {
  id: number;
}
export default function AdventureCardInstructions({
  id,
}: AdventureCardInstructionsInterface) {
  switch (id) {
    case 1:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p" /> and <strong>-2 Notoriety</strong>.
            </p>
          </div>
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" /> and <strong>+4 Notoriety</strong>.
            </p>
          </div>
        </>
      );
    case 9:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p" /> and collect{" "}
              <strong>
                +2 <TreasureIcon text={true} />
              </strong>
              .
            </p>
          </div>
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" />.
            </p>
          </div>
        </>
      );
    case 12:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p" />, <strong>+1 Notoriety</strong>, and
              collect{" "}
              <strong>
                +1 <TreasureIcon text={true} />
              </strong>
              .
            </p>
          </div>
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" />, <strong>+2 Notoriety</strong>, and
              lose <span className="hull-text">1 Hull</span>.
            </p>
          </div>
        </>
      );
    case 15:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p" /> and gain{" "}
              <span className="crew-text">2 Crew</span>.
            </p>
          </div>
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" /> and lose{" "}
              <span className="crew-text">1 Crew</span>.
            </p>
          </div>
        </>
      );
    case 21:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p" />;{" "}
              <strong>
                <em>OR</em>
              </strong>
              <br />
              <br />
              <span className="circle f" /> and gain{" "}
              <span className="nemo-text">1 Nemo</span>.
            </p>
          </div>
          <br />
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" /> and lose{" "}
              <span className="nemo-text">1 Nemo</span>.
            </p>
          </div>
        </>
      );
    case 24:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p"></span> and gain{" "}
              <span className="hull-text">1 Hull</span>.
            </p>
          </div>
          <br />
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" /> and lose
              <br />
              <span className="nemo-text">1 Nemo</span>{" "}
              <strong>
                <em>OR</em>
              </strong>{" "}
              <span className="hull-text">1 Hull</span>.
            </p>
          </div>
        </>
      );
    case 34:
      return (
        <>
          <div>
            <div className="bubble green" />
            <p className="text-green bold">Pass</p>
            <p>
              <span className="circle p"></span> and collect{" "}
              <strong>
                +2 <TreasureIcon text={true} />
              </strong>
              .
            </p>
          </div>
          <br />
          <br />
          <div>
            <div className="bubble red"></div>
            <p className="text-red bold">Fail</p>
            <p>
              <span className="circle f" /> and lose{" "}
              <span className="crew-text">2 Crew</span>{" "}
              <strong>
                <em>OR</em>
              </strong>{" "}
              <span className="hull-text">2 Hull</span>{" "}
              <strong>
                <em>OR 1</em>
              </strong>{" "}
              of each.
            </p>
          </div>
        </>
      );

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
