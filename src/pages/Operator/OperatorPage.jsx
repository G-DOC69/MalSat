import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDeliveriesForOperator, getAllReceiptsForOperator } from '../../app/api';
import { Container, StartButton, ErrorText } from './OperatorPageStyle';
import OperatorPanel from "../../components/Operator/OperatorPanel/OperatorPanel.jsx";
const OperatorPage = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [started, setStarted] = useState(false);
    const [error,] = useState(null);
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    const handleStart = async () => {
        try {
            const dRes = await getAllDeliveriesForOperator(token);
            const rRes = await getAllReceiptsForOperator(token);
            setDeliveries(dRes.data);
            setReceipts(rRes.data);
            setStarted(true);
        } catch (err) {
            console.error(err)
            navigate('/');
        }
    };

    if (!started) {
        return (
            <Container>
                <StartButton onClick={handleStart}>Начать работу оператора</StartButton>
                {error && <ErrorText>{error}</ErrorText>}
            </Container>
        );
    }

    return <OperatorPanel deliveries={deliveries} receipts={receipts} token={token} />;
};

export default OperatorPage;
