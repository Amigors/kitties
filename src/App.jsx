import React, { useState, useEffect, useCallback, useRef } from "react";
import Controls from "./components/Controls/Controls";
import CatImage from "./components/CatImage/CatImage";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import "./App.css";

const API_URL = "https://api.thecatapi.com/v1/images/search";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);

  const fetchCatImage = useCallback(async () => {
    if (!isEnabled) return;

    setIsLoading(true);
    setError(null);
    console.log("Fetching new cat image...");

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.length > 0 && data[0].url) {
        setImageUrl(data[0].url);
      } else {
        throw new Error("No image URL found in API response");
      }
    } catch (e) {
      console.error("Failed to fetch cat image:", e);
      setError("Не удалось загрузить изображение. Попробуйте еще раз.");
      setImageUrl("");
    } finally {
      setIsLoading(false);
    }
  }, [isEnabled]);

  useEffect(() => {
    if (isEnabled) {
      fetchCatImage();
    } else {
      setImageUrl("");
    }
  }, [fetchCatImage, isEnabled]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("Cleared interval");
    }

    if (autoRefresh && isEnabled) {
      console.log("Setting up interval...");
      intervalRef.current = setInterval(() => {
        console.log("Interval fetch triggered");
        fetchCatImage();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log("Cleaned up interval on effect change/unmount");
      }
    };
  }, [autoRefresh, isEnabled, fetchCatImage]);

  const handleGetCatClick = () => {
    if (!isLoading) {
      fetchCatImage();
    }
  };

  const handleEnableToggle = (event) => {
    const checked = event.target.checked;
    setIsEnabled(checked);
    if (!checked) {
      setIsLoading(false);
      setError(null);
    } else {
      if (!imageUrl && !isLoading) {
        fetchCatImage();
      }
    }
  };

  const handleAutoRefreshToggle = (event) => {
    setAutoRefresh(event.target.checked);
  };

  return (
    <div className="app-container">
      <h1>Котики!</h1>
      <Controls
        isEnabled={isEnabled}
        autoRefresh={autoRefresh}
        onEnableToggle={handleEnableToggle}
        onAutoRefreshToggle={handleAutoRefreshToggle}
        onGetCatClick={handleGetCatClick}
        isLoading={isLoading}
      />
      <div className="image-area">
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <p className="error-message">{error}</p>}
        {!isLoading && !error && imageUrl && (
          <CatImage src={imageUrl} alt="A cute cat" />
        )}
        {!isLoading && !error && !imageUrl && isEnabled && (
          <p>Нажмите "Get Cat", чтобы увидеть котика!</p>
        )}
        {!isLoading && !isEnabled && <p>Получение котиков отключено.</p>}
      </div>
    </div>
  );
}

export default App;
