interface VideoTitleProps {
    title: string;
    overview: string;
}

const VideoTitle = ({ title, overview }: VideoTitleProps) => {
    return (
        <div className="absolute bottom-10 md:bottom-20 left-4 md:left-16 max-w-xl z-10 pr-4 md:pr-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{title}</h1>

            <p className="hidden md:block text-lg mb-6 line-clamp-3">{overview}</p>

            <div className="flex gap-2 md:gap-4 mt-2 md:mt-0">
                <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded font-semibold hover:bg-gray-300 flex justify-center items-center gap-1 md:gap-3 transition duration-300 hover:scale-110 cursor-pointer text-sm md:text-base">
                    <img src="/play.svg" alt="" className="w-6 md:w-10" /> Play
                </button>

                <button className="bg-gray-600/70 px-3 py-1 md:px-6 md:py-2 rounded font-semibold transition duration-300 hover:bg-gray-600 hover:scale-110 cursor-pointer text-sm md:text-base">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
