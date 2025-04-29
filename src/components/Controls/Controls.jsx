import React from "react";
import "./Controls.scss";

function Controls({
  isEnabled,
  isAutoRefreshEnabled,
  onToggleEnabled,
  onToggleAutoRefresh,
}) {
  return (
    <div className="controls-container">
      <label className="checkbox-label">
        <input type="checkbox" checked={isEnabled} onChange={onToggleEnabled} />
        Enabled
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isAutoRefreshEnabled}
          onChange={onToggleAutoRefresh}
          disabled={!isEnabled}
        />
        Auto-refresh every 5 seconds
      </label>
    </div>
  );
}

export default Controls;
