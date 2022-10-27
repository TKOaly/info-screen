import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import {
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Chip
} from "@mui/material";
import useSWR from "swr";
import {
  fetchChecmicumFoodlist,
  fetchExactumFoodlist
} from "services/unicafeFoodListService";
import Image from "next/image";
import lofiHiphopGirl from "../public/lofihiphop.gif";
import { Box } from "@mui/system";
import { max, min, parse } from "date-fns";

export async function getStaticProps() {
  const chemicum = await fetchChecmicumFoodlist();
  const exactum = await fetchExactumFoodlist();

  return {
    props: {
      fallback: {
        "/api/foodlists/chemicum": chemicum,
        "/api/foodlists/exactum": exactum
      }
    }
  };
}

const fetcher = url => fetch(url).then(res => res.json());
const swrOptions = {
  refreshInterval: 60 * 60 * 1000 // 1 hour
};
const hasValues = obj => obj && Object.entries(obj).length > 0;

export default function FoodList() {
  const { data: chemicum } = useSWR(
    "/api/foodlists/chemicum",
    fetcher,
    swrOptions
  );
  const { data: exactum } = useSWR(
    "/api/foodlists/exactum",
    fetcher,
    swrOptions
  );

  const restaurantsWithData = [
    { name: "Unicafé Chemicum", ...chemicum },
    { name: "Unicafé Exactum", ...exactum }
  ].filter(({ groups }) => hasValues(groups));

  const parseHour = str => parse(str, "HH:mm", new Date("1970-01-01"));
  const hours = restaurantsWithData.map(({ lunchHours }) => {
    if (!lunchHours) return;
    return lunchHours.split("–").map(parseHour);
  });

  const firstHourOpen = min(hours.map(a => a[0])).getHours();
  const lastHourOpen = max(hours.map(a => a[1])).getHours();

  const hour = new Date().getHours();
  const [isClosed, setClosed] = useState(
    hour < firstHourOpen || hour > lastHourOpen
  );

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
        <div key={restaurant.name}>
          <Typography variant="h5">{restaurant.name}</Typography>
          {restaurant.lunchHours && (
            <Typography variant="subtitle1">{restaurant.lunchHours}</Typography>
          )}
          <List sx={{ width: "max-content", marginInline: "auto" }}>
            {parseFoodlisting(restaurant.groups)}
          </List>
        </div>
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
          setClosed(false);
        }}
      />
    </div>
  );

  return <div>{isClosed ? foodClosed : foodCarousel}</div>;
}

const parseFoodlisting = foodlist => {
  const keys = Object.keys(foodlist);
  return keys.map((key, i) => {
    const foodItems = foodlist[key];
    return (
      <React.Fragment key={i}>
        <ListSubheader>{key}</ListSubheader>
        {mapFooditems(foodItems)}
      </React.Fragment>
    );
  });
};

const mapFooditems = foodItems =>
  foodItems.map(({ name, meta }, i) => (
    <ListItem key={i}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemText primary={name} />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            maxWidth: "40ch"
          }}
        >
          {toChips(meta.diet, { color: "secondary" })}
          {toChips(meta.allergies)}
        </Box>
      </Box>
    </ListItem>
  ));

const toChips = (array, chipProps) => {
  if (array.length === 0) return null;

  return (
    <>
      {array.map(chip => (
        <Chip key={chip} label={chip} {...chipProps} />
      ))}
    </>
  );
};
