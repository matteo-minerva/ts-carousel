import Carousel from "./carousel";

describe("carousel", () => {
  it("should create an instance with provided options", () => {
    const options = {
      swipedDistanceThreshold: 60,
      activeColor: "#ff0000",
      inactiveColor: "#00ff00",
      timeout: 2000,
      images: ["image1.jpg", "image2.jpg"],
    };

    const carousel = new Carousel(options);

    expect(carousel.swipedDistanceThreshold).toBe(options.swipedDistanceThreshold);
    expect(carousel.activeColor).toBe(options.activeColor);
    expect(carousel.inactiveColor).toBe(options.inactiveColor);
    expect(carousel.timeout).toBe(options.timeout);
    expect(carousel.images).toBe(options.images);
  });
});
