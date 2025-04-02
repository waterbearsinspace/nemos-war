import AdventureCardInstructions from "./AdventureCardInstructions";

import "./AdventureCard.css";

export type AdventureCardType = {
  id: number;
  title: string;
  flavorText: string;
  type: string;
};

export default function AdventureCard({ card }: { card: AdventureCardType }) {
  return (
    <div className="card-wrapper">
      <div className="card-inner-border">
        <section className="card-number">
          <p>{card?.id < 1000 ? "Event #" + card?.id : card.type}</p>
        </section>
        <section className="card-info">
          <section className="card-half card-half-left">
            <header className="card-banner card-banner-left">
              <p className="card-title">{card?.title}</p>
            </header>
            <section className="card-content card-content-left">
              <article className="card-flavor-text">{card?.flavorText}</article>
            </section>
          </section>
          <section className="card-half card-half-right">
            <header className="card-banner card-banner-right">
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
