import { CiSearch } from 'react-icons/ci';
import { RxSketchLogo } from 'react-icons/rx';

export default async function Home() {
    return (
        <div className="relative w-full max-w-[40rem] mx-auto h-screen px-4">
            <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <div className="mx-auto w-max">
                    <RxSketchLogo size={30} className="text-zinc-800" />
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
                <div className="relative shadow-md rounded-full text-sm font-medium py-4 px-5 bg-white">
                    <input placeholder="Search" className="placeholder:text-zinc-400/80 focus:outline-0 w-full" />
                    <button className="absolute top-0 bottom-0 my-auto h-8 end-7 rounded-full cursor-pointer px-1.5 hover:bg-zinc-500/10">
                        <CiSearch size={20} className="text-blue-500" />
                    </button>
                </div>
                <p className="text-sm text-center text-zinc-500 py-4">Discover new places around the world.</p>
            </div>

            <div className="absolute top-[calc(50%+6rem)] left-1/2 transform -translate-x-1/2 w-full px-4">
                <div className="flex flex-col justify-center w-full">
                    {/* <span className="text-sm text-center text-neutral-900 py-4">Related Search</span> */}

                    <div className="flex items-center justify-between w-full border-b border-b-zinc-200">
                        <p className="text-sm text-zinc-500 py-3">Tatong, VIC, Australia</p>
                        <CiSearch size={20} className="text-zinc-500" />
                    </div>
                </div>
            </div>
        </div>
    );
}
