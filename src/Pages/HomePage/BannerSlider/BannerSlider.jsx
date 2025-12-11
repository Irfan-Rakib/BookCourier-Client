// BannerSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router";
const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      img: "https://cdn.pixabay.com/photo/2015/07/31/11/45/library-869061_1280.jpg",
      title: "Thousands of Books",
      description:
        "Search through a huge collection of academic and story books.",
    },
    {
      id: 2,
      img: "https://cdn.pixabay.com/photo/2017/08/06/22/01/books-2596809_1280.jpg",
      title: "Explore New Knowledge",
      description:
        "Borrow and read the best books delivered from your nearby library.",
    },
    {
      id: 3,
      img: "https://cdn.pixabay.com/photo/2021/03/08/10/10/students-6078679_1280.jpg",
      title: "Read Anytime, Anywhere",
      description: "Get your favorite books delivered directly to your home.",
    },
  ];

  return (
    <section className="w-full mt-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // pause when user hovers
        }}
        spaceBetween={30}
        loop={true}
        speed={700}
        slidesPerView={1}
        className="h-[360px] md:h-[520px] rounded-xl overflow-hidden"
        aria-label="Book highlights carousel"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <img
                src={slide.img}
                className="w-full h-full object-cover"
                alt={slide.title}
                loading="lazy"
              />

              {/* Overlay */}

              <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex 
    items-end md:items-center justify-start p-5 md:px-12"
              >
                <div className="text-white max-w-xl">
                  <h1 className="text-2xl md:text-5xl font-bold mb-3 text-secondary leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-lg font-semibold text-accent mb-6 opacity-95">
                    {slide.description}
                  </p>

                  <Link
                    to="/books"
                    className="btn btn-primary hover:btn-secondary px-5 py-2"
                  >
                    View All Books
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
