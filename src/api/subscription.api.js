import api from "./axios";

export const getSubscribedChannels = async (token) => {
  const response = await api.get(`subscriptions/get-channel`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data; 
};


export const toggleSubscription = async (channelId, token) => {
  const response = await api.post(
    `subscriptions/toggleSubscription/${channelId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data; 
};

export const getSubscriberCount = async (channelId) => {
  const response = await api.get(
    `/subscriptions/subscriber-count/${channelId}`
  );

  return response.data.data.subscriberCount;
};
