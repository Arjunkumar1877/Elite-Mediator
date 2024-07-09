import React, { useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { FaMicrophone } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";

type AudioRecorderProps = {
  onRecordingComplete: (blob: Blob) => void;
};


const AudioRecorder: React.FC<AudioRecorderProps> = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (mediaRecorder.current) return; 

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) { 
            console.log(e.data)
            onRecordingComplete(e.data);
            chunks.current.push(e.data);
          }
        };
        mediaRecorder.current.start();
        setRecording(true);
        console.log('Recording started');
      })
      .catch(err => {
        console.error('Error accessing microphone:', err);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);

      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      console.log('Blob size:', blob.size);
      console.log('Blob:', blob); 

      chunks.current = []; 
      mediaRecorder.current = null; 

      
    }
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}><FaMicrophone className='text-2xl text-sky-500' /></button>
      ) : (
        <div className='flex gap-1'>
          <button onClick={stopRecording}><FaRegStopCircle className='text-2xl text-red-500' /></button>
          <ReactLoading type={"bars"} className='text-sky-500' height={30} width={30} />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
