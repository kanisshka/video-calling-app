import React, { useEffect, useState } from "react";
import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { X } from "lucide-react";
import { MyBackgroundFilterSettings } from "./BackgroundSettings";
const VideoBackground = () => {
  const call = useCall();
  if (!call) {
    throw new Error("usecall must be used within SreamCall component");
  }
//   useEffect(() => {
//     if (isMicCamToggledOn) {
//       call?.camera.disable();
//     //   call?.microphone.disable();
//     } else {
//       call?.camera.enable();
//     //   call?.microphone.enable();
//     }
//   }, [isMicCamToggledOn, call?.camera]);
  return (
    <div>
      <div className="width50">
      <VideoPreview />
      </div>
      <div>
      <MyBackgroundFilterSettings />
        {/* <span>Effects</span>
        <ul>
        <li onClick={() => onEffectChange('Effects')} className="cursor-pointer">Effect 1</li>
          <li onClick={() => onEffectChange('Another Effect')} className="cursor-pointer">Effect 2</li>
          {/* Add more effects as needed
          <li onClick={() => onEffectChange('')} className="cursor-pointer"><X /></li>
        </ul> */}
      </div>
    </div>
  );
};

export default VideoBackground;
