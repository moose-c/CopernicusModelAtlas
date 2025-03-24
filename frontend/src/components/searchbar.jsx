export const Searchbar = ({ searchText, setSearchText }) => {
    const handleSearch = () => {
        console.log('Searching for:', searchText);
        setSearchText('');
        // Add your search logic here
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Trigger search when Enter is pressed
        }
    };

    return (
        <div className="w-[350px] h-[45px] bg-[#EFEFEF] pl-[10px] flex justify-between items-center">
            <div className="flex-1">
                <input
                    type="text"
                    className={`dd bg-transparent outline-none w-full py-1`}
                    placeholder="Find a model"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleKeyDown} // Listen for Enter key press
                />
            </div>
            <div className="bg-black h-[45px] w-[45px] cursor-pointer flex justify-center items-center" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m2.69-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                </svg>
            </div>
        </div>
    );
};
