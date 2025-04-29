import { useState, useEffect, useRef } from "react";
import "./App.css";
import Controls from "./components/Controls/Controls";
import GetCatButton from "./components/GetCatButton/GetCatButton";
import CatImageDisplay from "./components/CatImageDisplay/CatImageDisplay";

const API_URL = "https://api.thecatapi.com/v1/images/search";

function App() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(false);
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const intervalRef = useRef(null);

  const fetchCatImage = async () => {
    if (!isEnabled) return;

    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setCatImageUrl(data[0].url);
      } else {
        setCatImageUrl(null);
      }
    } catch (error) {
      console.error("Failed to fetch cat image:", error);
      setCatImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAutoRefreshTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isEnabled && isAutoRefreshEnabled) {
      intervalRef.current = setInterval(() => {
        fetchCatImage();
      }, 5000);
    } else {
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isEnabled) {
      fetchCatImage();
    } else {
      setCatImageUrl(null);
    }

    resetAutoRefreshTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isEnabled, isAutoRefreshEnabled]);

  const handleGetCatClick = () => {
    fetchCatImage();
    resetAutoRefreshTimer();
  };

  const handleToggleEnabled = () => {
    setIsEnabled(!isEnabled);
    if (isEnabled) {
      setIsAutoRefreshEnabled(false);
    }
  };

  const handleToggleAutoRefresh = () => {
    setIsAutoRefreshEnabled(!isAutoRefreshEnabled);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1>Random Cat Image</h1>
        <div className="controls-button-wrapper">
          <Controls
            isEnabled={isEnabled}
            isAutoRefreshEnabled={isAutoRefreshEnabled}
            onToggleEnabled={handleToggleEnabled}
            onToggleAutoRefresh={handleToggleAutoRefresh}
          />
          <GetCatButton
            onClick={handleGetCatClick}
            disabled={!isEnabled || isLoading}
            isLoading={isLoading}
          />
        </div>
        {isEnabled ? (
          <CatImageDisplay imageUrl={catImageUrl} isLoading={isLoading} />
        ) : (
          <p>Image fetching is disabled.</p>
        )}
      </div>
    </div>
  );
}

export default App;
