"use client";
import React, { useState } from "react";
import Image from "next/image";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import {Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const { user } = useUser();
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const [values,setValues] = useState({
    dateTime: new Date(),
    description:"",
    link:""
  })
  const {toast} = useToast()
  const createMeeting = async() => {
    if (!client || !user) return;

    try {
      if(!values.dateTime){
        toast({
          title: "Please select a date and time",
        })
        return
      }
      const id = crypto.randomUUID();
      const call = client.call('default',id);
      if(!call) throw new Error("failed to create call")
        const startsAt = values.dateTime.toISOString()||new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
    
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      }); 
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created",
      })
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to create meeting",
      })
    }
  };
  console.log(meetingState, "meetingstate");
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        className="bg-orange-1"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      {!callDetail ? (
         <MeetingModal
         isOpen={meetingState === "isScheduleMeeting"}
         onClose={() => setMeetingState(undefined)}
         title="Create Meeting"
         className="text-center"
         buttonText="Start Meeting"
         handleClick={createMeeting}
       >
        <div className="flex flex-col gap-2.5 ">
          <label className="text-base text-normal leading-[22px] text-sky-2">
            Add a Description
          </label>
        </div>
       </MeetingModal>
      ) : (
        <MeetingModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Meeting Created"
        className="text-center"
        buttonText="Copy Meeting Link"
        handleClick={()=>{
          // navigator.clipboard.writeText(meetingLink);
          // toast({title:"Link Copied"})
        }}
        image="/icons/checked.svg"
        buttonIcon="/icons/copy.svg"
      />
      )}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
