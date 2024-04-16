import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  addMessageMutation,
  messagesQuery,
  messageSubscription,
} from "./queries";

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const {
      data: { message },
    } = await mutate({
      variables: { text },
    });
    return message;
  };

  return { addMessage };
}

export function useMessages() {
  const { data } = useQuery(messagesQuery);

  useSubscription(messageSubscription, {
    onData: ({ client, data }) => {
      const newMessage = data.data.message;

      const updateFunc = (oldData) => ({
        messages: [...oldData.messages, newMessage],
      });

      client.cache.updateQuery({ query: messagesQuery }, updateFunc);
    },
  });

  return {
    messages: data?.messages ?? [],
  };
}
