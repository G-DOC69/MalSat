import './AllAdsPageStyle';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdsRequest } from "../../app/api";
import { applyFilters } from "../../app/store";
import { AdsGrid, Container } from "./AllAdsPageStyle";
import AdCard from "../../components/AdCard/AdCard";
import Pagination from "../../components/Pagination/Pagination";
import FilterWindow from "../../components/FilterWindow/FilterWindow";

const AllAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [filter, setFilter] = useState({
        animal: "",
        breed: "",
        minAge: "",
        maxAge: "",
        region: "",
        minPrice: "",
        maxPrice: ""
    });

    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAds();
    }, []);

    useEffect(() => {
        applyFilters(filter, ads, setTotalItems, setFilteredAds, itemsPerPage, page);
    }, [filter, ads, page]);

    useEffect(() => {
        setPage(1);
    }, [filter]);

    const fetchAds = async () => {
        try {
            const response = await getAllAdsRequest();
            const data = response?.data || [];
            const formatted = data.map(ad => ({
                ...ad,
                ageMonths: calculateAgeInMonths(ad.age)
            }));
            setAds(formatted);
        } catch (error) {
            console.error("Ошибка при загрузке объявлений:", error);
        }
    };

    const calculateAgeInMonths = (dateString) => {
        const birthDate = new Date(dateString);
        const now = new Date();
        return (now.getFullYear() - birthDate.getFullYear()) * 12 + now.getMonth() - birthDate.getMonth();
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <Container>
            <h1>Все Объявления</h1>
            <FilterWindow filter={filter} setFilter={setFilter} ads={ads} />
            <AdsGrid>
                {filteredAds.map((ad) => (
                    <AdCard key={ad.id} ad={ad} navigate={navigate} />
                ))}
            </AdsGrid>
            {totalPages > 1 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                />
            )}
        </Container>
    );
};

export default AllAdsPage;
