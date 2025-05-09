import DeliveryPanel from '../DeliveryPanel/DeliveryPanel.jsx';
import ReceiptPanel from '../ReceiptPanel/ReceiptPanel.jsx';
import { PanelContainer } from './OperatorPanelStyle';

const OperatorPanel = ({ deliveries, receipts, token }) => (
    <PanelContainer>
        <DeliveryPanel deliveries={deliveries} token={token} />
        <ReceiptPanel receipts={receipts} token={token} />
    </PanelContainer>
);

export default OperatorPanel;
