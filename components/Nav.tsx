import Link from "next/link";
import { Sparkles } from "lucide-react";
export default function Nav(){
  return <nav className="nav"><div className="container nav-inner">
    <Link className="brand" href="/"><span className="brand-mark"><Sparkles size={18}/></span>Harry Potter Explorer</Link>
    <div className="nav-links"><Link href="/houses">Houses</Link><Link href="/characters">Characters</Link><Link href="/spells">Spells</Link><Link href="/favorites">Favorites</Link><Link href="/chat">AI Chat</Link></div>
  </div></nav>
}
