import Link from "next/link";
export default function HouseCard({house}:{house:{name:string;animal:string;traits:string;description:string;colors:string}}){
 const symbol = {Gryffindor:"♌",Slytherin:"♏",Ravenclaw:"🜁",Hufflepuff:"✦"}[house.name] || "✦";
 return <Link href={`/characters?house=${house.name}`} className="card house" style={{background:`linear-gradient(145deg, ${house.colors.split(', ')[0]}99, #111116 62%)`}}>
   <div className="house-symbol">{symbol}</div><div className="tag">{house.animal}</div><h3>{house.name}</h3><p>{house.traits}</p><small className="muted">{house.description}</small>
 </Link>
}
