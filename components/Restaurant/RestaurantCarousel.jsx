import React from "react";
import { Carousel } from "react-responsive-carousel";
import Restaurant from "./Restaurant";
import PropTypes from "prop-types";

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

export default RestaurantCarousel;
