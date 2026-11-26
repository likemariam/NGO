import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { formatDate } from '../../utils/formatDate';
import VideoPlayer from '../../components/lms/VideoPlayer.jsx';
import Card from '../../components/common/Card.jsx';
import Loader from '../../components/common/Loader.jsx';
import ErrorMessage from '../../components/common/ErrorMessage.jsx';

function VideoMaterials() {
  const { data: videos, loading, error } = useFetch('/videos');

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <h1>Video Materials</h1>
      {!videos?.length ? (
        <p className="empty-text">No videos available yet.</p>
      ) : (
        <div className="materials-grid">
          {videos.map((v) => (
            <Card key={v.id} title={v.title}>
              <VideoPlayer url={v.url} />
              <p>{v.description}</p>
              <p className="meta">{formatDate(v.createdAt)}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoMaterials;
