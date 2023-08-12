const SWIPE_DISTANCE_THRESHOLD = 50;
const ACTIVE_DOT_COLOR = "#2563eb";
const INACTIVE_DOT_COLOR = "#fff";
const TIMEOUT_VALUE = 1500;
const SLIDES_IMAGES = [
  "https://source.unsplash.com/random?japan+temples",
  "https://source.unsplash.com/random?food,ramen",
  "https://source.unsplash.com/random?tokyo",
  "https://source.unsplash.com/random?japan,cherry",
];

const updatePosition = (slides: HTMLDivElement[], dots: HTMLDivElement[], currentSlideIndex: number) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlideIndex)}%)`;
  });

  dots.forEach((dot, index) => (dot.style.background = index === currentSlideIndex ? ACTIVE_DOT_COLOR : INACTIVE_DOT_COLOR));
};

const handleDotClick = (slides: HTMLDivElement[], currentSlide: number, dots: HTMLDivElement[], event: MouseEvent) => {
  const dataAttribute = (event.currentTarget as HTMLButtonElement).getAttribute("data-slide");
  const newSlide = dataAttribute ? +dataAttribute : currentSlide;
  updatePosition(slides, dots, newSlide);
};

export const render = () => {
  const slider = document.querySelector<HTMLDivElement>(".slider");
  const dotsContainer = document.querySelector<HTMLDivElement>(".dots-container");

  SLIDES_IMAGES.forEach((imageSrc, index) => {
    // Render slides
    const slide = document.createElement("div");
    const image = document.createElement("img");

    slide.setAttribute("class", "slide");
    image.setAttribute("alt", "");
    image.setAttribute("src", imageSrc);

    slide.appendChild(image);
    slider!.appendChild(slide);

    // Render dots
    const dot = document.createElement("button");
    dot.setAttribute("class", "dot");
    dot.setAttribute("data-slide", String(index));
    dotsContainer!.appendChild(dot);
  });
};

export const init = () => {
  const slidesNodeList = document.querySelectorAll<HTMLDivElement>(".slide");
  const slides = Array.from(slidesNodeList);
  const nextSlideBtn = document.querySelector<HTMLButtonElement>(".btn-next");
  const prevSlideBtn = document.querySelector<HTMLButtonElement>(".btn-prev");
  const dotsNodeList = document.querySelectorAll<HTMLDivElement>(".dot");
  const dots = Array.from(dotsNodeList);
  const autoplayStartBtn = document.querySelector<HTMLButtonElement>(".autoplay-start");
  const autoplayPauseBtn = document.querySelector<HTMLButtonElement>(".autoplay-pause");

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;
  let autoplayInterval: number | undefined = undefined;

  const handleNextSlideClick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updatePosition(slides, dots, currentSlide);
  };

  const handlePrevSlideClick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updatePosition(slides, dots, currentSlide);
  };

  const handleSwipeStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleSwipeMove = (event: TouchEvent) => {
    touchEndX = event.touches[0].clientX;
  };

  const handleSwipeEnd = () => {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) <= SWIPE_DISTANCE_THRESHOLD) return;

    currentSlide = swipeDistance > 0 ? (currentSlide - 1 + slides.length) % slides.length : (currentSlide + 1) % slides.length;

    updatePosition(slides, dots, currentSlide);
  };

  const handleAutoplayStart = () => {
    autoplayStartBtn!.classList.toggle("hidden");
    autoplayPauseBtn!.classList.toggle("hidden");
    handleNextSlideClick();

    autoplayInterval = setInterval(() => {
      handleNextSlideClick();
    }, TIMEOUT_VALUE);
  };

  const handleAutoplayPause = () => {
    autoplayStartBtn!.classList.toggle("hidden");
    autoplayPauseBtn!.classList.toggle("hidden");
    return clearInterval(autoplayInterval);
  };

  nextSlideBtn!.addEventListener("click", handleNextSlideClick);
  prevSlideBtn!.addEventListener("click", handlePrevSlideClick);

  dots.forEach((dot) => dot.addEventListener("click", (event) => handleDotClick(slides, currentSlide, dots, event)));
  slides.forEach((slide) => slide.addEventListener("touchstart", handleSwipeStart));
  slides.forEach((slide) => slide.addEventListener("touchmove", handleSwipeMove));
  slides.forEach((slide) => slide.addEventListener("touchend", handleSwipeEnd));

  autoplayStartBtn!.addEventListener("click", handleAutoplayStart);
  autoplayPauseBtn!.addEventListener("click", handleAutoplayPause);

  updatePosition(slides, dots, currentSlide);
};
