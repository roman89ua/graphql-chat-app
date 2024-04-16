import { gql } from "@apollo/client";

const messageFragment = gql`
  fragment messageDetails on Message {
    id
    user
    text
  }
`;

export const messagesQuery = gql`
  query MessagesQuery {
    messages {
      ...messageDetails
    }
  }
  ${messageFragment}
`;

export const addMessageMutation = gql`
  mutation AddMessageMutation($text: String!) {
    message: addMessage(text: $text) {
      ...messageDetails
    }
  }
  ${messageFragment}
`;

export const messageSubscription = gql`
  subscription MessageAddedSubscription {
    message: messageAdded {
      ...messageDetails
    }
  }
  ${messageFragment}
`;
