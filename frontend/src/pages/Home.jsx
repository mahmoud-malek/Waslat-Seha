import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero";
import Search from "../components/Search";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';



export default function Home() {
    const { state } = useLocation();
    const searchRef = useRef(null);
    
    useEffect(() => {
        if (state?.scrollTo === 'search') {
            searchRef.current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, [state]);

    const scrollToSearch = () => {
        searchRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    return (
        <>
            <Navbar />
            <HeroSection onSearchClick={scrollToSearch} />
            <div ref={searchRef}>
            <Search />
			</div>
			<Features />
			<Footer />
        </>
    );
}
