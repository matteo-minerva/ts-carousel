import Carousel from "./carousel";

describe("carousel", () => {
  afterEach(() => {
    jest.clearAllTimers();

    const body = document.querySelector<HTMLBodyElement>("body");
    body!.innerHTML = "";
  });

  it("should create an instance with default options", () => {
    const carousel = new Carousel({ images: ["image1.jgp", "image2.jpg"] });

    expect(carousel.getSwipeDistance).toBe(50);
    expect(carousel.getActiveColor).toBe("#2563eb");
    expect(carousel.getInactiveColor).toBe("#ffffff");
    expect(carousel.getTimeout).toBe(1200);
  });

  it("should create an instance with provided options", () => {
    const options = {
      swipedDistanceThreshold: 60,
      activeColor: "#ff0000",
      inactiveColor: "#00ff00",
      timeout: 2000,
      images: ["image1.jgp", "image2.jpg"],
    };

    const carousel = new Carousel(options);

    expect(carousel.getSwipeDistance).toBe(options.swipedDistanceThreshold);
    expect(carousel.getActiveColor).toBe(options.activeColor);
    expect(carousel.getInactiveColor).toBe(options.inactiveColor);
    expect(carousel.getTimeout).toBe(options.timeout);
    expect(carousel.getImages).toBe(options.images);
  });

  it("should throw an error when no images are provided", () => {
    const createCarouselWithoutImages = () => new Carousel({ images: [] });

    expect(createCarouselWithoutImages).toThrowError("Multiple images were expected but none were provided");
  });

  it("should render slides and dots based on provided images", () => {
    renderDOM();

    const carousel = new Carousel({ images: ["image1.jgp", "image2.jpg"] });
    carousel.init();

    const slideElements = document.querySelectorAll<HTMLDivElement>(".slide");
    const dotElements = document.querySelectorAll<HTMLDivElement>(".dot");

    expect(slideElements.length).toBe(["image1.jgp", "image2.jpg"].length);
    expect(dotElements.length).toBe(["image1.jgp", "image2.jpg"].length);
  });

  it("should set classes, attributes, and content correctly for slides and dots", () => {
    renderDOM();

    const carousel = new Carousel({ images: ["image1.jgp", "image2.jpg"] });
    carousel.init();

    const slideElements = document.querySelectorAll(".slide");
    const dotElements = document.querySelectorAll(".dot");

    slideElements.forEach((slide, index) => {
      const image = slide.querySelector("img");

      expect(slide.classList.contains("slide")).toBe(true);
      expect(image).toBeTruthy();
      expect(image?.getAttribute("src")).toBe(["image1.jgp", "image2.jpg"][index]);
    });

    dotElements.forEach((dot, index) => {
      expect(dot.classList.contains("dot")).toBe(true);
      expect(dot.getAttribute("data-slide")).toBe(String(index));
    });
  });

  it("should render the correct number of slides and dots", () => {
    renderDOM();

    const options = { images: ["image1.jgp", "image2.jpg"] };

    const carousel = new Carousel(options);
    carousel.init();

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    expect(slides.length).toBe(options.images.length);
    expect(dots.length).toBe(options.images.length);
  });

  it("should implement infinite loop", () => {
    renderDOM();

    const carousel = new Carousel({ images: ["image1.jgp", "image2.jpg"] });
    carousel.init();

    const firstSlide = document.querySelector<HTMLDivElement>(".slide");
    const nextBtn = document.querySelector<HTMLButtonElement>(".btn-next");
    const prevBtn = document.querySelector<HTMLButtonElement>(".btn-prev");
    expect(firstSlide?.style.transform).toBe("translateX(0%)");

    // Reaches the image 2/2
    nextBtn?.click();
    expect(firstSlide?.style.transform).toBe("translateX(-100%)");

    // Goes back go image 1/2
    nextBtn?.click();
    expect(firstSlide?.style.transform).toBe("translateX(0%)");

    // It work on the other way around
    prevBtn?.click();
    expect(firstSlide?.style.transform).toBe("translateX(-100%)");
  });

  it("should implement autoplay", () => {
    jest.useFakeTimers();
    renderDOM();

    const carousel = new Carousel({ images: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"] });
    carousel.init();

    const initialSlide = document.querySelector<HTMLDivElement>(".slide");
    expect(initialSlide?.style.transform).toBe("translateX(0%)");
    const autoplayStartBtn = document.querySelector<HTMLButtonElement>(".autoplay-start");

    autoplayStartBtn?.click();

    jest.advanceTimersByTime(carousel.getTimeout);

    const newSlide = document.querySelector<HTMLDivElement>(".slide");
    expect(newSlide?.style.transform).not.toBe("translateX(0%)");
  });
});

function renderDOM() {
  document.body.innerHTML = `
  <div class="slider">
    <button class="btn btn-next">&#62;</button>
    <button class="btn btn-prev">&#60;</button>

    <div class="dots-container"></div>

    <button aria-label="autoplay" class="autoplay autoplay-start">
      <img src="/play.svg" alt="" />
    </button>
    <button aria-label="autoplay" class="autoplay autoplay-pause hidden">
      <img src="/pause.svg" alt="" />
    </button>
  </div>  
`;
}
