import { Link } from "react-router-dom";
import {
  SellerSection,
  SellerPhoto,
  SellerName,
  SellerInfo,
  SellerPhone,
  VerifiedBadge
} from "./SellerPreviewStyle";

const SellerPreview = ({ seller }) => {
  if (!seller) return null;

  return (
    <SellerSection as={Link} to={`/user/${seller.id}`}>
      {seller.photoUrl && <SellerPhoto src={seller.photoUrl} alt={seller.name} />}
      <SellerInfo>
        <SellerName>
          {seller.name}
          {seller.verified && <VerifiedBadge>✔</VerifiedBadge>}
        </SellerName>
        {seller.phone && <SellerPhone>📞 {seller.phone}</SellerPhone>}
      </SellerInfo>
    </SellerSection>
  );
};

export default SellerPreview;
