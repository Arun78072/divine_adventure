import { CiFilter } from "react-icons/ci";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import CreateEditSpark from "@/components/Form/CreateEditSpark";
import { useRouter } from "next/router";
import Image from "next/image";

export default function AllSparks() {
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activeScreen, setActiveScreen] = useState("my_spark");
  const [editFormData, setEditFormData] = useState({});
  const [searchError, setSearchError] = useState("");
  const { query } = useRouter();
  const router = useRouter();



  return (
    <main className="p-3">
      <Loader loading={loading} />
    
      {activeScreen === "my_spark" ? (
        <section className="w-full mt-32 my-5">
          <div className="max-w-screen-lg mx-auto min-h-[60vh]">
            <h1 className="font-semibold ml-6 text-3xl">All Tours Card </h1>
            <Link
              className="red-500 duration-200"
              href="/destination/view/00000"
            >
              Single Tour
            </Link>
            
             <Image
         src="/assets/alltour.png"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }} 
      />
            <p className="text-red-500 ml-2">{searchError}</p>
         
          </div>
        </section>
      ) : activeScreen === "add_spark" ? (
        <CreateEditSpark
          data={editFormData}
          handleClose={(res) => {
            if (activeScreen === "add_spark") {
              setPosts([res, ...posts]);
              setActiveScreen("my_spark");
            }
          }}
        />
      ) : (
        ""
      )}
    </main>
  );
}
