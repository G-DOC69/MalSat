import { MessagesContainer, Message } from "./ChatMessagesStyle";

const ChatMessages = ({ messages = [] }) => {
    return (
        <MessagesContainer>
            {messages.map((msg, index) => (
                <Message key={index} sender={msg.isMine ? "me" : "them"}>
                    {msg.text}
                </Message>
            ))}
        </MessagesContainer>
    );
};

export default ChatMessages;
