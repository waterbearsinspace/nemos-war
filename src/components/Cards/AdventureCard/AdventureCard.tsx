import AdventureCardInstructions from "../../../common/utils/AdventureCardInstructions";

import "./AdventureCard.css";

export type adventureCard = {
  id: number;
  title: string;
  flavorText: string;
  type: string;
};

export default function AdventureCard({ card }: { card: adventureCard }) {
  function getBannerColor(id: number, type: string) {
    if (id == 1004) {
      return "red";
    } else if ([1001, 1002, 1003].includes(card.id)) {
      return "black";
    } else
      switch (type) {
        case "Test":
          return "yellow";
        case "Keep":
          return "purple";
        case "Play":
          return "green";
      }
  }

  function getCardNumber(card: adventureCard) {
    if (card.id < 1000) {
      return "Event #" + card.id;
    } else if ([1001, 1002, 1003].includes(card.id)) {
      return card.type;
    } else {
      switch (card.id) {
        case 1004:
          return "Rising Action";
        case 9001:
          return "Finale A";
        case 9002:
          return "Finale B";
        case 9003:
          return "Finale C";
        case 9004:
          return "Finale D";
        case 9005:
          return "Finale E";
        case 9006:
          return "Finale F";
        case 9007:
          return "Finale G";
      }
    }
  }

  return (
    <div className="card-wrapper">
      <div className="card-inner-border">
        <section className="card-number">
          <p>{getCardNumber(card)}</p>
        </section>
        <section className="card-info">
          <section className="card-half card-half-left">
            <header
              className="card-banner card-banner-left"
              data-banner-color={
                card.id > 9000 ? "black" : getBannerColor(card.id, card.type)
              }
            >
              <p className="card-title">{card?.title}</p>
            </header>
            <section className="card-content card-content-left">
              <article className="card-flavor-text">{card?.flavorText}</article>
            </section>
          </section>
          <section className="card-half card-half-right">
            <header
              className="card-banner card-banner-right"
              data-banner-color={getBannerColor(card.id, card.type)}
              data-banner-lighter={
                ![1001, 1002, 1003, 1004].includes(card.id) ? "true" : "false"
              }
            >
              <p className="card-type">{card?.type}</p>
            </header>
            <article className="card-content card-content-right">
              {AdventureCardInstructions(card.id)}
            </article>
          </section>
        </section>
      </div>
    </div>
  );
}
