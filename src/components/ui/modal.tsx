import React from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
                >
                    <IoClose />
                </button>
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
