import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Props = {
   children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
   return (
      <div className="flex flex-col min-h-screen">
         <Header />                                                                                   
         <main className="flex justify-center items-center flex-grow relative z-0">{children}</main>
         <Footer />
      </div>
   );
};


export default MainLayout;