"use client";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import "stream-chat-react/dist/css/v2/index.css";
import { useUser } from "@clerk/nextjs";
import { StreamChat } from "stream-chat"; // Import from stream-chat
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  Window,
  Thread,
  MessageInput,
} from "stream-chat-react";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { ReactNode, useState, useEffect } from "react";
import { MessageSquare } from "lucide-react"; // Import your chat icon
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
//   const userId = 'user-id';
//   const token = 'authentication-token';
//   const user: User = { id: userId };

//   const client = new StreamVideoClient({ apiKey, user, token });
//   const call = client.call('default', 'my-first-call');
//   call.join({ create: true });

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const [chatClient, setChatClient] = useState<StreamChat>();
  const { user, isLoaded } = useUser();
  const [isChatVisible, setIsChatVisible] = useState(false);
  // const channel = chatClient?.channel("messaging", "my-channel", {});
  const [channel, setChannel] = useState<any>(null);
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API key missing");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(client);

    // Initialize Chat Client
    const chatClient = StreamChat.getInstance(apiKey);
    chatClient.connectUser(
      {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider // Provide the token for chat
    );
    setChatClient(chatClient);

    // Create a unique channel for the current session or call
    const uniqueChannelId = `call-122`; // Generate a unique ID for the channel
    const newChannel = chatClient.channel("messaging", uniqueChannelId, {
      image: user.imageUrl,
    });
    setChannel(newChannel);

    return () => {
      chatClient.disconnectUser(); // Cleanup on unmount
    };
  }, [user, isLoaded]);
  if (!videoClient || !chatClient) return <Loader />;
  return (
    <StreamVideo client={videoClient}>
      {/* <Chat client={chatClient}> */}
      {children}
      {/* </Chat> */}
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
      {isChatVisible && channel && (
        <div
          className="absolute bottom-0 right-0 bg-dark-1 rounded-lg shadow-lg p-4 h-[80vh]"
          style={{
            bottom: "10%",
            right: "2%",
            backgroundColor: "#eff0f1",
            // height: "80vh",
            // width: "25vw"
          }}
        >
          <Chat client={chatClient}>
            <Channel channel={channel}>
              
                <ChannelHeader />
                <MessageList />
                <MessageInput />
             
            </Channel>
          </Chat>
        </div>
      )}
    </StreamVideo>
  );
};
export default StreamVideoProvider;
