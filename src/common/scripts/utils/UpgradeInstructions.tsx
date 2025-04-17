export default function UpgradeInstructions(name: string) {
  switch (name) {
    case "Arcane Library":
      return (
        <p>
          You receive a <strong>+1 DRM</strong> when performing a{" "}
          <strong>Search</strong> <em>OR</em> <strong>Incite Action</strong>.
        </p>
      );
    case "Double Hull":
      return (
        <p>
          Gain an additional <strong>+1 DRM</strong> when{" "}
          <strong>Exerting</strong> your <span className="hull-text">Hull</span>{" "}
          <strong>Resource</strong>. Also, ignore all <strong>6</strong> results
          when rolling to apply damage to the <em>Nautilus</em>.
        </p>
      );
    case "Electro-Powered Crew Armor":
      return (
        <p>
          You may use this card once during each{" "}
          <strong>Bold Attack Action</strong> for <em>EITHER</em> a{" "}
          <strong>+1 DRM</strong> <em>after</em> a dice roll, <em>OR</em> you
          may remove (i.e. Destroy) this card for a <strong>+2 DRM</strong>{" "}
          <em>after</em> a dice roll.
        </p>
      );
    case "Fog Machine":
      return (
        <p>
          During your <strong>Action Phase</strong>, <strong>1 Action</strong>,
          you may remove (i.e., Destroy) this card to decrease your{" "}
          <strong>Notoriety</strong> by <strong>2d6</strong>
        </p>
      );
    case "Hydro Drive":
      return (
        <p>
          Each time you perform a <strong>Move Action</strong>, you may move the{" "}
          <em>Nautilus</em> an additional second time for free.
        </p>
      );
    case "Monstrous Design":
      return (
        <p>
          Gain one fewer <strong>Notoriety</strong> per <strong>Ship</strong>{" "}
          token that you sink from a <strong>Stalk Attack</strong> (only, down
          to a minimum of <strong> 0</strong>).
        </p>
      );
    case "Periscope Device":
      return (
        <p>
          You no longer gain <strong>+1 Notoriety</strong> between consecutive{" "}
          <strong>Bold Attacks</strong>. Also, you can now make consecutive{" "}
          <strong>Stalk Attacks</strong>, if successful, but you <em>DO</em>{" "}
          gain <strong>+1 Notoriety</strong> between each.
        </p>
      );
    case "Reinforced Armor":
      return (
        <p>
          Attacking Warships receive <strong>+1 DRM</strong> to all{" "}
          <strong>Attack</strong> dice rolls.
        </p>
      );
    case "Steam Torpedoes":
      return (
        <p>
          Once per <strong>Action Phase</strong>, you may make one free{" "}
          <strong>Torpedo Attack</strong> at the <em>Nautilus'</em> location.
          Roll <strong>2d6</strong> and sink the targeted{" "}
          <strong>Non-Warship</strong> on a <strong>5+</strong>, or targeted{" "}
          <strong>Warship</strong> on a <strong>6+</strong>. After you first{" "}
          <strong>MISS</strong>, however, you roll only <strong>1d6</strong> for{" "}
          <strong>Torpedo Attacks</strong> for the rest of the game.
        </p>
      );
    case "Strengthened Prow":
      return (
        <p>
          Receive a <strong>+1 DRM</strong> to all <em>Nautilus</em>{" "}
          <strong>non-Torpedo Attacks</strong>.
        </p>
      );
    default:
      return <p></p>;
  }
}
