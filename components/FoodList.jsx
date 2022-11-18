import React, { useState, useEffect, useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import useSWR from "swr";
import Image from "next/image";
import lofiHiphopGirl from "../public/lofihiphop.gif";
import { isWithinInterval, parse } from "date-fns";
import Restaurant from "./Restaurant";
import PropTypes from "prop-types";

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

const RestaurantCarousel = ({ restaurants, ...rest }) => (
  <Carousel
    showThumbs={false}
    showArrows={false}
    infiniteLoop
    autoPlay={restaurants.length > 1}
    showIndicators={restaurants.length > 1}
    interval={10000}
    stopOnHover={false}
    showStatus={false}
    {...rest}
  >
    {restaurants.map(restaurant => (
      <Restaurant key={restaurant.name} restaurant={restaurant} />
    ))}
  </Carousel>
);
RestaurantCarousel.propTypes = {
  restaurants: PropTypes.object
};

const LofiGirl = props => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "5rem",
      marginBottom: "2rem"
    }}
    {...props}
  >
    <Image src={lofiHiphopGirl} layout="fixed" />
  </div>
);

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
