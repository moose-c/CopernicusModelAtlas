import { Modal, Box } from '@mui/material';
import { useState } from 'react';

export const ClickableFigure = ({ fileBin }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <img
                src={`data:image/png;base64,${fileBin}`}
                className="max-w-[25%] max-h-[30%] cursor-pointer" // Maximum width and height
                onClick={handleOpen}
            />
            <Modal open={open} onClose={handleClose} className="w-full h-full flex justify-center items-center">
                <img src={`data:image/png;base64,${fileBin}`} className="h-[80%] max-w-[80%] object-contain bg-copernicusGrey" />
            </Modal>
        </>
    );
};
