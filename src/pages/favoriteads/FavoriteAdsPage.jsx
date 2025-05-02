import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFavoriteAdsRequest } from "../../app/api.js";
import { useCheckUser } from "../../hooks/useCheckUser.js";
import {
    checkMinAge,
    checkMaxAge,
    calculateAgeInMonths,
    calculateAgeInYears,
    getUniqueAges
} from "../../app/store.js";

const FavoriteAdsPage = () => {
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
    const token = localStorage.getItem("access_token");

    useCheckUser();

    useEffect(() => {
        const getAllAds = async () => {
            try {
                const response = await getFavoriteAdsRequest(token);
                const ads = response.data || [];
                setAds(ads);
                setFilteredAds(ads.slice(0, itemsPerPage));
                setTotalItems(ads.length);
            } catch (error) {
                console.error("Ошибка загрузки избранных объявлений:", error);
            }
        };
        getAllAds();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filter, page, ads]);

    useEffect(() => {
        setPage(1);
    }, [filter]);

    const applyFilters = () => {
        let filtered = ads.filter(ad =>
            (filter.animal ? ad.animal.toLowerCase() === filter.animal.toLowerCase() : true) &&
            (filter.breed ? ad.breed.toLowerCase() === filter.breed.toLowerCase() : true) &&
            (filter.minAge ? checkMinAge(calculateAgeInMonths(ad.age), filter.minAge, ads) : true) &&
            (filter.maxAge ? checkMaxAge(calculateAgeInMonths(ad.age), filter.maxAge, ads) : true) &&
            (filter.region ? ad.region.toLowerCase() === filter.region.toLowerCase() : true) &&
            (filter.minPrice ? ad.price >= parseInt(filter.minPrice) : true) &&
            (filter.maxPrice ? ad.price <= parseInt(filter.maxPrice) : true)
        );
        setTotalItems(filtered.length);
        const startIndex = (page - 1) * itemsPerPage;
        setFilteredAds(filtered.slice(startIndex, startIndex + itemsPerPage));
    };

    const uniqueValues = (key) => [...new Set(ads.map(ad => ad[key]))];

    const handleNextPage = () => {
        if ((page * itemsPerPage) < totalItems) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Избранные Объявления</h1>
            <div>
                <label>Животное:
                    <select value={filter.animal} onChange={e => setFilter({ ...filter, animal: e.target.value, breed: "" })}>
                        <option value="">Любое</option>
                        {uniqueValues("animal").map(animal => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>

                <label>Порода:
                    <select value={filter.breed} disabled={!filter.animal} onChange={e => setFilter({ ...filter, breed: e.target.value })}>
                        <option value="">Любая</option>
                        {uniqueValues("breed").filter(breed =>
                            ads.find(ad => ad.animal === filter.animal && ad.breed === breed)
                        ).map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>

                <label>Возраст от:
                    <select value={filter.minAge} onChange={e => setFilter({ ...filter, minAge: Number(e.target.value) })}>
                        <option value="">-</option>
                        {getUniqueAges(ads).map(age => (
                            <option key={age} value={age}>{age} мес</option>
                        ))}
                    </select>
                </label>

                <label>до:
                    <select value={filter.maxAge} onChange={e => setFilter({ ...filter, maxAge: Number(e.target.value) })}>
                        <option value="">-</option>
                        {getUniqueAges(ads).map(age => (
                            <option key={age} value={age}>{age} мес</option>
                        ))}
                    </select>
                </label>

                <label>Регион:
                    <select value={filter.region} onChange={e => setFilter({ ...filter, region: e.target.value })}>
                        <option value="">Все</option>
                        {uniqueValues("region").map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </label>

                <label>Цена от:
                    <input type="number" value={filter.minPrice} onChange={e => setFilter({ ...filter, minPrice: e.target.value })} />
                </label>

                <label>до:
                    <input type="number" value={filter.maxPrice} onChange={e => setFilter({ ...filter, maxPrice: e.target.value })} />
                </label>
            </div>

            <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
                {filteredAds.map((ad) => (
                    <div
                        key={ad.id}
                        onClick={() => navigate(`/ad/${ad.id}`)}
                        style={{ cursor: "pointer", border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}
                    >
                        <img src={ad.photoUrl} alt={ad.breed} style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
                        <h2>{ad.breed} ({ad.animal})</h2>
                        <p>Возраст: {calculateAgeInMonths(ad.age)} месяцев ({calculateAgeInYears(calculateAgeInMonths(ad.age))})</p>
                        <p>Регион: {ad.region}</p>
                        <p><strong>{ad.price} сом</strong></p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                <button onClick={handlePrevPage} disabled={page === 1}>← Назад</button>
                <span style={{ margin: "0 10px" }}>{page} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems}>Вперед →</button>
            </div>
        </div>
    );
};

export default FavoriteAdsPage;
