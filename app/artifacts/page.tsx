import {
  Clock3,
  Crown,
  Eye,
  Gem,
  Map,
  ScrollText,
  Shield,
  Sparkles,
} from "lucide-react";

const artifacts = [
  {
    name: "The Elder Wand",
    type: "Deathly Hallow · Wand",
    rarity: "Legendary",
    description:
      "A wand of extraordinary power and one of the three Deathly Hallows, passed through a long and dangerous line of owners.",
    icon: Sparkles,
  },
  {
    name: "Invisibility Cloak",
    type: "Deathly Hallow · Cloak",
    rarity: "Legendary",
    description:
      "A true cloak of invisibility that conceals its wearer and forms one of the three Deathly Hallows.",
    icon: Eye,
  },
  {
    name: "Resurrection Stone",
    type: "Deathly Hallow · Stone",
    rarity: "Legendary",
    description:
      "A mysterious stone said to call back echoes of those who have died, completing the trio of Deathly Hallows.",
    icon: Gem,
  },
  {
    name: "Marauder's Map",
    type: "Enchanted Map",
    rarity: "Rare",
    description:
      "A magical map of Hogwarts that reveals secret passages and shows people moving throughout the castle grounds.",
    icon: Map,
  },
  {
    name: "Time-Turner",
    type: "Magical Device",
    rarity: "Rare",
    description:
      "A regulated magical device that allows limited travel backward through time and requires careful use.",
    icon: Clock3,
  },
  {
    name: "Sorting Hat",
    type: "Enchanted Object",
    rarity: "Iconic",
    description:
      "The sentient hat that sorts new Hogwarts students into Gryffindor, Slytherin, Ravenclaw or Hufflepuff.",
    icon: Crown,
  },
  {
    name: "Sword of Gryffindor",
    type: "Magical Weapon",
    rarity: "Legendary",
    description:
      "A goblin-made sword associated with Godric Gryffindor that presents itself to worthy members of his house in moments of need.",
    icon: Shield,
  },
  {
    name: "Philosopher's Stone",
    type: "Alchemical Artifact",
    rarity: "Legendary",
    description:
      "A famed alchemical object capable of producing the Elixir of Life and transforming metals into gold.",
    icon: ScrollText,
  },
];

export default function ArtifactsPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="eyebrow">Wizarding lore</div>
        <h2>Magical artifacts</h2>
        <p className="lead" style={{ marginLeft: 0 }}>
          Discover legendary objects, enchanted devices and powerful relics that
          shaped the wizarding world.
        </p>

        <div className="grid" style={{ marginTop: 28 }}>
          {artifacts.map(({ name, type, rarity, description, icon: Icon }) => (
            <article className="card card-pad" key={name}>
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <div className="tag" style={{ marginTop: 18 }}>
                {rarity}
              </div>
              <h3>{name}</h3>
              <p className="muted" style={{ marginBottom: 10 }}>
                {type}
              </p>
              <p className="muted">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
