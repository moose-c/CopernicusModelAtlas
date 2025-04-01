import { useNavigate } from 'react-router-dom';

// useNavigate seems to allow redirection within this site only, a problem for 0Auth?
export const Button = ({ text = 'Contribute', to = '/', call = '' }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault(); // Prevent navigation
        e.stopPropagation(); // Stop parent <Link> from triggering'
        if (call) {
            call();
        } else {
            if (to.startsWith('http://') || to.startsWith('https://')) {
                window.open(to, '_blank');
            } else {
                navigate(to);
            }
        }
    };

    return (
        <button onClick={(e) => handleClick(e)} className="flex gap-[11px] bg-copernicusYellow pl-[20px] h-[34px] items-center group">
            <span className="buttonText uppercase">{text}</span>
            <div className="w-[42px] h-[34px] flex justify-center items-center group-hover:bg-black">
                <img src="/assets/images/buttonArrowBlack.svg" alt="a" className="group-hover:opacity-0" />
                <img src="/assets/images/buttonArrowYellow.svg" alt="aaa" className="absolute opacity-0 group-hover:opacity-100 " />
            </div>
        </button>
    );
};
