export default function VideoFeed({ videoRef }) {
  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{
        width: "400px",
        borderRadius: "10px",
        backgroundColor: "black"
      }}
    />
  );
}