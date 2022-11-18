import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { isWithinInterval, parse } from "date-fns";
import RestaurantCarousel from "./Restaurant/RestaurantCarousel";
import LofiGirl from "./LofiGirl";

const fetcher = url => fetch(url).then(res => res.json());
const swrOptions = {
  refreshInterval: 60 * 60 * 1000 // 1 hour
};
const hasValues = obj => obj && Object.entries(obj).length > 0;

const isRestaurantOpen = restaurant => {
  if (!restaurant.lunchHours) {
    // Assume it is open if we cannot parse lunch hours
    return true;
  }

  const now = new Date();
  const parseHour = str => parse(str, "HH:mm", now);

  const closingHour = parseHour(restaurant.lunchHours.split("–")[1]);
  return isWithinInterval(now, { start: parseHour("08:00"), end: closingHour });
};

export default function FoodList() {
  // TODO: Reduce code duplication
  const chemicum = useSWR("/api/foodlists/chemicum", fetcher, swrOptions);
  const exactum = useSWR("/api/foodlists/exactum", fetcher, swrOptions);
  const kaivopiha = useSWR("/api/foodlists/kaivopiha", fetcher, swrOptions);

  const requests = [chemicum, exactum, kaivopiha];

  // Data is ready once none of these are loading or validating
  const isReady = () =>
    !requests.map(swr => !swr.isLoading && !swr.isValidating).some(Boolean);

  // Update client when all Unicafes loaded to kickstart carousel
  const [, setReady] = useState(isReady());
  useEffect(() => {
    setReady(isReady());
  }, requests);

  const restaurants = requests.map(request => request.data);

  const restaurantsWithData = restaurants.filter(
    restaurant =>
      restaurant && (hasValues(restaurant.groups) || restaurant.error)
  );

  const [showAll, setShowAll] = useState(false);
  const restaurantsToShow = useMemo(() => {
    if (showAll) return restaurantsWithData;
    return restaurantsWithData.filter(isRestaurantOpen);
  }, [showAll, restaurants]);

  return (
    <div>
      {restaurantsToShow.length > 0 ? (
        <RestaurantCarousel
          restaurants={restaurantsToShow}
          onClickItem={() => setShowAll(current => !current)}
        />
      ) : (
        <LofiGirl onClick={() => setShowAll(true)} />
      )}
    </div>
  );
}
