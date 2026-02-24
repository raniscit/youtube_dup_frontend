import api from "./axios";

export const getSubscribedChannels = async () => {
  const response = await api.get(`subscriptions/get-channel`);
  return response.data.data; 
};


export const toggleSubscription = async (channelId) => {
  const response = await api.post(
    `subscriptions/toggleSubscription/${channelId}`,
  );
  return response.data.data; 
};

export const getSubscriberCount = async (channelId) => {
  const response = await api.get(
    `/subscriptions/subscriber-count/${channelId}`
  );

  return response.data.data.subscriberCount;
};
