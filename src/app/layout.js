import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Spice Direct WholeSale",
  description: "Best wholesale food provider in glosgow, UK",
  // icons:{
  //   icon:['/favicon.ico?v=4'],
  //   apple:['/apple-touch-icon.png?v=4'],
  //   shortcut:['/apple-touch-icon.png'],
  // },
  // openGraph:{
  //   title:"Ruky Perfume",
  //   description:"Best Perfume in the world",
  //   url:"rukyperfume.com",
  //   siteName:"RukyPerfume",
  //   images:[
  //     {
  //       url:'/assets/homeslider/sliderone.jpg',
  //       width: 1260,
  //       height: 800,
  //     },{
  //       url:'/assets/homeslider/sliderone.jpg',
  //       width: 1260,
  //       height: 800,
  //     }
  //   ],
  //   locale:'en-EN',
  // }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>   
        <StoreProvider>
        {children}
        </StoreProvider>       
      </body>
    </html>
  );
}
