export type Permission = {
  userId: string;
  secretId: string;
  permissions: string[];
};

export type MessageType = {
  message: string;
  code: number;
};
