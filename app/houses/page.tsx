import HouseCard from "@/components/HouseCard";
import { houses } from "@/lib/houses";
export default function Houses(){ return <main className="section"><div className="container"><div className="eyebrow">Hogwarts legacy</div><h2>The four houses</h2><p className="lead" style={{marginLeft:0}}>Every house values a different kind of excellence. Pick one to explore its characters.</p><div className="grid" style={{marginTop:28}}>{houses.map(h=><HouseCard house={h} key={h.name}/>)}</div></div></main> }
