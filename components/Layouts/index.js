import Footer from "./Footer";
import { Poppins } from "next/font/google";
import Header from "./Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Specify the weights you need
  display: "swap",
});

export default function Layout({ children }) {
  return (
    <div className={poppins.className}>
      <Header />
      <div className=""> {children}</div>
      <Footer />
    </div>
  );
}
