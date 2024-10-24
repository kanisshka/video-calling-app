import { cn } from "@/lib/utils";
import { BackgroundFiltersProvider } from "@stream-io/video-react-sdk"; // Import the BackgroundFiltersProvider
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { MyBackgroundFilterSettings } from "@/components/BackgroundSettings";
import React, { useState } from "react";
// import { MyToggleTranscriptionButton } from "./ToggleTranscript";
import VideoBackground from "./VideoBackground";
import LayoutControl from "./LayoutControl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutList,
  Users,
  Sparkles,
  ChevronDown,
  LayoutDashboard,
  Sparkle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const [selectedEffect, setSelectedEffect] = useState<string>(""); // State to hold the selected effect
  const callingState = useCallCallingState();
  if (callingState !== CallingState.JOINED) return <Loader />;
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleEffectSelection = (effect: string) => {
    setSelectedEffect(effect); // Update the state with the selected effect
  };
  const handleEffectChange = (effect: string) => {
    setSelectedEffect(effect); // Update the effect state
  };
  const renderRightComponent = () => {
    switch (selectedEffect) {
      case "Effects":
        return <VideoBackground />; // Render your corresponding component here
      // Add more cases for other effects if needed
      case "Layouts":
        return <LayoutControl layout={layout} setLayout={setLayout} />;
      default:
        return <div>Select an option to view details.</div>; // Default message
    }
  };
  return (
    <BackgroundFiltersProvider
      backgroundImages={[
        "/images/background-image-1.avif",
        "/images/background-image-2.avif",
        "/images/background-image-3.avif",
        "/images/background-image-4.avif",
      ]}
    >
      <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
        <div className="relative flex size-full items-center justify-center">
          <div className="flex size-full max-w-[1000px] items-center">
            <CallLayout />
          </div>
          <div
            className={cn("h-[calc(100vh-86px)] hidden ml-2 ", {
              "show-block": showParticipants,
            })}
          >
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
          <CallControls onLeave={() => router.push(`/`)} />
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d px-4 py-2 hover:bg-[#4c535d]">
                <Sparkles size={20} className="text-white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white flex widFull">
                <div className="leftCont">
                  <ul>
                    <li
                      onClick={() => handleEffectSelection("Effects")}
                      className="cursor-pointer"
                    >
                      <Sparkle /> Effects
                    </li>
                    <li
                      onClick={() => handleEffectSelection("Layouts")}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard /> Layouts
                    </li>
                  </ul>
                </div>
                <div className="rightCont">{renderRightComponent()}</div>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d px-4 py-2 hover:bg-[#4c535d]">
              {" "}
              <Users size={20} className="text-white" />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
          {/* <MyToggleTranscriptionButton/> */}
        </div>
      </section>
      {/* Add the background filter settings UI */}
    </BackgroundFiltersProvider>
  );
};

export default MeetingRoom;
