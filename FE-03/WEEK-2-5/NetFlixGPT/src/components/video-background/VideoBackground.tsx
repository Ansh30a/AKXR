const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
// const backdrop_path = "/cz4vLJrmaV1zJlRYbxqtvLzeLWB.jpg";
interface VideoBackgroundProps {
    backdropPath?: string;
}

const VideoBackground = ({ backdropPath }: VideoBackgroundProps) => {
    if (!backdropPath) return null;

    return (
        <div className="absolute inset-0">
            <img
                src={`${IMAGE_BASE_URL}${backdropPath}`}
                alt="background"
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </div>
    );
};

export default VideoBackground;
