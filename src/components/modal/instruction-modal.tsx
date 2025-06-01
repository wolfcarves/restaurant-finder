'use client';

import React, { useEffect, useState } from 'react';
import Modal from '../ui/modal';

const InstructionModal = () => {
    const [hideModal, setHideModal] = useState<boolean>(false);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const hideModalValue = localStorage.getItem('hide-modal');
        if (hideModalValue === 'true') setHideModal(true);
        setIsHydrated(true);
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);

        if (isChecked) {
            localStorage.setItem('hide-modal', 'true');
        } else {
            localStorage.removeItem('hide-modal');
        }
    };

    if (!isHydrated || hideModal) return <></>;

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Getting Started">
                <div>Start by asking something like: </div>

                <div className="mt-4">
                    <i>
                        {
                            '"Find me a cheap sushi restaurant in downtown Los Angeles that\'s open now and has at least a 4-star rating"'
                        }
                    </i>
                </div>

                <p className="text-sm text-gray-600 mt-5">
                    Please note: Results are based on data from the Foursquare database. If nothing matches your full
                    request (e.g., rating, price, or open hours), results may be limited or unavailable.
                </p>

                <p className="text-sm text-gray-600 mt-5">
                    Another note: The request may take around 3–5 seconds, as I&apos;m using a free or low-cost model
                    from OpenRouter.
                </p>

                <div className="flex gap-x-2 items-center mt-4">
                    <input id="modal-check" type="checkbox" onChange={(e) => setIsChecked(e.target.checked)} />
                    <label htmlFor="modal-check" className="text-sm">
                        Don&apos;t show again
                    </label>
                </div>
            </Modal>
        </>
    );
};

export default InstructionModal;
