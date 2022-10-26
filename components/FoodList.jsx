import React from "react";
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
const hasValues = obj => obj && Object.entries(obj).length > 0;

export default function FoodList() {
  const { data: chemicum } = useSWR("/api/foodlists/chemicum", fetcher);
  const { data: exactum } = useSWR("/api/foodlists/exactum", fetcher);

  const hour = new Date().getHours();
  const isClosed = hour >= 16; // TODO: check from api response

  const restaurantsWithData = [
    { name: "Chemicum", foodListing: chemicum },
    { name: "Exactum", foodListing: exactum }
  ].filter(({ foodListing }) => hasValues(foodListing));

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
          <List>{parseFoodlisting(restaurant.foodListing)}</List>
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
      <Image src={lofiHiphopGirl} layout="fixed" />
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
      <ListItemText inset={true} primary={name}></ListItemText>
      {meta.allergies.length > 0 &&
        meta.allergies
          .split(" ")
          .map(allergy => <Chip key={`${i}-${allergy}`} label={allergy} />)}
    </ListItem>
  ));
