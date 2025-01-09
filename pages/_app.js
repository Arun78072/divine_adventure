import Layout from "@/components/Layouts";
import "@/styles/resetTailwind.css"
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { baseUrl } from "@/utils"; 

// Import react-toastify CSS
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={true}
          pauseOnHover={false}
          closeOnClick
          newestOnTop={false}
          draggable
          draggablePercent={60}
          rtl={false}
          limit={3}
        />
      </Layout>
    </SessionProvider>
  );
}
