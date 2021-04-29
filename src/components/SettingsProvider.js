import React, { createContext, useState } from "react";

export const SettingsContext = createContext(null);

export const SettingsProvider = (props) => {
  const [sensorSettings, setSensorSettings] = useState([]);

  const addSensorToSettings = (sensor) => {
    setSensorSettings((oldSettings) => [...oldSettings, sensor]);
  };

  const removeSensorFromSettings = (id) => {
    setNewSettings(
      sensorSettings.filter((sensorSetting) => sensorSetting.id !== id)
    );
  };

  const updateSensorEnabled = (dbSensor) => {
    let updatedSettings = [...sensorSettings];
    updatedSettings.forEach((sensor) => {
      if (sensor.id === dbSensor.id) {
        sensor.enabled = dbSensor.enabled;
      }
    });
    setNewSettings(updatedSettings);
  };

  const setNewSettings = (newSettings) => {
    setSensorSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        sensorSettings,
        addSensorToSettings,
        removeSensorFromSettings,
        updateSensorEnabled,
        setNewSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
