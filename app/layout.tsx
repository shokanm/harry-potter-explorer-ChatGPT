import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export const metadata = { title: "Harry Potter Explorer", description: "Explore characters, houses, spells and AI-powered wizard conversations." };
export default function RootLayout({children}:{children:React.ReactNode}){ return <html lang="en"><body><Nav/>{children}<Footer/></body></html> }
