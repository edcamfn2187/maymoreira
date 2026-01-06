import React, { createContext, useContext, useState } from "react";
import { ExerciseVideo } from "../types";

type VideoContextType = {
  videos: ExerciseVideo[];
  addVideo: (video: ExerciseVideo) => void;
};

const VideoContext = createContext<VideoContextType | null>(null);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<ExerciseVideo[]>([]);

  const addVideo = (video: ExerciseVideo) => {
    setVideos((prev) => [...prev, video]);
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) throw new Error("useVideos must be used inside VideoProvider");
  return context;
};
