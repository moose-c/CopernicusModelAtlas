import { Modal } from '@mui/material';
import { useState } from 'react';

export const ClickableFigure = ({ fileBin, isExplanData }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {isExplanData && <img src={`data:image/png;base64,${fileBin}`} className=" cursor-pointer" onClick={handleOpen} />}
            {!isExplanData && (
                <img
                    src={`data:image/png;base64,${fileBin}`}
                    className=" cursor-pointer max-w-[45vw] md:max-w-[35vw] max-h-[50vh]" // Maximum width and height
                    onClick={handleOpen}
                />
            )}

            <Modal open={open} onClose={handleClose} className="w-full h-full flex justify-center items-center">
                <img src={`data:image/png;base64,${fileBin}`} className="md:h-[80%] h-[40%] max-w-[80%] object-contain bg-copernicusGrey" />
            </Modal>
        </>
    );
};
