export type UpdateNicknameEvent = {
  topic: 'update-nickname';
  value: {
    userId: string;
    nickName: string;
  };
};

export type QStashEvent = UpdateNicknameEvent;
