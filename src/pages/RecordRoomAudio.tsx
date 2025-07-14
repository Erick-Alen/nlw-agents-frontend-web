import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

export const RecordRoomAudio: React.FC = () => {
  const params = useParams<{ roomId: string }>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const createRecorder = (audio: MediaStream) => {
    recorder.current = new MediaRecorder(audio, {
      // format type i want to record the audio
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.info('Recording started');
    };

    recorder.current.onstop = () => {
      console.info('Recording stopped');
    };

    recorder.current.start();
  };

  const startRecording = async () => {
    if (!isRecordingSupported) {
      alert('Gravação de áudio não é suportada neste navegador.');
      return;
    }
    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();
      createRecorder(audio);
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }
    intervalRef.current && clearInterval(intervalRef.current);
    // Logic to stop the recording
    // recorder.stop(); // Uncomment when recorder is defined
  };

  const uploadAudio = async (audio: Blob) => {
    const formData = new FormData();
    formData.append('audio', audio, 'recording.webm');
    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );
    console.log(await response.json());
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording} variant="destructive">
          Parar Gravação
        </Button>
      ) : (
        <Button onClick={startRecording}>Iniciar Gravação</Button>
      )}
      {isRecording ? (
        <p className="text-muted-foreground">Gravando...</p>
      ) : (
        <p className="text-muted-foreground">Pausado</p>
      )}
    </div>
  );
};
