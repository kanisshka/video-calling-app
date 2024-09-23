"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import Loader from "@/components/Loader";
import { MessageSquare } from "lucide-react";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useGetCallById } from "@/hooks/useGetCallById";
import ChatComponent from "@/components/Chat";
const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <>
              <MeetingRoom />
              <button
                onClick={() => setIsChatVisible((prev) => !prev)}
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  background: "transparent",
                  border: "none",
                }}
              >
                <MessageSquare size={30} className="text-white" />
              </button>
              {isChatVisible && (
                <div
                  className="absolute bottom-0 right-0 bg-dark-1 rounded-lg shadow-lg p-4 h-[80vh]"
                  style={{
                    bottom: "10%",
                    right: "2%",
                    backgroundColor: "#eff0f1",
                    // height: "80vh",
                    width: "25%",
                    maxWidth:"25%"
                  }}
                >
                  <ChatComponent channelId={id} callId={call}/>
                </div>
              )}
            </>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
