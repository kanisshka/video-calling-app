"use client"
import React, { useState , useEffect } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  Window,
  Thread,
  MessageInput,
} from "stream-chat-react";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";

import { StreamChat } from "stream-chat";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
type Props = {
  channelId: string;
  callId:any
};
import "stream-chat-react/dist/css/v2/index.css";

const ChatComponent = ({ channelId,callId }: Props) => {
console.log(callId,'callId')
  const [channel, setChannel] = useState<any>(null);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    const initializeChat = async () => {
      if (!isLoaded || !user || !apiKey) return;

      // Initialize Chat Client
      const chatClient = StreamChat.getInstance(apiKey);

      try {
        // Connect the user
        await chatClient.connectUser(
          {
            id: user?.id,
            name: user?.username || user?.id,
            image: user?.imageUrl,
          },
          tokenProvider // Provide the token for chat
        );

        // Create a unique channel for the current session or call
        const uniqueChannelId = callId?.id; // Generate a unique ID for the channel
        const newChannel = chatClient.channel("messaging", uniqueChannelId, {
          image: user.imageUrl,
        });

        // Set the channel and chat client in state
        setChatClient(chatClient);
        setChannel(newChannel);
      } catch (error) {
        console.error("Error initializing chat: ", error);
      }
    };

    initializeChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser(); // Cleanup on unmount
      }
    };
  }, [user, isLoaded]);

  if (!chatClient || !channel) {
    return <div>Loading chat...</div>; // Show a loader while initializing
  }
  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Channel>
    </Chat>
  );
};

export default ChatComponent;
