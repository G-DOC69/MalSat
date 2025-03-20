// imports
import './AllAdsPageStyle.css'
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {getAllAdsRequest} from "../../app/api.js";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
    display: flex;
    flex-direction: column;
    h1{
        font-size: 5vw;
        align-self: center;
    }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 14px;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const AdsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const AdCard = styled.div`
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

const AdTitle = styled.h2`
  font-size: 18px;
  margin: 5px 0;
`;

const AdText = styled.p`
  font-size: 14px;
  color: #555;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background: #1e3a8a;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #3b82f6;
  }
`;

const AllAdsPage = () => {
    // variables
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

    // UseEffects
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const allAds = await getAllAdsRequest(); // Waits for data
                setAds(allAds.data)
            } catch (err) {
                console.error("Error fetching ads:", err);
            }
        };

        fetchAds();
    }, []);

    useEffect(() => {
        if (ads.length > 0) {
            setFilteredAds(ads.slice(0, itemsPerPage));
            setTotalItems(ads.length);
        }
    }, [ads]);

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

    const calculateAgeInMonths = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    };

    const calculateAgeInYears = (months) => {
        switch (Math.floor(months/12)){
            case 0:
                return (Math.floor(months/12)+' лет');
            case 1:
                return (Math.floor(months/12)+' год')
            case 2:
                return (Math.floor(months/12)+' года')
            case 3:
                return (Math.floor(months/12)+' года')
            case 4:
                return (Math.floor(months/12)+' года')
            default:
                return (Math.floor(months/12)+' лет')
        }
    }

    const checkMinAge = (adAge, minAge, ads) => {
        const ageOrder = uniqueAges(ads);
        return ageOrder.indexOf(adAge) >= ageOrder.indexOf(minAge);
    };

    const checkMaxAge = (adAge, maxAge, ads) => {
        const ageOrder = uniqueAges(ads);
        return ageOrder.indexOf(adAge) <= ageOrder.indexOf(maxAge);
    };

    const uniqueAges = (ads) => [...new Set(ads.map(ad => calculateAgeInMonths(ad.age)))].sort((a, b) => a - b);

    const uniqueValues = (key) => [...new Set(ads.map(ad => ad[key]))];

    const handleNextPage = () => {
        const nextPage = page + 1;
        if ((nextPage - 1) * itemsPerPage < totalItems) {
            setPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Page
    return (
        <Container>
            <h1>Все Объявления</h1>

            {/* Фильтры */}
            <Filters>
                <Label>
                    Животное:
                    <Select value={filter.animal} onChange={e => setFilter({...filter, animal: e.target.value, breed: ""})}>
                        <option value="">Любое</option>
                        {uniqueValues("animal").map(animal => (
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </Select>
                </Label>

                <Label>
                    Порода:
                    <Select value={filter.breed} disabled={!filter.animal} onChange={e => setFilter({...filter, breed: e.target.value})}>
                        <option value="">Любая</option>
                        {uniqueValues("breed").filter(breed => ads.find(ad => ad.animal === filter.animal && ad.breed === breed)).map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </Select>
                </Label>

                <Label>
                    Возраст от:
                    <Select value={filter.minAge} onChange={e => setFilter({...filter, minAge: Number(e.target.value)})}>
                        <option value="">-</option>
                        {uniqueAges(ads).map(age => (
                            <option key={age} value={age}>{age} месяцев</option>
                        ))}
                    </Select>
                </Label>

                <Label>
                    до:
                    <Select value={filter.maxAge} onChange={e => setFilter({...filter, maxAge: Number(e.target.value)})}>
                        <option value="">-</option>
                        {uniqueAges(ads).map(age => (
                            <option key={age} value={age}>{age} месяцев</option>
                        ))}
                    </Select>
                </Label>

                <Label>
                    Регион:
                    <Select value={filter.region} onChange={e => setFilter({...filter, region: e.target.value})}>
                        <option value="">Все</option>
                        {uniqueValues("region").map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </Select>
                </Label>

                <Label>
                    Цена от:
                    <Input type="number" value={filter.minPrice} onChange={e => setFilter({...filter, minPrice: e.target.value})} />
                </Label>

                <Label>
                    до:
                    <Input type="number" value={filter.maxPrice} onChange={e => setFilter({...filter, maxPrice: e.target.value})} />
                </Label>
            </Filters>

            {/* Карточки объявлений */}
            <AdsGrid>
                {filteredAds.map((ad) => (
                    <AdCard key={ad.id} onClick={() => navigate(`/ad/${ad.id}`)}>
                        <AdImage src={ad.photoUrl} alt={ad.breed} />
                        <AdTitle>{ad.breed} ({ad.animal})</AdTitle>
                        <AdText>Возраст: {calculateAgeInMonths(ad.age)} месяцев ({calculateAgeInYears(calculateAgeInMonths(ad.age))} лет)</AdText>
                        <AdText>Регион: {ad.region}</AdText>
                        <AdText><strong>{ad.price} сом</strong></AdText>
                    </AdCard>
                ))}
            </AdsGrid>

            {/* Пагинация */}
            <Pagination>
                <PageButton onClick={handlePrevPage} disabled={page === 1}>← Назад</PageButton>
                <p>{page} / {totalPages}</p>
                <PageButton onClick={handleNextPage} disabled={page * itemsPerPage >= totalItems}>Вперед →</PageButton>
            </Pagination>
        </Container>
    );
};
export default AllAdsPage;