import { Modal } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

export const ClickableFigure = ({ fileBin, loc, caption }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const imgRef = useRef(null);
    const [imgWidth, setImageWidth] = useState(null);

    useEffect(() => {
        if (imgRef.current) {
            setImageWidth(imgRef.current.offsetWidth);
        }
    });

    return (
        <>
            {loc === 'box' && (
                <>
                    <img ref={imgRef} src={`data:image/png;base64,${fileBin}`} className="cursor-pointer" onClick={handleOpen} />
                    <p className="caption text-center" style={{ width: imgWidth ? `${imgWidth}px` : 'auto' }}>
                        {caption}
                    </p>
                </>
            )}
            {loc === 'large' && (
                <>
                    <img ref={imgRef} src={`data:image/png;base64,${fileBin}`} className="cursor-pointer max-w-[70vw] max-h-[80vh]" onClick={handleOpen} />
                    <p className="caption text-center" style={{ width: imgWidth ? `${imgWidth}px` : 'auto' }}>
                        {caption}
                    </p>
                </>
            )}
            {loc !== 'box' && loc !== 'large' && (
                <div className="pl-4">
                    <img
                        ref={imgRef}
                        src={`data:image/png;base64,${fileBin}`}
                        className="cursor-pointer max-w-[45vw] md:max-w-[35vw] max-h-[50vh]" // Maximum width and height
                        onClick={handleOpen}
                    />
                    <p className="caption text-center" style={{ width: imgWidth ? `${imgWidth}px` : 'auto' }}>
                        {caption}
                    </p>
                </div>
            )}

            <Modal open={open} onClose={handleClose} className="w-full h-full flex justify-center items-center">
                <img src={`data:image/png;base64,${fileBin}`} className="md:h-[80%] h-[40%] max-w-[80%] object-contain bg-copernicusGrey" />
            </Modal>
        </>
    );
};
