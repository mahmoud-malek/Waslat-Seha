import React, { useEffect, useState } from "react";
import Logo from '../assets/logo.png';

const navItems = [
  {
    id: 1,
    text: "Home",
    link: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"							
          d="M3 9.75V20.25C3 20.6642 3.33579 21 3.75 21H8.25C8.66421 21 9 20.6642 9 20.25V16.5C9 16.0858 9.33579 15.75 9.75 15.75H14.25C14.6642 15.75 15 16.0858 15 16.5V20.25C15 20.6642 15.3358 21 15.75 21H20.25C20.6642 21 21 20.6642 21 20.25V9.75M3 9.75L12 3L21 9.75M3 9.75H21"
        />
      </svg>
    )
  },
  {
    id: 2,
    text: "How to Use",
    link: "/how-to-use",
    icon: (
     <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
  />
</svg>
    )
  },
  {
    id: 3,
    text: "Contact Us",
    link: "/contact-us",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75V17.25A3.75 3.75 0 007.5 21H16.5A3.75 3.75 0 0020.25 17.25V6.75M3.75 6.75L12 12.75L20.25 6.75M3.75 6.75H20.25"
        />
      </svg>
    )
  },
  {
    id: 4,
    text: "About Us",
    link: "/about-us",
    icon: (
      <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth="1.5"
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.479m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
  />
</svg>
    )
  }
];


export default function Navbar () {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode || localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleNavbar = () => {
    setOpenNavbar(openNavbar => !openNavbar);
  };

  const closeNavbar = () => {
    setOpenNavbar(false);
  };

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode);
    setDarkMode(darkMode => !darkMode);
  };
  
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    
    const isLoggedIn = !!localStorage.getItem('token');
    const userType = JSON.parse(localStorage.getItem('user'))?.role;

  return (
    <>
      {/* Overlay for Mobile Menu */}
      <div onClick={() => { closeNavbar() }} aria-hidden="true" className={
        `fixed bg-gray-800/20 inset-0 z-30 ${openNavbar ? "flex lg:hidden" : "hidden"}`
      } />

      {/* Header Container */}
      <header className="h-20 flex items-center z-50">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 relative z-50">
          {/* Navigation bar */}
          <nav className="flex items-center justify-between w-full relative">
            {/* Logo and title */}
            <div className="inline-flex relative bg-inherit font-bold">
              <a href="#" className="flex items-center gap-2">
                <img src={Logo} className="w-12" alt="Waslat Seha Logo" />
                <span className="text-lg text-gray-600 dark:text-white text-nowrap">Waslat Seha</span>
              </a>
            </div>

            {/* Navigation Links container */}
            <div className={`
              absolute top-10 px-5 sm:px-8 md:px-12 lg:z-auto
              lg:px-0 lg:pt-0 lg:top-0 
              bg-white dark:bg-gray-950 lg:dark:bg-transparent  rounded-xl border border-gray-200 
              dark:border-gray-800 shadow-lg shadow-gray-100 dark:shadow-transparent  
              lg:border-none lg:shadow-none lg:rounded-none lg:bg-transparent 
              w-full lg:justify-between py-6 lg:py-0 lg:relative flex flex-col lg:flex-row transition-all duration-300 ease-linear origin-top
              ${openNavbar ? "" : "invisible opacity-20 translate-y-6 lg:visible lg:opacity-100 lg:translate-y-0"}
            `}>
              {/* Navigation Links */}
              <ul className="text-gray-700 dark:text-gray-100 w-full flex lg:items-center gap-y-4 lg:gap-x-8 flex-col lg:flex-row lg:w-full lg:justify-center">
					{navItems.map(navItem => (
						<li key={navItem.id}>
						<a href={navItem.link} className="flex items-center gap-2 transition hover:text-cyan-500 ease-linear text-lg font-bold">
							{navItem.icon}
							{navItem.text}
						</a>
						</li>
					))}
				</ul>

            {/* Auth Buttons */}
            <div className="lg:min-w-max flex flex-col lg:flex-row lg:items-center gap-4 mt-8 lg:mt-0 w-full sm:w-max">
            {isLoggedIn ? (
                <>
                <a href={userType == "DOCTOR" ? "/doctor/dashboard" : "/patient/dashboard"} className="px-7 relative text-emerald-500 h-12 flex w-full sm:w-max justify-center items-center before:bg-[#3FD3D3]/10 dark:before:bg-[#1ad6bd]/10 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
                    <span className="relative text-[#3FD3D3] font-bold">Dashboard</span>
                </a>
                <button
                onClick={handleLogout}
                className="px-7 relative text-white h-12 flex w-full sm:w-max justify-center items-center dark:before:bg-[#27a5a3] before:bg-[#551212] before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95"
                >
                <span className="relative text-white font-bold">Sign Out</span>
                </button>
                </>
            ) : (
                <>
                 <a href="/login" className="px-7 relative text-emerald-500 h-12 flex w-full sm:w-max justify-center items-center before:bg-[#3FD3D3]/5 dark:before:bg-[#1ad6bd]/10 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
                    <span className="relative text-[#3FD3D3] font-bold">Login</span>
                </a>
                <a href="/signup" className="px-7 relative text-white h-12 flex w-full sm:w-max justify-center items-center before:bg-[#3FD3D3] before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
                    <span className="relative text-white font-bold">Join</span>
                </a>
                </>
            )}
            </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex ml-2 pl-2 border-l border-gray-100 dark:border-gray-800 min-w-max items-center gap-x-3">
              {/* The button that toggles the Dark theme */}
              <button className="outline-none flex relative text-gray-700 dark:text-gray-300 p-3" onClick={toggleDarkMode}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:flex hidden">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 dark:hidden">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <span className="sr-only">switch theme</span>
              </button>

              {/* The button that toggles the navbar */}
              <button onClick={() => { toggleNavbar() }} aria-label='toggle navbar' className="outline-none lg:hidden w-7 h-auto flex flex-col relative children:flex">
                <span aria-hidden="true" className={`
                  w-6 origin-right h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                  ${openNavbar ? "-rotate-[60deg] -translate-y-[0.300rem] scale-x-100" : " scale-x-75"}
                `} />
                <span aria-hidden="true" className={`
                  w-6 origin-center mt-1 h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                  ${openNavbar ? "opacity-0 scale-x-0" : ""}
                `} />
                <span aria-hidden="true" className={`
                  w-6 origin-right mt-1 h-0.5 rounded-full bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-linear
                  ${openNavbar ? "rotate-[60deg] translate-y-[0.300rem] scale-x-100" : " scale-x-75"}
                `} />
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

