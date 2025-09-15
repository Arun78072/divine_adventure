import Footer from "./Footer";
import { Poppins } from "next/font/google";
import Header from "./Header";
import { LayoutStyle } from "@/styles/layout.style";
import { useEffect } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify the weights you need
  display: "swap",
});

export default function Layout({ children }) {
  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
    };
  
    window.addEventListener("beforeunload", handleUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  return (
    <LayoutStyle className={poppins.className}>
      <Header />
      <div className=""> {children}</div>
      <Footer />
    </LayoutStyle>
  );
}
