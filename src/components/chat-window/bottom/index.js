import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useParams } from 'react-router';
import firebase from 'firebase/compat/app';

import { useProfile } from '../../../context/profile.context';
import { database } from '../../../misc/firebase';

import AttachmentBtnModal from './AttachmentBtnModal';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
}

const Bottom = () => {
  const [input, setinput] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const { profile } = useProfile();
  const { chatId } = useParams();

  const onInputChange = useCallback(value => {
    setinput(value);
  }, []);

  const onSendClick = async () => {
    if (!input.trim().length) return;

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setisLoading(true);

    try {
      await database.ref().update(updates);
      setinput('');
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      onSendClick();
    }
  };

  const afterUpload = useCallback(
    async files => {
      setisLoading(true);
      const updates = {};
      files.forEach(file => {
        const msgData = assembleMessage(profile, chatId);
        msgData.file = file;
        const messageId = database.ref('messages').push().key;
        updates[`/messages/${messageId}`] = msgData;
      });
      const lastMsgId = Object.keys(updates).pop();
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId: lastMsgId,
      };
      try {
        await database.ref().update(updates);
        setisLoading(false);
      } catch (error) {
        setisLoading(false);
        Alert.error(error.message, 4000);
      }
    },
    [chatId, profile]
  );

  return (
    <div>
      <InputGroup>
        <AttachmentBtnModal afterUpload={afterUpload} />
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          color="blue"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
