import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAdsRequest } from "../../app/api";
import { useCheckUser } from "../../hooks/useCheckUser";
import { applyFilters } from "../../app/store";
import { Container, AdsGrid } from "./UserAdsPageStyle.js";

import AdCard from "../../components/AdCard/AdCard.jsx";
import FilterWindow from "../../components/FilterWindow/FilterWindow.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

const UserAdsPage = () => {
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
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const navigate = useNavigate();

    useCheckUser();

    useEffect(() => {
        const fetchUserAds = async () => {
            try {
                const token = localStorage.getItem("access_token");
                const res = await getUserAdsRequest(token);
                setAds(res.data || []);
            } catch (err) {
                console.error("Ошибка загрузки объявлений пользователя:", err);
            }
        };
        fetchUserAds();
    }, []);

    useEffect(() => {
        applyFilters(filter, ads, setTotalItems, setFilteredAds, itemsPerPage, page);
    }, [filter, ads, page]);

    useEffect(() => {
        setPage(1);
    }, [filter]);

    return (
        <Container>
            <h1>Мои Объявления</h1>
            <FilterWindow filter={filter} setFilter={setFilter} ads={ads} />
            <AdsGrid>
                {filteredAds.map(ad => (
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

export default UserAdsPage;
