import React from 'react';

function VideoPlayer({ url }) {
  if (!url) return <p className="meta">No video URL</p>;

  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  if (isYouTube) {
    const id = url.split(/v=|youtu\.be\//)[1]?.split('&')[0];
    return (
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-wrapper">
      <video controls src={url} style={{ width: '100%' }}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
