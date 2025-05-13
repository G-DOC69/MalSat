import { useState } from "react";
import {
    InputContainer,
    ChatInput,
    SendButton,
    LimitWarning
} from "./ChatInputBarStyle";

const ChatInputBar = ({ value, setValue, onSend ,loading}) => {
    const [limitExceeded, setLimitExceeded] = useState(false);

    const handleChange = (e) => {
        const text = e.target.value;
        setValue(text);
        setLimitExceeded(text.length > 200);
    };

    return (
        <>
            <InputContainer>
                <ChatInput
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === "Enter" && onSend()}
                    maxLength={300}
                />
                <SendButton onClick={onSend} disabled={!value.trim()||loading}>
                    Отправить
                </SendButton>
            </InputContainer>

            {limitExceeded && (
                <LimitWarning>
                    Максимум 300 символов, осталось {300 - value.length}
                </LimitWarning>
            )}
            {value.length === 300 && (
                <LimitWarning>
                    Укоротите сообщение
                </LimitWarning>
            )}
        </>
    );
};

export default ChatInputBar;
