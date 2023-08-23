interface CarouselOptions {
  swipedDistanceThreshold?: number;
  activeColor?: string;
  inactiveColor?: string;
  timeout?: number;
  images: string[];
}
export default class Carousel {
  private swipedDistanceThreshold = 50;
  private activeColor = "#2563eb";
  private inactiveColor = "#ffffff";
  private timeout = 1200;
  private images: string[] = [];

  constructor(options: CarouselOptions) {
    const { swipedDistanceThreshold = 50, activeColor = "#2563eb", inactiveColor = "#ffffff", timeout = 1200, images } = options;

    this.swipedDistanceThreshold = swipedDistanceThreshold;
    this.activeColor = activeColor;
    this.inactiveColor = inactiveColor;
    this.timeout = timeout;

    if (images.length === 0) throw new Error("Multiple images were expected but none were provided");
    this.images = images;
    this.render();
  }

  private render() {
    const body = document.querySelector<HTMLBodyElement>("body");
    if (!body) throw new Error("A 'body' element was expect but none was found");

    body.innerHTML = `
      <div class="slider">
      <!-- Control buttons -->
      <button class="btn btn-next">&#62;</button>
      <button class="btn btn-prev">&#60;</button>

      <!-- Control dots -->
      <div class="dots-container"></div>

      <!-- Autplay btn / play and pause btns -->
      <button aria-label="autoplay" class="autoplay autoplay-start">
        <img src="/play.svg" alt="" />
      </button>
      <button aria-label="autoplay" class="autoplay autoplay-pause hidden">
        <img src="/pause.svg" alt="" />
      </button>
    </div>
  `;

    const slider = document.querySelector<HTMLDivElement>(".slider");
    const dotsContainer = document.querySelector<HTMLDivElement>(".dots-container");
    this.images.forEach((imageSrc, index) => {
      const slide = this.createSlide(imageSrc);
      const dot = this.createDot(index);

      slider?.appendChild(slide);
      dotsContainer?.appendChild(dot);
    });
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

  public set setActiveColor(color: string) {
    this.activeColor = color;
  }

  public set setSwipeDistance(distance: number) {
    this.swipedDistanceThreshold = distance;
  }

  public set setInactiveColor(color: string) {
    this.inactiveColor = color;
  }

  public set setTimeout(timeout: number) {
    this.timeout = timeout;
  }

  public set setImages(images: string[]) {
    this.images = images;
  }

  public get getActiveColor() {
    return this.activeColor;
  }

  public get getSwipeDistance() {
    return this.swipedDistanceThreshold;
  }

  public get getInactiveColor() {
    return this.inactiveColor;
  }

  public get getTimeout() {
    return this.timeout;
  }

  public get getImages() {
    return this.images;
  }
}
