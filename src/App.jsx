import useCamera from "./hooks/useCamera";
import useFaceEmotion from "./hooks/useFaceEmotion";
import VideoFeed from "./components/VideoFeed";
import EmotionBars from "./components/EmotionBars";
import ChatBox from "./components/ChatBox";

function App() {
  const videoRef = useCamera();
  const emotions = useFaceEmotion(videoRef);

  // 🧠 Get dominant emotion (safe version)
  const getTopEmotion = (emotions) => {
    if (!emotions || Object.keys(emotions).length === 0) {
      return "neutral";
    }

    return Object.keys(emotions).reduce((a, b) =>
      emotions[a] > emotions[b] ? a : b
    );
  };

  const currentEmotion = getTopEmotion(emotions);

  // 🧪 Debug (remove later if not needed)
  console.log("Current Emotion:", currentEmotion);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>AI Emotion Mirror</h1>

      {/* 🔹 Main Layout */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* 🎥 Left Section */}
        <div>
          <VideoFeed videoRef={videoRef} />
          <EmotionBars emotions={emotions} />
          <h3 style={{ marginTop: "10px" }}>
            Your Emotion: {currentEmotion}
          </h3>
        </div>

        {/* 💬 Right Section */}
        <div style={{ minWidth: "300px" }}>
          <ChatBox currentEmotion={currentEmotion} />
        </div>
      </div>
    </div>
  );
}

export default App;