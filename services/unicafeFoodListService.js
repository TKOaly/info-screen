import axios from "axios";
import { format } from "date-fns";
import en from "date-fns/locale/en-US";
import { groupBy } from "ramda";

const UNICAFE_API_URL =
  "https://unicafe.fi/wp-json/swiss/v1/restaurants?lang=en";

const EXACTUM_SLUG = "exactum";
const CHEMICUM_SLUG = "chemicum";

export const fetchFoodlists = () =>
  axios
    .get(UNICAFE_API_URL)
    .then(({ data }) => data)
    .then(formatResponse);

const resolveFoodlist = (restaurant) => {
  if (!restaurant) {
    return null
  }

  const { data: foodlistData } =
    restaurant.menuData.menus.find(
      ({ date }) => date === format(new Date(), "EEE dd.MM.", { locale: en })
    ) ?? {};

  if (foodlistData) {
    const foodlistDataEn = foodlistData.map(({ name, price, meta }) => ({
      name,
      priceName: price.name,
      meta: { diet: meta["0"].join(" "), allergies: meta["1"].join(" ") },
    }));
    const groupByPrice = groupBy(({ priceName }) => priceName.toLowerCase());
    return groupByPrice(foodlistDataEn);
  }

  return null;
};

const formatResponse = (response) => {
  const exactum = response.find(({ slug }) => slug === EXACTUM_SLUG);
  const chemicum = response.find(({ slug }) => slug === CHEMICUM_SLUG);

  return {
    exactum: resolveFoodlist(exactum) ?? {},
    chemicum: resolveFoodlist(chemicum) ?? {},
  };
};
