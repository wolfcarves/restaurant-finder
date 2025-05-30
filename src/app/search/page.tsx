'use client';

import Input from '@/components/ui/input';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <div className="h-32" aria-label="Reserve position" />

            <div
                className={`${
                    isOpen ? 'h-screen' : 'h-32'
                } absolute top-0 start-0 end-0 w-full bg-white border-b border-b-zinc-100 px-4 duration-500`}
                onClick={() => setIsOpen(false)}
            >
                <div className="w-full max-w-7xl mx-auto py-4">
                    <div className="w-full max-w-[40rem]">
                        <Input onFocus={() => setIsOpen(true)} />

                        {isOpen && (
                            <div
                                className="flex flex-col justify-center w-full py-5"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('clicked!');
                                }}
                            >
                                <div className="flex items-center justify-between w-full border-b border-b-zinc-200">
                                    <p className="text-sm text-zinc-500 py-3">Tatong, VIC, Australia</p>
                                    <CiSearch size={20} className="text-zinc-500" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Search() {
    return (
        <div className="px-4 md:px-6">
            <Header />

            <div className="w-full max-w-7xl mx-auto py-4">
                <div className="w-full max-w-[40rem]">
                    {/* Item */}
                    {Array.from({ length: 20 }).map((_, idx) => {
                        return (
                            <div className="py-2" key={idx}>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 py-2">
                                    <div className="rounded-full bg-zinc-100 text-xs w-max py-1 px-1.5">
                                        Rodel Crisosto
                                    </div>
                                    <div className="text-zinc-500 text-xs">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, perspiciatis!
                                    </div>
                                </div>

                                <h4 className="font-medium">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias facere ut
                                    mollitia exercitationem facilis earum. Enim impedit ducimus iusto voluptates!
                                </h4>

                                <p className="text-sm text-zinc-500 py-2">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias facere ut
                                    mollitia exercitationem facilis earum. Enim impedit ducimus iusto voluptates!
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
