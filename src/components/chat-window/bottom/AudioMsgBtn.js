import React, { useCallback, useState } from 'react';
import { Alert, Icon, InputGroup } from 'rsuite';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';

import { storage } from '../../../misc/firebase';

const AudioMsgBtn = ({ afterUpload }) => {
  const { chatId } = useParams();

  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onUpload = useCallback(
    async data => {
      setIsUploading(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.webm`)
          .put(data.blob, {
            cacheControl: `public, max-age=${3600 * 24 * 3}`,
          });
        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };
        afterUpload([file]);
        setIsUploading(false);
        Alert.success('Recording uploaded', 4000);
      } catch (error) {
        setIsUploading(false);
        Alert.error(error.message, 4000);
      }
    },
    [afterUpload, chatId]
  );

  const onClick = useCallback(() => {
    setIsRecording(v => !v);
  }, []);

  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isUploading}
      className={isRecording && 'animate-blink'}
    >
      <Icon icon="microphone" />
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onUpload}
        mimeType="audio/webm"
      />
    </InputGroup.Button>
  );
};

export default AudioMsgBtn;
