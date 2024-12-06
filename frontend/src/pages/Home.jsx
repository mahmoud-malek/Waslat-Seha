import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero";
import Search from "../components/Search";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
    const searchRef = useRef(null); // Create a ref for Search

    const scrollToSearch = () => {
        // Scroll to the Search component
        searchRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Navbar />
            <HeroSection onSearchClick={scrollToSearch} />
            <div ref={searchRef}>
            <Search />
			</div>
			<Features />
        </>
    );
}
