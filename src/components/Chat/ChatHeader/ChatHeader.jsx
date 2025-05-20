import { Link } from "react-router-dom";
import {
  HeaderContainer,
  InfoBlock,
  HeaderImage,
  NameText,
  RefreshButton,
} from "./ChatHeaderStyle";

const ChatHeader = ({ adId, adPhotoUrl, adAnimal, adBreed, otherUser, onRefresh }) => {
  return (
    <HeaderContainer>
      <InfoBlock>
        <Link to={`/ad/${adId}`}>
          <HeaderImage src={adPhotoUrl} alt="Ad" />
        </Link>
        <Link to={`/ad/${adId}`}>
          <NameText>{adAnimal} {adBreed}</NameText>
        </Link>
      </InfoBlock>

      <InfoBlock>
        <Link to={`/profile/${otherUser.id}`}>
          <HeaderImage src={otherUser.photoUrl} alt="User" />
        </Link>
        <Link to={`/profile/${otherUser.id}`}>
          <NameText>{otherUser.username}</NameText>
        </Link>
        <RefreshButton onClick={onRefresh}>🔄 Обновить</RefreshButton>
      </InfoBlock>
    </HeaderContainer>
  );
};

export default ChatHeader;
