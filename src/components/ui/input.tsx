'use client';

import React, { useImperativeHandle } from 'react';
import { ComponentPropsWithRef, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';

interface InputProps extends ComponentPropsWithRef<'input'> {
    onFocus?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleFocusToInput = () => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                handleFocusToInput();
            }}
            className="relative shadow-md rounded-full text-sm font-medium py-4 px-5 bg-white w-full hover:cursor-text"
        >
            <input
                ref={inputRef}
                placeholder="Search"
                className="placeholder:text-zinc-400/80 text-zinc-500 focus:outline-0"
                {...props}
            />
            <button className="absolute top-0 bottom-0 my-auto h-8 end-7 rounded-full cursor-pointer px-1.5 hover:bg-zinc-500/10">
                <CiSearch size={20} className="text-blue-500" />
            </button>
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
