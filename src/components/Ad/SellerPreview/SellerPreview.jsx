import { Link } from "react-router-dom";
import { SellerSection, SellerPhoto, SellerName } from "./SellerPreviewStyle";

const SellerPreview = ({ seller }) => {
    if (!seller) return null;
    return (
        <SellerSection as={Link} to={`/user/${seller.id}`}>
            {seller.photoUrl && <SellerPhoto src={seller.photoUrl} alt={seller.name} />}
            <div>
                <SellerName>{seller.name}</SellerName>
                {seller.phone && <p>📞 {seller.phone}</p>}
            </div>
        </SellerSection>
    );
};

export default SellerPreview;
