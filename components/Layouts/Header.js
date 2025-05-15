import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import Loader from "../Loader";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Header() {
  const [menuBox, setMenuBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileBox, setProfileBox] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <>
      <Loader loading={loading} />
      <header className="fixed top-0 w-full h-[76px] border-b bg-white z-50">
      <div className="bg-blue-500 text-center">{`Up to 15% off September Deals >> | Or save up to 15% on Last Minute Deals >>`}</div>
        {/* Mobile menu */}
        <div
          id="navMenu"
          style={{ display: menuBox === true ? "block" : "block" }}
          className={`fixed h-full bg-white border ring-gray-800 shadow-xl w-full text-xl sm:w-1/2 sm:text-2xl z-40 transform transition-transform duration-300 ${
            menuBox ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col w-full">
            {/* Logo */}
            <div className="flex items-center justify-between font-medium p-8 border-b">
              <Link className="flex items-center gap-2" href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 36 37"
                  fill="none"
                >
                  <circle
                    cx="18"
                    cy="18.5"
                    r="18"
                    fill="url(#paint0_linear_2_18)"
                  />
                </svg>
                <div>Spark</div>
              </Link>
              <div id="closeBtn" className="" onClick={() => setMenuBox(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer	"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            {/* Links */}
            <div className="flex flex-col gap-1">
              <Link
                className="p-8 border-b"
                href="/chat"
                onClick={() => setMenuBox(false)}
              >
                Chat
              </Link>
              <Link
                className="p-8 border-b"
                href="/destination"
                onClick={() => setMenuBox(false)}
              >
               Destination
              </Link>
              <Link
                className="p-8 border-b"
                href="/about"
                onClick={() => setMenuBox(false)}
              >
                About
              </Link>
            </div>
            {/* {!session && (
              <div className="p-8">
                <button
                  onClick={() => {
                    setMenuBox(false);
                    router.push("/login");
                  }}
                  className="text-lg font-medium border rounded-3xl text-white bg-black py-2.5 px-3.5"
                >
                  Sign In
                </button>
              </div>
            )} */}
          </div>
        </div>
        {/* Navigation */}
        <nav className="max-w-screen-lg h-full p-2.5 flex justify-between items-center mx-auto">
          {/* Logo */}
          <Link className="flex items-center gap-2" href="/">
          <Image
              src="/assets/logo.png"
              alt={'Logo'}
              width={100}
              height={100}
              className="rounded-full w-[100px] h-[100px]"
            />
            {/* <div className="text-sm"> Divine Adventure Holidays</div> */}
          </Link>
          {/* Links */}
          <div className="flex-1 flex justify-center items-center gap-2.5 hidden text-base lg:flex">
            <Link
              className="hover:text-gray-600 duration-200"
              href="/destination"
            >
              Destination
            </Link>
            <Link className="hover:text-gray-600 duration-200" href="/">
              About
            </Link>
            <Link
              className="hover:text-gray-600 duration-200"
              href="/destination"
            >
              Ways To Go
            </Link>
            <Link className="hover:text-gray-600 duration-200" href="/">
              Deals
            </Link>
            <Link className="hover:text-gray-600 duration-200" href="/">
              Gallery
            </Link>
          </div>

          {session ? (
            <div className="relative ml-auto mr-3">
              <button
                onClick={() => {
                  setProfileBox(true);
                }}
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={50}
                    height={50}
                    className="w-[50px] rounded-full"
                  />
                ) : (
                  <span className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-gray-200">
                    {session.user.name.charAt(0)}
                  </span>
                )}
              </button>
              {profileBox ? (
                <>
                  <div className="absolute shadow-custom p-4 w-[200px] right-0 rounded-lg bg-white z-50">
                    <button
                      className="text-2xl block ml-auto"
                      onClick={() => {
                        setProfileBox(false);
                      }}
                    >
                      <IoClose />
                    </button>
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={100}
                        height={100}
                        className="w-[100px] rounded-full m-auto"
                      />
                    ) : (
                      <span className="w-[100px] h-[100px] text-3xl m-auto rounded-full flex items-center justify-center bg-gray-200">
                        {session?.user?.name.charAt(0)}
                      </span>
                    )}

                    <p className="text-center mt-1"> {session.user.name} </p>
                    <Link
                      className="hover:text-gray-600 duration-200 text-center block  my-3"
                      href="/profile"
                      onClick={() => setProfileBox(false)}
                    >
                      Profile Page
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-base w-full text-center font-medium border rounded-3xl text-white bg-black py-2.5 px-3.5  hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                  <div
                    onClick={() => setProfileBox(false)}
                    className="fixed inset-0 w-full h-full backdrop-blur-[2px] cursor-pointer bg-[#00000026]"
                  ></div>
                </>
              ) : (
                ""
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => {
                  // setLoading(true);
                  // signIn("google");
                  router.push("/login");
                }}
                className="text-base font-medium border rounded-3xl text-white bg-black py-2.5 px-3.5 hidden lg:flex hover:bg-gray-800"
              >
                Sign In
              </button>
            </>
          )}
          {/* Mobile nav button */}
          <div
            id="navBtn"
            className="lg:hidden cursor-pointer"
            onClick={() => {
              setMenuBox(!menuBox);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </div>
        </nav>
      </header>
    </>
  );
}
