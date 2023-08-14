interface CarouselOptions {
  swipedDistanceThreshold?: number;
  activeColor?: string;
  inactiveColor?: string;
  timeout?: number;
  images: string[];
}
export default class Carousel {
  swipedDistanceThreshold = 50;
  activeColor = "#2563eb";
  inactiveColor = "#ffffff";
  timeout = 1200;
  images: string[] = [];

  constructor(options: CarouselOptions) {
    const { swipedDistanceThreshold = 50, activeColor = "#2563eb", inactiveColor = "#ffffff", timeout = 1200, images } = options;

    this.swipedDistanceThreshold = swipedDistanceThreshold;
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
    this.timeout = timeout;

    if (images.length === 0) this.handleNoImages();
    this.images = images;
    this.render();
  }

  private render(): void {
    const slider = document.querySelector<HTMLDivElement>(".slider");
    const dotsContainer = document.querySelector<HTMLDivElement>(".dots-container");

    this.images.forEach((imageSrc, index) => {
      const slide = this.createSlide(imageSrc);
      const dot = this.createDot(index);

      slider?.appendChild(slide);
      dotsContainer?.appendChild(dot);
    });
  }

  private handleNoImages(): void {
    const slider = document.querySelector<HTMLDivElement>(".slider");
    slider?.remove();
    throw new Error("Multiple images were expected but none were provided");
  }

  private createSlide(imageSrc: string): HTMLDivElement {
    const slide = document.createElement("div");
    const image = document.createElement("img");

    slide.classList.add("slide");
    image.setAttribute("alt", "");
    image.setAttribute("src", imageSrc);

    slide.appendChild(image);
    return slide;
  }

  private createDot(index: number): HTMLButtonElement {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    dot.setAttribute("data-slide", String(index));
    return dot;
  }

  private updatePosition(slides: HTMLDivElement[], dots: HTMLDivElement[], currentSlideIndex: number) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlideIndex)}%)`;
    });

    dots.forEach((dot, index) => (dot.style.background = index === currentSlideIndex ? this.activeColor : this.inactiveColor));
  }

  private handleDotClick(slides: HTMLDivElement[], currentSlide: number, dots: HTMLDivElement[], event: MouseEvent) {
    const dataAttribute = (event.currentTarget as HTMLButtonElement).getAttribute("data-slide");
    const newSlide = dataAttribute ? +dataAttribute : currentSlide;
    this.updatePosition(slides, dots, newSlide);
  }

  public init() {
    const slides = Array.from(document.querySelectorAll<HTMLDivElement>(".slide"));
    const dots = Array.from(document.querySelectorAll<HTMLDivElement>(".dot"));
    const nextSlideBtn = document.querySelector<HTMLButtonElement>(".btn-next");
    const prevSlideBtn = document.querySelector<HTMLButtonElement>(".btn-prev");
    const autoplayStartBtn = document.querySelector<HTMLButtonElement>(".autoplay-start");
    const autoplayPauseBtn = document.querySelector<HTMLButtonElement>(".autoplay-pause");

    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoplayInterval: number | undefined = undefined;

    const handleNextSlideClick = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      this.updatePosition(slides, dots, currentSlide);
    };

    const handlePrevSlideClick = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      this.updatePosition(slides, dots, currentSlide);
    };

    const handleSwipeStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    const handleSwipeMove = (event: TouchEvent) => {
      touchEndX = event.touches[0].clientX;
    };

    const handleSwipeEnd = () => {
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) <= this.swipedDistanceThreshold) return;

      currentSlide = swipeDistance > 0 ? (currentSlide - 1 + slides.length) % slides.length : (currentSlide + 1) % slides.length;

      this.updatePosition(slides, dots, currentSlide);
    };

    const handleAutoplayStart = () => {
      autoplayStartBtn?.classList.toggle("hidden");
      autoplayPauseBtn?.classList.toggle("hidden");
      handleNextSlideClick();

      autoplayInterval = window.setInterval(() => {
        handleNextSlideClick();
      }, this.timeout);
    };

    const handleAutoplayPause = () => {
      autoplayStartBtn?.classList.toggle("hidden");
      autoplayPauseBtn?.classList.toggle("hidden");
      return clearInterval(autoplayInterval);
    };

    nextSlideBtn?.addEventListener("click", handleNextSlideClick);
    prevSlideBtn?.addEventListener("click", handlePrevSlideClick);

    dots.forEach((dot) => dot.addEventListener("click", (event) => this.handleDotClick(slides, currentSlide, dots, event)));
    slides.forEach((slide) => slide.addEventListener("touchstart", handleSwipeStart));
    slides.forEach((slide) => slide.addEventListener("touchmove", handleSwipeMove));
    slides.forEach((slide) => slide.addEventListener("touchend", handleSwipeEnd));

    autoplayStartBtn?.addEventListener("click", handleAutoplayStart);
    autoplayPauseBtn?.addEventListener("click", handleAutoplayPause);

    this.updatePosition(slides, dots, currentSlide);
  }
}
