import Link from "next/link";
import {
  ArrowRight,
  Gem,
  MessageCircle,
  Shield,
  Users,
  WandSparkles,
} from "lucide-react";
import { houses } from "@/lib/houses";
import HouseCard from "@/components/HouseCard";
import MostExplored from "@/components/MostExplored";

const features = [
  {
    title: "Explore Characters",
    text: "Meet witches, wizards, students and professors from across the wizarding world.",
    href: "/characters",
    icon: Users,
  },
  {
    title: "Discover Houses",
    text: "Learn the values, symbols and personalities behind the four Hogwarts houses.",
    href: "/houses",
    icon: Shield,
  },
  {
    title: "Learn Spells",
    text: "Browse a searchable spellbook powered by live Harry Potter data.",
    href: "/spells",
    icon: WandSparkles,
  },
  {
    title: "Magical Artifacts",
    text: "Explore legendary relics, enchanted devices and iconic objects from wizarding lore.",
    href: "/artifacts",
    icon: Gem,
  },
  {
    title: "Talk to Wizards",
    text: "Use AI to have an in-character conversation with iconic personalities.",
    href: "/chat",
    icon: MessageCircle,
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="eyebrow">The wizarding world awaits</div>
          <h1>Welcome to Hogwarts</h1>
          <p className="lead">
            Explore legendary characters, discover the four houses, master magical
            spells, uncover enchanted artifacts and step into AI-powered
            conversations with the wizarding world.
          </p>
          <div className="actions">
            <Link className="btn btn-primary" href="/characters">
              Start exploring <ArrowRight size={16} />
            </Link>
            <Link className="btn" href="/chat">
              Try AI Chat
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Explore</div>
              <h2>Choose your path</h2>
            </div>
          </div>
          <div className="grid">
            {features.map(({ title, text, href, icon: Icon }) => (
              <Link className="card card-pad" href={href} key={title}>
                <div className="feature-icon">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Hogwarts</div>
              <h2>The four houses</h2>
            </div>
            <Link href="/houses" className="muted">
              View all →
            </Link>
          </div>
          <div className="grid">
            {houses.map((house) => (
              <HouseCard house={house} key={house.name} />
            ))}
          </div>
        </div>
      </section>

      <MostExplored />
    </main>
  );
}
