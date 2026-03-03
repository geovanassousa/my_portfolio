document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  let index = 0;

  carousel.querySelector(".next").addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  });

  carousel.querySelector(".prev").addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add("active");
  });
});