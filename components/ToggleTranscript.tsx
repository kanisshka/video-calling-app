// import {
//   useCall,
//   useCallStateHooks,
//   TranscriptionSettingsRequestModeEnum,
// } from "@stream-io/video-react-sdk";
// import { useState, useEffect } from "react";

// export const MyToggleTranscriptionButton = () => {
//   const call = useCall();
//   const { useCallSettings, useIsCallTranscribingInProgress } =
//     useCallStateHooks();
//   const { transcription } = useCallSettings() || {};

//   if (transcription?.mode === TranscriptionSettingsRequestModeEnum.DISABLED) {
//     return null;
//   }

//   const isTranscribing = useIsCallTranscribingInProgress();
//   const [transcriptions, setTranscriptions] = useState<any[]>([]); // Store new transcriptions
//   const [displayedTranscriptions, setDisplayedTranscriptions] = useState<any[]>(
//     []
//   ); // Track what has been displayed
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [transcriptionInterval, setTranscriptionInterval] = useState<any>(null);
//   const chunkSize = 3; // Number of messages to show at once
//   const displayDuration = 3000; // How long each set of messages should be shown (in milliseconds)

//   // Function to start polling for transcription data
//   const startTranscriptionPolling = () => {
//     if (transcriptionInterval) {
//       clearInterval(transcriptionInterval);
//     }

//     const interval = setInterval(() => {
//       fetchTranscription();
//     }, 2000); // Poll every 15 seconds

//     setTranscriptionInterval(interval);
//   };

//   // Function to stop polling
//   const stopTranscriptionPolling = () => {
//     if (transcriptionInterval) {
//       clearInterval(transcriptionInterval);
//       setTranscriptionInterval(null);
//     }
//   };

//   const handleToggle = () => {
//     if (isTranscribing) {
//       call
//         ?.stopTranscription()
//         .then((res) => {
//           console.log(res, "Transcription Stopped");
//           stopTranscriptionPolling();
//           // fetchTranscription();
//         })
//         .catch((err) => {
//           console.log("Failed to stop transcription", err);
//         });
//     } else {
//       call
//         ?.startTranscription()
//         .then((res) => {
//           console.log(res, "Transcription Started");
//           setTimeout(() => {
//             startTranscriptionPolling();
//           }, 3000); // Start polling after 3 seconds
//         })
//         .catch((err) => {
//           console.error("Failed to start transcription", err);
//         });
//     }
//   };

//   const fetchTranscription = async () => {
//     try {
//       const transcriptionsResponse = await call?.queryTranscriptions();
//       console.log(transcriptionsResponse, "response");
//       if (
//         !transcriptionsResponse ||
//         transcriptionsResponse.transcriptions.length === 0
//       ) {
//         throw new Error("No transcriptions found.");
//       }

//       const transcription = transcriptionsResponse.transcriptions[0];
//       const transcriptionUrl = transcription.url;

//       const response = await fetch(transcriptionUrl);
//       const transcriptionData = await response.text();

//       const transcriptionLines = transcriptionData.split("\n").filter(Boolean);
//       const newTranscriptions = transcriptionLines.map((line) =>
//         JSON.parse(line)
//       );

//       // Filter out already displayed transcriptions
//       console.log(displayedTranscriptions, "displaying");
//       const uniqueTranscriptions = newTranscriptions.filter((newItem) => {
//         return !displayedTranscriptions.some(
//           (displayedItem) =>
//             displayedItem.start_ts === newItem.start_ts && // Compare based on unique `start_ts`
//             displayedItem.stop_ts === newItem.stop_ts // Or compare based on `text`
//         );
//       });

//       console.log(
//         uniqueTranscriptions,
//         displayedTranscriptions,
//         "Unique Transcriptions"
//       );
//       if (uniqueTranscriptions.length > 0) {
//         // Set only the latest transcriptions (not appending the previous ones)
//         setDisplayedTranscriptions(uniqueTranscriptions); // Show only the latest transcription
//         setTranscriptions(uniqueTranscriptions); // Update the transcription state with the latest
//       }
//     } catch (error) {
//       console.error("Error fetching transcription URL or data:", error);
//     }
//   };

//   useEffect(() => {
//     // Cleanup polling when component unmounts
//     return () => stopTranscriptionPolling();
//   }, []);

//   // useEffect(() => {
//   //   // Function to display the next set of messages
//   //   const showNextMessages = () => {
//   //     if (transcriptions.length === 0) return;

//   //     const nextIndex = currentIndex + chunkSize;
//   //     const messagesToShow = transcriptions.slice(currentIndex, nextIndex);

//   //     if (messagesToShow.length > 0) {
//   //       setDisplayedTranscriptions(messagesToShow);
//   //       setCurrentIndex(nextIndex >= transcriptions.length ? 0 : nextIndex); // Reset to the beginning if at the end
//   //     }
//   //   };

//   //   const interval = setInterval(showNextMessages, displayDuration); // Display the next set every few seconds

//   //   return () => clearInterval(interval); // Cleanup interval on unmount
//   // }, [transcriptions, currentIndex]);

//   console.log(displayedTranscriptions, "displayed");
//   console.log(transcriptions, "transcriptions");
//   return (
//     <>
//       <button onClick={handleToggle}>
//         {isTranscribing ? "Stop transcription" : "Start transcription"}
//       </button>

//       {/* <div>
//         <h3>Transcription:</h3>
//         {displayedTranscriptions.length === 0 ? (
//           <p>No transcription available yet...</p>
//         ) : (
//           <ul>
//             {displayedTranscriptions.map((transcription, index) => (
//               <li key={index}>{transcription.text}</li>
//             ))}
//           </ul>
//         )}
//       </div> */}
//     </>
//   );
// };
