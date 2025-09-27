import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 container mx-auto flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3 px-2 mb-2">
            <nav className="w-full mx-auto sm:pe-0 py-3 sm:flex sm:items-center sm:justify-between backdrop-blur-md bg-white/5 border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-3xl">
                <div className="flex items-center justify-between">
                    <Link className="flex items-center gap-2 text-xl font-semibold focus:outline-hidden focus:opacity-80 pl-4" href="/" aria-label="Brand">
                        <Image
                            src="/PhiroTechnoNoText.png"
                            alt="Phiro logo"
                            width={35}
                            height={40}
                            priority
                        />
                        <p className="text-3xl text-white">PHIRO</p>
                    </Link>
                    <div className="sm:hidden pe-4">
                        <button type="button" className="hs-collapse-toggle relative size-9 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" id="hs-navbar-example-collapse" aria-expanded="false" aria-controls="hs-navbar-example" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-example">
                            <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </div>
                <div id="hs-navbar-example" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block px-4" aria-labelledby="hs-navbar-example-collapse">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5 pb-6 sm:pb-0">
                        <a className="font-medium text-[#f5c843] focus:outline-hidden" href="#" aria-current="page">Home</a>
                        <a className="font-medium text-gray-400 hover:text-gray-500 focus:outline-hidden focus:text-gray-500" href="#">About</a>
                        <Link href="projects" className="font-medium text-gray-400 hover:text-gray-500 focus:outline-hidden focus:text-gray-500">Projects</Link>
                        <a className="font-medium text-gray-400 hover:text-gray-500 focus:outline-hidden focus:text-gray-500" href="#">
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-2xl border border-transparent bg-white text-black hover:bg-gray-200 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                                Contact us
                            </button>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}