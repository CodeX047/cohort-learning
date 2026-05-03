const VideoCard = ({ video }) => {
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M views";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K views";
    }
    return count + " views";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={video.items.snippet.thumbnails.maxres.url}
        alt={video.items.snippet.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">
          {video.items.snippet.title}
        </h2>
        <a
          href={`https://www.youtube.com/channel/${video.items.snippet.channelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 text-sm mb-1 hover:text-white transition-colors"
        >
          {video.items.snippet.channelTitle}
        </a>
        <div className="flex items-center text-gray-500 text-sm">
          <span>
            {formatViewCount(parseInt(video.items.statistics.viewCount))}
          </span>
          <span className="mx-2">•</span>
          <span>{formatDate(video.items.snippet.publishedAt)}</span>
        </div>
        <p className="text-gray-400 text-sm mt-2 line-clamp-3">
          {video.items.snippet.description}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
