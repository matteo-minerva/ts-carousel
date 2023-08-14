import Carousel from "./carousel";

const IMAGES = ["https://images.unsplash.com/photo-1545569341-9eb8b30979d9", "https://images.unsplash.com/photo-1528164344705-47542687000d"];

describe("carousel", () => {
  it("should create an instance with default options", () => {
    const carousel = new Carousel({ images: IMAGES });

    expect(carousel.swipedDistanceThreshold).toBe(50);
    expect(carousel.activeColor).toBe("#2563eb");
    expect(carousel.inactiveColor).toBe("#ffffff");
    expect(carousel.timeout).toBe(1200);
  });

  it("should create an instance with provided options", () => {
    const options = {
      swipedDistanceThreshold: 60,
      activeColor: "#ff0000",
      inactiveColor: "#00ff00",
      timeout: 2000,
      images: IMAGES,
    };

    const carousel = new Carousel(options);

    expect(carousel.swipedDistanceThreshold).toBe(options.swipedDistanceThreshold);
    expect(carousel.activeColor).toBe(options.activeColor);
    expect(carousel.inactiveColor).toBe(options.inactiveColor);
    expect(carousel.timeout).toBe(options.timeout);
    expect(carousel.images).toBe(options.images);
  });

  it("should throw an error when no images are provided", () => {
    const createCarouselWithoutImages = () => new Carousel({ images: [] });

    expect(createCarouselWithoutImages).toThrowError("Multiple images were expected but none were provided");
  });

  it("should render slides and dots based on provided images", () => {
    const slider = document.createElement("div");
    const dotsContainer = document.createElement("div");

    slider.classList.add("slider");
    dotsContainer.classList.add("dots-container");
    document.body.appendChild(slider);
    document.body.appendChild(dotsContainer);

    const carousel = new Carousel({ images: IMAGES });
    carousel.init();

    const slideElements = document.querySelectorAll<HTMLDivElement>(".slide");
    const dotElements = document.querySelectorAll<HTMLDivElement>(".dot");

    expect(slideElements.length).toBe(IMAGES.length);
    expect(dotElements.length).toBe(IMAGES.length);

    document.body.removeChild(slider);
    document.body.removeChild(dotsContainer);
  });
});
