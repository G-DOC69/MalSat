export const applyFilters = (filter, ads, setTotalItems, setFilteredAds, itemsPerPage, page) => {
    let result = [...ads];

    if (filter.animal) result = result.filter(ad => ad.animal === filter.animal);
    if (filter.breed) result = result.filter(ad => ad.breed === filter.breed);
    if (filter.minAge) result = result.filter(ad => ad.ageMonths >= Number(filter.minAge));
    if (filter.maxAge) result = result.filter(ad => ad.ageMonths <= Number(filter.maxAge));
    if (filter.region) result = result.filter(ad => ad.region === filter.region);
    if (filter.minPrice) result = result.filter(ad => ad.price >= Number(filter.minPrice));
    if (filter.maxPrice) result = result.filter(ad => ad.price <= Number(filter.maxPrice));

    setTotalItems(result.length);
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilteredAds(result.slice(start, end));
};

export const calculateAgeInMonths = (birthDate) => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    return (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
};

export const calculateAgeInYears = (months) => {
    const years = Math.floor(months / 12);
    if (years === 1) return '1 год';
    if (years >= 2 && years <= 4) return `${years} года`;
    return `${years} лет`;
};

export const getUniqueValues = (ads, key) => {
    return [...new Set(ads.map(ad => ad[key]).filter(Boolean))];
};

export const getUniqueAges = (ads) => {
    return [...new Set(ads.map(ad => ad.ageMonths).filter(n => typeof n === "number"))].sort((a, b) => a - b);
};