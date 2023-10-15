const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach(button => {
  // Click Event Listener
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
  });

  // Touch Event Listeners
  let touchStartX;
  let touchEndX;

  button.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  button.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // Adjust this value for sensitivity

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left (next slide)
      const nextButton = button.closest("[data-carousel]").querySelector("[data-carousel-button='next']");
      nextButton.click();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right (previous slide)
      const prevButton = button.closest("[data-carousel]").querySelector("[data-carousel-button='prev']");
      prevButton.click();
    }
  }
});
