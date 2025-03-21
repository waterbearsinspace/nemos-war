import "./AdventureCard.css";

export type AdventureCardType = {
  id: number;
  title: string;
  flavorText: string;
  type: string;
};

export default function AdventureCard({ card }: { card: AdventureCardType }) {
  return (
    <div className="card">
      <div className="title">{card?.title}</div>
      <div className="type">{card?.type}</div>
      <div className="flavor-text">{card?.flavorText}</div>
    </div>
  );
}
