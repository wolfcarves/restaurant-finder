'use client';

import React, { useImperativeHandle } from 'react';
import { ComponentPropsWithRef, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineLoading } from 'react-icons/ai';

export interface InputProps extends ComponentPropsWithRef<'input'> {
    isLoading?: boolean;
    onFocus?: () => void;
    onSearchBtnClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ isLoading, onKeyDown: _onKeydown, onSearchBtnClick, ...props }, ref) => {
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
                className="relative shadow-md rounded-full text-sm font-medium py-4 px-5 bg-white w-full hover:cursor-text pe-16"
            >
                <input
                    ref={inputRef}
                    placeholder="Search"
                    className="w-full placeholder:text-zinc-400/80 text-zinc-500 focus:outline-0"
                    autoComplete="off"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') inputRef.current?.blur();
                        _onKeydown?.(e);
                    }}
                    {...props}
                />

                {/* There is a better version of this but I'm gonna be late 😅  */}
                {isLoading ? (
                    <>
                        <div className="absolute top-0 bottom-0 flex items-center justify-center my-auto h-8 end-7 rounded-full cursor-pointer px-1.5 hover:bg-zinc-500/10">
                            <AiOutlineLoading size={20} className="text-blue-500 animate-spin" />
                        </div>
                    </>
                ) : (
                    <>
                        <button
                            className="absolute top-0 bottom-0 my-auto h-8 end-7 rounded-full cursor-pointer px-1.5 hover:bg-zinc-500/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                onSearchBtnClick?.();
                            }}
                        >
                            <CiSearch size={20} className="text-blue-500" />
                        </button>
                    </>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
