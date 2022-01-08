import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(trending);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line
  }, [currency]);

  const items = trending.map((coin) => {
    return (
      <Link
        className={classes.carouselItem}
        key={coin.id}
        to={`/coins/${coin.id}`}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
      </Link>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 3 },
    1024: { items: 4 },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={3000}
        animationDuration={1000}
        disableDotsControls={true}
        responsive={responsive}
        autoPlay={true}
        items={items}
      />
    </div>
  );
};

export default Carousel;
