'use client';

import React from 'react';
import { RxSketchLogo } from 'react-icons/rx';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href="/" className="hover:opacity-80">
            <RxSketchLogo size={30} className="text-zinc-800" />
        </Link>
    );
};

export default Logo;
