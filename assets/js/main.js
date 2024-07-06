$(document).ready(function () {
    $('#toggleButton').click(function () {
        if ($(window).width() < 821) {
            $('#toggleDiv').slideToggle();
        }
    });

    $(window).resize(function () {
        if ($(window).width() >= 821) {
            $('#toggleDiv').show(); // Always show on desktop
        } else {
            $('#toggleDiv').hide(); // Always hide on mobile
        }
    });

    // Close menu when clicking on any menu item
    $('.menu-list-link, .scroll-to-steps, .scroll-to-faq').click(function () {
        if ($(window).width() < 821) {
            $('#toggleDiv').slideUp();
        }
    });

    // Ensure regular link behavior for normal links
    $('.menu-list-link > a').click(function (e) {
        if (this.hash) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 800, function(){
                window.location.hash = this.hash;
            });
        }
    });

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    // swiper initialization
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1.2,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

    });
    // aos initialization
    AOS.init();
    // wow intialization
    new WOW().init();


    var lightboxVideo = GLightbox({
        selector: '.glightbox3'
    });

    $('.video-item').each(function () {
        const $gridItem = $(this);
        const $thumbnail = $(this).find('.thumbnail');
        const $hoverVideo = $(this).find('.hover-video');

        $gridItem.on('mouseenter', function () {
            $hoverVideo.show();
            $hoverVideo[0].play();
        });

        $gridItem.on('mouseleave', function () {
            $hoverVideo.hide();
            $hoverVideo[0].pause();
            $hoverVideo[0].currentTime = 0;
        });
    });
});

window.addEventListener("DOMContentLoaded", function () {
    gsap.set(".hero-left", { opacity: 0, y: -150 });
    gsap.set(".hero-right", { opacity: 0, y: -150 });
    gsap.set(".hero-card", { opacity: 0, y: -150 });
    gsap.defaults({ duration: 1, ease: "power3.out" });

    const tl = gsap.timeline({ paused: true, delay: 0.5 });

    tl.to(".hero-card", {
        y: 0,
        opacity: 1,
        stagger: 0.1
    }, 0)
    .to(".hero-right", {
        opacity: 1,
        y: 0
    }, 0)
    .to(".hero-left", {
        opacity: 1,
        y: 0
    }, 0);

    tl.eventCallback("onStart", function() {
        console.log("Animation started");
    });

    tl.play();
});

document.querySelectorAll('.steps').forEach(step => {
    step.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
  
    step.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });
  
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.classList.add('hover');
    });
  
    btn.addEventListener('mouseleave', function() {
      this.classList.remove('hover');
    });
  });

function openCustomModal() {
    document.getElementById('custom-modal').classList.add('open');
}

function closeCustomModal() {
    document.getElementById('custom-modal').classList.remove('open');
}


function copyToClipboard(button) {
    const textToCopy = "play.moonlightrp.fun 22005";
    
    navigator.clipboard.writeText(textToCopy).then(function() {
        button.classList.add('copied');

        setTimeout(() => {
            button.classList.remove('copied');
        }, 1500);
    }).catch(function(error) {
        console.error(error);
    });
}

document.querySelectorAll('.scroll-to-steps').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('steps').scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelectorAll('.scroll-to-faq').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('faq').scrollIntoView({ behavior: 'smooth' });
    });
});