import React from 'react'
import manDoctor from '../assets/doctor-photo.png'
import girlDoctor from '../assets/girl_doctor.png'

export default function HeroSection() {
return (
    <>
        <section className="relative w-full min-h-screen">
            <div className="absolute top-0 inset-x-0 h-64 flex items-start">
                <div className="h-24 w-2/3 bg-gradient-to-br from-emerald-500 opacity-25 blur-2xl dark:from-[#570cac] dark:invisible dark:opacity-40">
                </div>
                <div className="h-20 w-3/5 bg-gradient-to-r from-[#8cd66a] opacity-40 blur-2xl dark:from-[#670ccf] dark:opacity-40">
                </div>
            </div>
            <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 relative">
                <div aria-hidden="true" className="absolute inset-y-0 w-44 left-0 hidden dark:flex">
                    <div className="h-full md:h-1/2 lg:h-full w-full bg-gradient-to-tr opacity-40 dark:blur-2xl dark:from-[#570cac] dark:opacity-20">
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto">
                    <div className="lg:py-6">
                        <div className="text-center lg:text-left">
                            <h1 className=" text-gray-800 pt-4 dark:text-white font-bold text-4xl md:text-5xl lg:text-6xl">
								<p className='p-3'>
								احجز موعدك 
								</p>
								
                                <p className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-green-300 p-3">
                                    مع أفضل دكتور
								</p>
                            </h1>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-8 text-center lg:text-left mx-auto max-w-xl">
							مش عارف تحدد انت محتاج تكشف ايه؟ محتاج توصف حالتك الاول؟
							<br />
							قدمنالك الذكاء الاصطناعي اللي هيساعدك في حجز مع انسب الدكاترة لحالتك
                        </p>
                        <div className="flex items-center gap-4 mt-8 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0">
                            <a href="#" className="px-7 relative text-white h-12 flex w-full sm:w-max justify-center items-center before:bg-[#3FD3D3] before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
                                <span className="relative text-white"> احجز الان</span>
                            </a>
                            <a href="#" className="px-7 relative text-emerald-500 h-12 flex w-full sm:w-max justify-center items-center before:bg-emerald-500/5 dark:before:bg-emerald-500/10 before:absolute before:inset-0 before:rounded-full before:transition-transform before:ease-linear hover:before:scale-105 active:before:scale-95">
                                <span className="relative text-cyan-500 flex items-center gap-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-pulse">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
								ازاي تحجز
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center text-center flex-col sm:flex-row gap-4 sm:gap-0 mt-8 w-max mx-auto lg:mx-0">
                            <div className="flex items-center -space-x-2">
                                <img src={manDoctor} width={1240} alt="avatar" className="w-10 h-15 rounded-full ring-1 ring-white dark:ring-gray-800 object-cover" />
                                <img src={girlDoctor} width={1240} alt="avatar" className="w-10 h-15 rounded-full ring-1 ring-white dark:ring-gray-800 object-cover" />
                                <img src={girlDoctor} width={1240} alt="avatar" className="w-10 h-15 rounded-full ring-1 ring-white dark:ring-gray-800 object-cover" />
                                <img src={manDoctor} width={1240} alt="avatar" className="w-10 h-15 rounded-full ring-1 ring-white dark:ring-gray-800 object-cover" />
                                <span className="w-10 h-10 rounded-full ring-1 ring-white dark:ring-gray-800 bg-gray-200 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 flex items-center justify-center">
                                    300+
                                </span>
                            </div>
                            <span className="pl-2 text-gray-600 dark:text-gray-200"> أطباء </span>
                        </div>
                    </div>
                    <div className="lg:h-full hidden md:flex">
                        <div className="flex w-full h-96 min-h-[24rem] lg:min-h-[none] lg:w-full lg:h-full items-center relative">
                            <div className="absolute z-0 top-1/2 -translate-y-1/2 w-5/6 right-0 h-[calc(80%+20px)] bg-gradient-to-tr opacity-25 from-emerald-500 to-pink-300 dark:from-[#570cac] dark:to-emerald-500 blur-2xl">
                            </div>
                            <div className="absolute w-3/5 h-full z-10 p-1 -translate-y-1/2 top-1/2 right-3 rounded-3xl bg-whitee dark:bg-gray-950  shadow-lg shadow-gray-100 dark:shadow-transparent  border border-gray-200 dark:border-gray-800">
                                <img src={girlDoctor} alt="In studio" width={500} height="auto" loading="lazy" className="w-full h-full rounded-2xl object-cover" />
                            </div>
                            <div className="absolute -translate-y-1/2 top-1/2 h-[calc(80%-2rem)] w-[calc(40%-20px)] p-1 rounded-3xl bg-white dark:bg-gray-950  shadow-lg shadow-gray-100 dark:shadow-transparent  border border-gray-200 dark:border-gray-800">
                                <img src={manDoctor} alt="Happy in studio" width={200} height="auto" loading="lazy" className="w-full h-full rounded-2xl object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}