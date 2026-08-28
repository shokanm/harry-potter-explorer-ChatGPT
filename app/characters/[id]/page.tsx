import CharacterDetailClient from "@/components/CharacterDetailClient";
export default async function CharacterPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <main className="section"><div className="container"><CharacterDetailClient id={id}/></div></main>}
