export default function EmotionBars({ emotions }) {
  if (!emotions) return <p>Detecting emotions...</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      {Object.entries(emotions).map(([emotion, value]) => (
        <div key={emotion}>
          <strong>{emotion}</strong>: {(value * 100).toFixed(1)}%
        </div>
      ))}
    </div>
  );
}