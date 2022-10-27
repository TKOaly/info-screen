import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import useSWR from "swr";
import Image from "next/image";
import lofiHiphopGirl from "../public/lofihiphop.gif";
import {
  differenceInMilliseconds,
  isBefore,
  isWithinInterval,
  max,
  parse,
  isValid
} from "date-fns";
import Restaurant from "./Restaurant";

const fetcher = url => fetch(url).then(res => res.json());
const swrOptions = {
  refreshInterval: 60 * 60 * 1000 // 1 hour
};
const hasValues = obj => obj && Object.entries(obj).length > 0;

export default function FoodList() {
  // TODO: Reduce code duplication
  const { data: chemicum, isLoading: chemLoading } = useSWR(
    "/api/foodlists/chemicum",
    fetcher,
    swrOptions
  );
  const { data: exactum, isLoading: exaLoading } = useSWR(
    "/api/foodlists/exactum",
    fetcher,
    swrOptions
  );
  const { data: kaivopiha, isLoading: kaivoLoading } = useSWR(
    "/api/foodlists/kaivopiha",
    fetcher,
    swrOptions
  );

  // Update client when all Unicafes loaded to kickstart carousel
  const [, setLoading] = useState(
    [chemLoading, exaLoading, kaivoLoading].some(Boolean)
  );
  useEffect(() => {
    setLoading([chemLoading, exaLoading, kaivoLoading].some(Boolean));
  }, [chemLoading, exaLoading, kaivoLoading]);

  const restaurantsWithData = [chemicum, exactum, kaivopiha].filter(
    restaurant =>
      restaurant && (hasValues(restaurant.groups) || restaurant.error)
  );

  const now = new Date();

  const parseHour = str => parse(str, "HH:mm", now);

  // Parse closing time as the latest any of our Unicafes is open
  const closingTime = max(
    restaurantsWithData.map(({ lunchHours }) => {
      if (!lunchHours) return;
      return parseHour(lunchHours.split("–")[1]);
    })
  );

  // Opening time is hard-coded to be reasonably in the morning
  const openingTime = parseHour("08:00");

  // Show food even if opening time or closing time could not be deduced
  const [showFood, setShowFood] = useState(
    isValid(openingTime) &&
      isValid(closingTime) &&
      isWithinInterval(now, {
        start: openingTime,
        end: closingTime
      })
  );

  // These shouldn't need to care for time periods longer than 24 hours
  // as the API will return a different response for the next day's values

  // Show food when opening time comes
  useEffect(() => {
    if (!showFood && openingTime && isBefore(now, openingTime)) {
      const timeout = setTimeout(() => {
        setShowFood(true);
      }, differenceInMilliseconds(openingTime, now));
      return () => clearTimeout(timeout);
    }
  }, [showFood, openingTime, now]);

  // Hide food when closing time comes
  useEffect(() => {
    if (showFood && closingTime && isBefore(now, closingTime)) {
      const timeout = setTimeout(() => {
        setShowFood(false);
      }, differenceInMilliseconds(closingTime, now));
      return () => clearTimeout(timeout);
    }
  }, [showFood, closingTime, now]);

  const foodCarousel = (
    <Carousel
      showThumbs={false}
      showArrows={false}
      infiniteLoop={true}
      autoPlay={true}
      showIndicators={restaurantsWithData.length > 1}
      showStatus={false}
      interval={10000}
      stopOnHover={false}
    >
      {restaurantsWithData.map(restaurant => (
        <Restaurant key={restaurant.name} restaurant={restaurant} />
      ))}
    </Carousel>
  );

  const foodClosed = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5rem",
        marginBottom: "2rem"
      }}
    >
      <Image
        src={lofiHiphopGirl}
        layout="fixed"
        onClick={() => {
          setShowFood(true);
        }}
      />
    </div>
  );

  return <div>{showFood ? foodCarousel : foodClosed}</div>;
}
