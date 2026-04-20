document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 576) {
    // $(".footer-title").removeAttr("data-bs-toggle");
    $(".footer-widget .collapse").removeClass("show");
  }
  else {
    $(".footer-title").removeAttr("data-bs-toggle");
  }
});

$(document).ready(function () {
  var localFav = $('#localFavorite');
  localFav.owlCarousel({
    loop: true,
    margin: 15,
    responsiveClass: true,
    autoplay: true,
    items: 4,
    autoplayTimeout: 5000,
    dots: false, nav: false,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
      0: {
        // items: 1,
        // stagePadding: 15,
        // margin: 10,
        // loop: false,
        // autoplay: false
         items: 1,
        stagePadding: 40,
        margin: 10, 
        loop: false,
        autoplay: false
      },
      576: {
        items: 2,
        stagePadding: 25,
        margin: 15,
        loop: false
      },
      768: {
        items: 2,
        stagePadding: 35,
        margin: 15,
        loop: false
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1400: {
        items: 4
      }
    }
  });

  $("#localFavPrev").on("click", function () {
    localFav.trigger('prev.owl.carousel');
  });
  $("#localFavNext").on("click", function () {
    localFav.trigger('next.owl.carousel');
  });
});
$(document).ready(function () {

  var bestView = $('#bestViewSl');
  bestView.owlCarousel({
    loop: true,
    margin: 15,
    responsiveClass: true,
    autoplay: true,
    items: 4,
    autoplayTimeout: 5000,
    dots: false, nav: false,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
      0: {
       items: 1,
        stagePadding: 40,
        margin: 10, 
        loop: false,
        autoplay: false
      },
      576: {
        items: 2,
        stagePadding: 25,
        margin: 15,
        loop: false
      },
      768: {
        items: 2,
        stagePadding: 35,
        margin: 15,
        loop: false
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1400: {
        items: 4
      }
    }
  });

  $("#bestViewPrev").on("click", function () {
    bestView.trigger('prev.owl.carousel');
  });
  $("#bestViewNext").on("click", function () {
    bestView.trigger('next.owl.carousel');
  });
});
$(document).ready(function () {
  var activitySlider = $('#activitySl');
  activitySlider.owlCarousel({
    center: true,
    items: 6,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    margin: 15, dots: false, nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        center: true,
        margin: 5
      },
      576: {
        items: 2,
        center: true,
        margin: 10
      },
      768: {
        items: 3,
      },
      992: {
        items: 4
      },
      1200: {
        items: 4
      },
      1300: {
        items: 6
      },
      1400: {
        items: 6
      }
    }
  })
  $("#activitySLPrev").on("click", function () {
    activitySlider.trigger('prev.owl.carousel');
  });
  $("#activitySLNext").on("click", function () {
    activitySlider.trigger('next.owl.carousel');
  });
});
$(document).ready(function () {
  var followFellow1 = $('#followSl-1');
  var followFellow2 = $('#followSl-2');
  //         followFellow1.owlCarousel({
  //             center: true,
  // items:3,
  // loop:true,
  // margin:10,  dots: false, nav: false,
  //         })
  //     $('#activitySl').slick({
  //   centerMode: true,
  //   centerPadding: '10%',
  //   slidesToShow: 5, 

  // })
  followFellow1.slick({
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 3,
    dots: false,
    arrows: false,
    cssEase: 'linear',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 15000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: '10px',
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerPadding: '50px',
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        }
      }
    ]
  })
  followFellow2.slick({
    centerMode: true,
    centerPadding: '80px',
    slidesToShow: 3,
    dots: false,
    arrows: false,
    cssEase: 'linear',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 15000,
    pauseOnHover: true,
    pauseOnFocus: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: '10px',
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerPadding: '50px',
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        }
      }
    ]

  })

  var advnSl = $('#adventureSider');
  advnSl.owlCarousel({
    dots: false,
    nav: false,
    //  autoplayHoverPause: true,
    autoplayTimeout: 4000,
    autoplay: true,
    items: 4,
    loop: false, lazyLoad: true,
    margin: 15,
    responsiveClass: true,
    stagePadding: 100,
    responsive: {
      0: {
        items: 2,
        stagePadding: 15,
        margin: 10,
      },
      576: {
        items: 2,
        stagePadding: 35,
      },
      768: {
        items: 3,
        stagePadding: 35,
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      },
      1300: {
        items: 4
      },
      1400: {
        items: 4
      }
    }
  })

   var suggestedMember = $('#suggestedMembers');
  suggestedMember.owlCarousel({
    dots: false,
    nav: false,
    //  autoplayHoverPause: true,
    autoplayTimeout: 4000,
    autoplay: false,
    items: 3,
    loop: false, lazyLoad: true,
    margin: 10,
    responsiveClass: true,
    stagePadding: 60, 
    responsive: {
      0: {
        items: 1,
        stagePadding: 15,
        margin: 10,
      },
      576: {
        items: 2,
        stagePadding: 35,
      },
      768: {
        items: 3,
        stagePadding: 35,
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1300: {
        items: 3
      },
      1400: {
        items: 3
      }
    }
  })


});

 // START: 09 GLightbox

$(document).ready(function() {
    Fancybox.bind("[data-fancybox]", {});  
    Fancybox.bind('[data-fancybox="MoreImages"]', {});
    Fancybox.bind('[data-fancybox="mapImg"]', {});
    Fancybox.bind('[data-fancybox="gallery"]', {});
    Fancybox.bind('[data-fancybox="reviewImages"]', {});
});
    // END: GLightbox
  document.addEventListener("DOMContentLoaded", function () {
        if (window.innerWidth > 992) {
            $(".header .dropdown-toggle").removeAttr("data-bs-toggle");
            $(".header .dropdown").hover(function () {
                $("dropdown-toggle").toggleClass("show");
                $(this).find(".dropdown-menu").toggleClass("show");
            });
            $(".header .dropdown").mouseleave(function () {
                $(".dropdown-menu").removeClass("show"); 
            });
            $(".header .dropend").hover(function () {
                $(".header .dropdown-toggle").toggleClass("show");
                $(this).find(".dropdown-menu:first").toggleClass("show");
                $(this).find(".dropdown-menu:first").attr("data-bs-popper", "none");
            });
        }
    });
    