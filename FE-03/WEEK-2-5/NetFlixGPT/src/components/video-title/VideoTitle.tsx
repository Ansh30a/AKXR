interface VideoTitleProps {
    title: string;
    overview: string;
}

const VideoTitle = ({ title, overview }: VideoTitleProps) => {
    return (
        <div className="absolute bottom-40 left-16 max-w-xl">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>

            <p className="text-lg mb-6 line-clamp-3">{overview}</p>

            <div className="flex gap-4">
                <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-300">
                    ▶ Play
                </button>

                <button className="bg-gray-600/70 px-6 py-2 rounded font-semibold hover:bg-gray-600">
                    More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
