const SWIPE_DISTANCE_THRESHOLD = 50;

const updatePosition = (slides: HTMLDivElement[], dots: HTMLDivElement[], currentSlideIndex: number) => {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlideIndex)}%)`;
  });

  dots.forEach((dot, index) => (dot.style.background = index === currentSlideIndex ? "#2563eb" : "#fff"));
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

  const handleNextBtnClick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updatePosition(slides, dots, currentSlide);
  };

  const handlePrevBtnClick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updatePosition(slides, dots, currentSlide);
  };

  const handleDotClick = (event: MouseEvent) => {
    const dataAttribute = (event.currentTarget as HTMLButtonElement).getAttribute("data-slide");
    currentSlide = dataAttribute ? +dataAttribute : currentSlide;
    updatePosition(slides, dots, currentSlide);
  };

  const handleSwipeStart = (event: TouchEvent) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleSwipeEnd = (event: TouchEvent) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) <= SWIPE_DISTANCE_THRESHOLD) return;

    if (swipeDistance > 0) currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    else currentSlide = (currentSlide + 1) % slides.length;

    updatePosition(slides, dots, currentSlide);
  };

  nextSlide!.addEventListener("click", handleNextBtnClick);
  prevSlide!.addEventListener("click", handlePrevBtnClick);

  dots.forEach((dot) => dot.addEventListener("click", handleDotClick));
  slides.forEach((slide) => slide.addEventListener("touchstart", handleSwipeStart));
  slides.forEach((slide) => slide.addEventListener("touchend", handleSwipeEnd));

  updatePosition(slides, dots, currentSlide);
};
