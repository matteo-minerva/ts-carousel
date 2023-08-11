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

  nextSlide!.addEventListener("click", handleNextBtnClick);
  prevSlide!.addEventListener("click", handlePrevBtnClick);
  dots.forEach((slide) => slide.addEventListener("click", handleDotClick));

  updatePosition(slides, dots, currentSlide);
};
