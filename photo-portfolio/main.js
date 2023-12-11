// SWIPER JS (gallery section)
var swiper = new Swiper(".swipe", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        600: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        1020: {
            slidesPerView: 3,
            spaceBetween: 60
        }
    }
  });

  const nav = document.querySelector('.nav__links');
  const navBtnOpen = document.querySelector('#nav__btn-open');
  const navBtnClose = document.querySelector('#nav__btn-close');


  const navOpen = () => {
    nav.style.display = 'flex';
    navBtnOpen.style.display = 'none';
    navBtnClose.style.display = 'inline-block';
  }

  navBtnOpen.addEventListener('click', navOpen);

  const navClose = () => {
    nav.style.display = 'none';
    navBtnOpen.style.display = 'inline-block';
    navBtnClose.style.display = 'none';
  }

  navBtnClose.addEventListener('click', navClose);

  // close nav menu on click of menu link
  if(document.body.clientWidth < 1000) {
    nav.querySelectorAll('li a').forEach(navLink => {
      navLink.addEventListener('click', navClose);
    })
  }
  


