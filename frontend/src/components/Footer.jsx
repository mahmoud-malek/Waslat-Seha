import React from 'react';
import Logo from '../assets/logo.png';

const FooterItem = ({ text, link }) => {
    return (
        <li>
            <a href={link} className="duration-200 hover:text-blue-600 dark:hover:text-blue-500">
                {text}
            </a>
        </li>
    );
};

const FooterBlockItem = ({ title, items }) => {
    return (
        <div className="space-y-5">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {title}
            </h1>
            <ul className="space-y-3">
                {items.map(item => (
                    <FooterItem key={item.id} {...item} />
                ))}
            </ul>
        </div>
    );
};

const footerBlocks = [
    {
        id: 1,
        title: "Menu",
        items: [
            { id: 1, text: "Home", link: "#" },
            { id: 2, text: "How to Use", link: "#" },
            { id: 3, text: "Contact Us", link: "#" },
        ],
    },
    {
        id: 2,
        title: "Services",
        items: [
            { id: 1, text: "Artificial Intelligence", link: "#" },
            { id: 2, text: "Appointment Management", link: "#" },
            { id: 3, text: "User-Friendly Dashboard", link: "#" },
        ],
    },
];

const FooterBlock = () => {
    return (
        <footer className="pt-16 md:pt-20 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
                <div className="w- text-gray-700 dark:text-gray-300 flex justify-between pb-4 border-b border-b-gray-200 dark:border-b-gray-800">
                    <div className="flex">
                        <a href="#" className="flex flex-row items-center">
                            <img src={Logo} className="w-12" alt="Waslet Seha Logo" />
                            <span>Waslet Seha</span>
                        </a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span>Egypt - Giza</span>
                    </div>

                    <div className="flex items-center space-x-2 justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>
                        <span>waslat-seha@support.com</span>
                    </div>
                </div>
                <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-8 py-10 text-gray-700 dark:text-gray-300">
                    {footerBlocks.map(footerBlock => (
                        <FooterBlockItem key={footerBlock.id} {...footerBlock} />
                    ))}
                    <div className="space-y-5 col-span-2 md:col-span-3 lg:col-span-2">
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Subscribe to our Newsletter
                        </h1>
                        <p className="max-w-xl">
                            Stay updated with our latest news and exclusive offers by subscribing to our newsletter.
                        </p>
                        <form action className="grid w-full relative max-w-xl">
                            <div className="flex flex-col gap-3 w-full relative">
                                <input type="email" className="w-full outline-none px-3 py-3 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700" placeholder="johndoe@gmail.com" />
                                <button className="w-full py-3 sm:py-0 sm:w-max sm:absolute sm:right-1 sm:inset-y-1 px-4 text-sm flex sm:items-center justify-center outline-none bg-blue-600 text-white rounded-full">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </nav>
                <div className="w-full flex flex-col md:flex-row gap-4 items-center sm:justify-between py-3 border-t border-gray-200 dark:border-t-gray-800 text-gray-700 dark:text-gray-300">
                    <div className="flex text-center sm:text-left sm:min-w-max">
                        <p> © 2024 Waslet Seha. All rights reserved </p>
                    </div>
                    <div className="flex justify-center sm:justify-end w-full gap-3">
                        {/* Add your social links here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterBlock;
