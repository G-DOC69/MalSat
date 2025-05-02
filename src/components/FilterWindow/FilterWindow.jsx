import { Label, Select, Input, Filters } from "./FilterWindowStyle.js";
import { getUniqueAges, getUniqueValues } from "../../app/store";

const FilterWindow = ({ filter, setFilter, ads = [] }) => {
    const animals = getUniqueValues(ads, "animal");
    const breeds = getUniqueValues(ads, "breed").filter(breed =>
        ads.some(ad => ad.animal === filter.animal && ad.breed === breed)
    );
    const regions = getUniqueValues(ads, "region");
    const ages = getUniqueAges(ads);

    return (
        <Filters>
            <Label>
                Животное:
                <Select
                    value={filter.animal}
                    onChange={e =>
                        setFilter({ ...filter, animal: e.target.value, breed: "" })
                    }
                >
                    <option value="">Любое</option>
                    {animals.map(animal => (
                        <option key={animal} value={animal}>{animal}</option>
                    ))}
                </Select>
            </Label>

            <Label>
                Порода:
                <Select
                    value={filter.breed}
                    disabled={!filter.animal}
                    onChange={e =>
                        setFilter({ ...filter, breed: e.target.value })
                    }
                >
                    <option value="">Любая</option>
                    {breeds.map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                    ))}
                </Select>
            </Label>

            <Label>
                Возраст от:
                <Select
                    value={filter.minAge}
                    onChange={e =>
                        setFilter({ ...filter, minAge: Number(e.target.value) })
                    }
                >
                    <option value="">-</option>
                    {ages.map(age => (
                        <option key={age} value={age}>{age} месяцев</option>
                    ))}
                </Select>
            </Label>

            <Label>
                до:
                <Select
                    value={filter.maxAge}
                    onChange={e =>
                        setFilter({ ...filter, maxAge: Number(e.target.value) })
                    }
                >
                    <option value="">-</option>
                    {ages.map(age => (
                        <option key={age} value={age}>{age} месяцев</option>
                    ))}
                </Select>
            </Label>

            <Label>
                Регион:
                <Select
                    value={filter.region}
                    onChange={e =>
                        setFilter({ ...filter, region: e.target.value })
                    }
                >
                    <option value="">Все</option>
                    {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </Select>
            </Label>

            <Label>
                Цена от:
                <Input
                    type="number"
                    value={filter.minPrice}
                    onChange={e =>
                        setFilter({ ...filter, minPrice: e.target.value })
                    }
                />
            </Label>

            <Label>
                до:
                <Input
                    type="number"
                    value={filter.maxPrice}
                    onChange={e =>
                        setFilter({ ...filter, maxPrice: e.target.value })
                    }
                />
            </Label>
        </Filters>
    );
};

export default FilterWindow;
