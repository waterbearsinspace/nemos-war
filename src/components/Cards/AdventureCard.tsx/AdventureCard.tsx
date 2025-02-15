import "./AdventureCard.css";
import { Database } from "../../../common/utils/supabase";

type AdventureCard = Database["public"]["Tables"]["adventure_cards"]["Row"];

export default function AdventureCard({ card }: { card: AdventureCard }) {
  return (
    <div className="card">
      <div className="title">{card.title}</div>
      <div className="type">{card.type}</div>
      <div className="flavor-text">{card.flavor_text}</div>
    </div>
  );
}
