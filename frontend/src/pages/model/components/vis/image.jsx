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
                className="max-w-none max-h-[400px]" // Maximum width and height
                onClick={handleOpen}
            />
            <Modal open={open} onClose={handleClose}>
                <img
                    src={`data:image/png;base64,${fileBin}`}
                    className="max-h-full max-w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 bg-copernicusGrey border-0"
                />
            </Modal>
        </>
    );
};
