import React from "react";
import "./Controls.scss";

const Controls = ({
  isEnabled,
  autoRefresh,
  onEnableToggle,
  onAutoRefreshToggle,
  onGetCatClick,
  isLoading,
}) => {
  const autoRefreshLabelClasses = `checkbox-label ${
    !isEnabled ? "disabled-label" : ""
  }`;

  return (
    <div className="controls-container">
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={onEnableToggle}
          />
          Включить
        </label>
        <label className={autoRefreshLabelClasses}>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={onAutoRefreshToggle}
            disabled={!isEnabled}
          />
          Автообновление (5 сек)
        </label>
      </div>
      <button
        className="button"
        onClick={onGetCatClick}
        disabled={!isEnabled || isLoading}
      >
        {isLoading ? "Загрузка..." : "Получить котика!"}
      </button>
    </div>
  );
};

export default Controls;
