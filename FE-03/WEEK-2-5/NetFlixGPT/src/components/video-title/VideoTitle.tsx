interface VideoTitleProps {
    title: string;
    overview: string;
}

const VideoTitle = ({ title, overview }: VideoTitleProps) => {
    return (
        <div className="absolute bottom-20 left-16 max-w-xl z-10">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>

            <p className="text-lg mb-6 line-clamp-3">{overview}</p>

            <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300 flex justify-center items-center gap-3 transition duration-300 hover:scale-110 cursor-pointer">
                    <img src="/play.svg" alt="" className="w-10" /> Play
                </button>

                <button className="bg-gray-600/70 px-6 py-2 rounded font-semibold transition duration-300 hover:bg-gray-600 hover:scale-110 cursor-pointer">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
