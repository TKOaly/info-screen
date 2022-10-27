import axios from "axios";
import { format } from "date-fns";
import en from "date-fns/locale/en-US";
import { groupBy } from "ramda";

const BASE_URL = "https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=en";

export const fetchExactumFoodlist = () => {
  return axios
    .get(BASE_URL)
    .then(({ data }) => data[15])
    .then(formatResponse);
};

export const fetchChecmicumFoodlist = () => {
  return axios
    .get(BASE_URL)
    .then(({ data }) => data[16])
    .then(formatResponse);
};

function formatResponse(response) {
  const { menuData } = response;
  const { data: foodlistData } = menuData.menus.find(
    ({ date }) => date === format(new Date(), "EE dd.MM.", { locale: en })
  );

  const { lounas } = menuData.visitingHours;
  const lunchHours = lounas?.items?.[0]?.hours;

  if (foodlistData) {
    const foodlistDataEn = foodlistData.map(({ name, price, meta }) => ({
      name: name,
      priceName: price.name,
      meta: { diet: meta["0"], allergies: meta["1"] }
    }));
    const groupByPrice = groupBy(({ priceName }) => priceName.toLowerCase());
    return { groups: groupByPrice(foodlistDataEn), lunchHours };
  }
}
