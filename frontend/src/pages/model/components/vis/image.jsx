export const Figure = ({ fileBin }) => {
    // Convert Blob to JSON
    const url = URL.createObjectURL(fileBin);
    return (
        <>
            <img
                src={url}
                alt="Model Icon"
                className="max-w-none max-h-[400px]" // Maximum width and height
            />
        </>
    );
};
