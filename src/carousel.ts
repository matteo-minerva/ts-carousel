function updatePosition(slides: HTMLDivElement[], currentSlide: number) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
}

export const init = () => {
  const slidesNodeList = document.querySelectorAll<HTMLDivElement>(".slide");
  const slides = Array.from(slidesNodeList);
  const nextSlide = document.querySelector<HTMLDivElement>(".btn-next");
  const prevSlide = document.querySelector<HTMLDivElement>(".btn-prev");

  let currentSlide = 0;

  const handleNextBtnClick = () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updatePosition(slides, currentSlide);
  };

  const handlePrevBtnClick = () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updatePosition(slides, currentSlide);
  };

  nextSlide!.addEventListener("click", handleNextBtnClick);
  prevSlide!.addEventListener("click", handlePrevBtnClick);

  updatePosition(slides, currentSlide);
};
