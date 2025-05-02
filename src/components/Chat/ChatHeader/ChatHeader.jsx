import { Link } from "react-router-dom";
import {
    HeaderContainer,
    InfoBlock,
    HeaderImage
} from "./ChatHeaderStyle";

const ChatHeader = ({ adId, adPhotoUrl, adAnimal, adBreed, otherUser, onRefresh }) => {
    return (
        <HeaderContainer>
            <InfoBlock>
                <Link to={`/ad/${adId}`}>
                    <HeaderImage src={adPhotoUrl} alt="Ad" />
                </Link>
                <Link to={`/ad/${adId}`}>
                    <div>
                        <h3>{adAnimal} {adBreed}</h3>
                    </div>
                </Link>
            </InfoBlock>

            <InfoBlock>
                <Link to={`/profile/${otherUser.id}`}>
                    <HeaderImage src={otherUser.photoUrl} alt="User" />
                </Link>
                <Link to={`/profile/${otherUser.id}`}>
                    <div>
                        <p>{otherUser.username}</p>
                    </div>
                </Link>
                <button onClick={onRefresh}>Обновить</button>
            </InfoBlock>
        </HeaderContainer>
    );
};

export default ChatHeader;
