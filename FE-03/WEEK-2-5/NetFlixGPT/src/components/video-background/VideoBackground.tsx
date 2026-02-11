const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface VideoBackgroundProps {
    trailerKey: string | null;
    backdropPath?: string;
}

const VideoBackground = ({
    trailerKey,
    backdropPath,
}: VideoBackgroundProps) => {
    // if (!backdropPath) return null;

    return (
        <div className="absolute inset-0">
            {trailerKey ? (
                <iframe
                    className="w-full h-full object-cover"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
                    title="Movie Trailer"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            ) : (
                backdropPath && (
                    <img
                        src={`${IMAGE_BASE_URL}${backdropPath}`}
                        alt="background"
                        className="w-full h-full object-cover"
                    />
                )
            )}

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </div>
    );
};

export default VideoBackground;
