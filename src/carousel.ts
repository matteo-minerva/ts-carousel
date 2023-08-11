const SWIPE_DISTANCE_THRESHOLD = 50;
const ACTIVE_DOT_COLOR = "#2563eb";
const INACTIVE_DOT_COLOR = "#fff";

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

export const init = () => {
  const slidesNodeList = document.querySelectorAll<HTMLDivElement>(".slide");
  const slides = Array.from(slidesNodeList);
  const nextSlide = document.querySelector<HTMLDivElement>(".btn-next");
  const prevSlide = document.querySelector<HTMLDivElement>(".btn-prev");
  const dotsNodeList = document.querySelectorAll<HTMLDivElement>(".dot");
  const dots = Array.from(dotsNodeList);

  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;

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

  nextSlide!.addEventListener("click", handleNextSlideClick);
  prevSlide!.addEventListener("click", handlePrevSlideClick);

  dots.forEach((dot) => dot.addEventListener("click", (event) => handleDotClick(slides, currentSlide, dots, event)));
  slides.forEach((slide) => slide.addEventListener("touchstart", handleSwipeStart));
  slides.forEach((slide) => slide.addEventListener("touchmove", handleSwipeMove));
  slides.forEach((slide) => slide.addEventListener("touchend", handleSwipeEnd));

  updatePosition(slides, dots, currentSlide);
};
