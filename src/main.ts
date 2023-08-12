import Carousel from "./carousel";

const carousel = new Carousel({
  images: [
    "https://source.unsplash.com/random?japan+temples",
    "https://source.unsplash.com/random?food,ramen",
    "https://source.unsplash.com/random?tokyo",
    "https://source.unsplash.com/random?japan,cherry",
  ],
});
carousel.init();
