import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link href="/" className="underline">
            <Image
              src="/images/home-svgrepo-com.svg"
              alt="Home"
              width={32}
              height={32}
            />
          </Link>
        </div>
        <div className="navbar-center">
          <Image
            alt="O4S courses"
            height={32}
            src="/images/logoO4S-70alt.png"
            width={100}
          />
        </div>
        <div className="navbar-end">
          {session ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src="/images/user-profile-svgrepo-com.svg"
                    alt="Your Account"
                    width={24}
                    height={24}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                {session?.user.role === "admin" && (
                  <li className="justify-between">
                    <Link href="/admin">Admin</Link>
                  </li>
                )}
                <li>
                  <a onClick={() => signOut()}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <a onClick={() => signIn()} className="btn btn-sm">
              Sign in
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
