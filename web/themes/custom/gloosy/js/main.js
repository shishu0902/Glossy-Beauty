/*-----------------------------------------------------------------------------------

    Theme Name: GLOSSY
    Theme URI: http://
    Description:  Beauty Center Template
    Author: gecdesigns    

-----------------------------------------------------------------------------------*/

/*=================================================
 == Table Of Content

    1. PRELOADER
    2. SCROLLIT
    3. NAVBAR    
    4. HOME SLIDER
    5. SCROLL TO TOP 
    6. PORTFOLIO   
    7. OWLCAROUSEL
    8. VALIDATOR

*/
(($, Drupal, once) => {
$(function () {
    "use strict";
    var wind = $(window);
    

    /*============= PRELOADER ============= */
    $(document).ready(function () {

        // Fakes the loading setting a timeout
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 1500);
        $('.jumbotron').paroller();

    });

    /*============= SCROLLIT ============= */
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70 // offste (in px) for fixed top navigation
    });

    /*============= NAVBAR============= */
    function animateMenu() {
        var menu = $('.navbg');
        var nav = $('.navbar-nav');

        if (menu.hasClass('showMenu')) { // Hide menu if it's open
            menu.removeClass('showMenu').addClass('hideMenu');
            nav.removeClass('fadeIn');
        } else if (menu.hasClass('hideMenu')) { // Show menu and remove hideMenu
            menu.removeClass('hideMenu').addClass('showMenu');
            nav.addClass('fadeIn')
        } else {
            menu.addClass('showMenu'); // Initial show menu
            nav.addClass('fadeIn');
        }
    };

    $(document).ready(function () {
        $('.nav-icon').on('click', function () {
            $(this).toggleClass('open');
            animateMenu();
        });
        $('.navbar-nav a').on('click', function () {
            $('.nav-icon').toggleClass('open');
            animateMenu();
        });
    });

    /*============= HOME SLIDER ============= */
    $('.home').vegas({
        overlay: true,
        transition: 'fade',
        transitionDuration: 4000,
        delay: 10000,
        color: 'red',
        animation: 'random',
        animationDuration: 20000,
        slides: [
            { src: 'themes/custom/gloosy/img/hero-01.jpg' },
            { src: 'themes/custom/gloosy/img/hero-02.jpg' },
            { src: 'themes/custom/gloosy/img/hero-03.jpg' },
            { src: 'themes/custom/gloosy/img/hero-04.jpg' }
        ]
    });
    // Testimonials owlCarousel
    //=========================
    $('.testimonials .owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        margin: 15,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
    });
   
    // Package owlCarousel
//=========================
$('.view-id-beauty_packages .view-content').addClass('package-carousel owl-carousel');
function package_carousel() {
    var owl = $(".package-carousel");
    owl.owlCarousel({
        loop: true,
        margin: 30,
        responsiveClass: true,
        navigation: true,
        navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
        nav: true,
        items: 3,
        smartSpeed: 1000,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        center: false,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1
            },
            760: {
                items: 2
            },
            994: {
                items: 3
            }
        }
    });
}
package_carousel();
});

/*============= SCROLL TO TOP ============= */
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });
    // scroll body to 0px on click
    $('#scroll-to-top').click(function () {
        $('#scroll-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});

/*===========  PORTFOLIO ===============*/
$(".simplefilter li").on("click", function () {
    $(".simplefilter li").removeClass("active");
    $(this).addClass("active");
});
var options = {
    animationDuration: 0.6,
    filter: "all",
    callbacks: {
        onFilteringStart: function () { },
        onFilteringEnd: function () { }
    },
    delay: 0,
    delayMode: "alternate",
    easing: "ease-out",
    layout: "sameSize",
    selector: ".filtr-container",
    setupControls: true
}
var filterizd = $(".filtr-container").filterizr(options);
filterizd.filterizr("setOptions", options);

/*========= OWLCAROUSEL =========*/




/*========= VALIDATOR =========*/

// contact form validator
$('#contact-form').validator();

$('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
        var url = "contact.php";

        $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                var messageAlert = 'alert-' + data.type;
                var messageText = data.message;

                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                if (messageAlert && messageText) {
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                }
            }
        });
        return false;
    }
});
})(jQuery, Drupal, once);