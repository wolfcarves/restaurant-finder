'use client';

import React, { ComponentProps } from 'react';
import { RxSketchLogo } from 'react-icons/rx';
import Link from 'next/link';

type LogoProps = ComponentProps<'div'>;

const Logo = (props: LogoProps) => {
    return (
        <div {...props}>
            <Link href="/" className="hover:opacity-80">
                <RxSketchLogo size={30} className="text-zinc-800" />
            </Link>
        </div>
    );
};

export default Logo;
