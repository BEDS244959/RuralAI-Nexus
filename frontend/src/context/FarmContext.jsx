import { createContext, useContext, useEffect, useState } from "react";

import {
  getFarmProfile,
  saveFarmProfile,
} from "../utils/farmStorage";

const FarmContext = createContext(null);

export function FarmProvider({ children }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const savedProfile = getFarmProfile();

    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const updateProfile = (updates) => {
    setProfile((current) => {
      const updatedProfile = {
        ...(current || {}),
        ...updates,
      };

      saveFarmProfile(updatedProfile);

      return updatedProfile;
    });
  };

  const clearProfile = () => {
    setProfile(null);
  };

  return (
    <FarmContext.Provider
      value={{
        profile,
        updateProfile,
        clearProfile,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);

  if (!context) {
    throw new Error(
      "useFarm must be used inside FarmProvider"
    );
  }

  return context;
}