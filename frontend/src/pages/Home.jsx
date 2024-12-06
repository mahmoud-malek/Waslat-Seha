import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/Hero";
import Search from "../components/Search";

export default function Home() {
	return (
		<>
			<Navbar />
			<HeroSection />
			<Search />
		</>
	);
}