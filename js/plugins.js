/*========== MAGNIFIC POPUP LIGHTBOX IMAGE GALLERY ==========*/
$(document).ready(function () {
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        removalDelay: 100, // Delay in milliseconds before popup is removed
        image: {
            titleSrc: 'title'
            // this tells the script which attribute has your image caption
        }
    });
});


/*========== MAGNIFIC POPUP HTML5 VIDEO & GOOGLE MAPS ==========*/
$(document).ready(function () {
    $('.magnificPop-video').magnificPopup({
        type: 'iframe',
        gallery: { enabled: true },
        removalDelay: 100, // Delay in milliseconds before popup is removed
        image: {
            titleSrc: 'title'
            // this tells the script which attribute has your image caption
        },
        iframe: extendMagnificIframe()
    });
});


/*========== SKILLS COUNTER ==========*/
$(document).ready(function() { //when document(DOM) loads completely
    $('.counter').counterUp({
      delay: 10, //delay in milliseconds per count up
      time: 3000, //(originally 1800) total time taken by the animation
      beginAt: 0
    });
  });
  

/*========== EMBED YOUTUBE & VIMEO IN MAGNIFIC POPUP LIGHTBOX ==========*/
function extendMagnificIframe() {
    var $start = 0;
    var $iframe = {
        markup: '<div class="mfp-iframe-scaler">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>' +
            '<div class="mfp-bottom-bar">' +
            '<div class="mfp-title"></div>' +
            '</div>',
        patterns: {
            youtube: {
                index: 'youtu',
                id: function (url) {
                    var m = url.match(/^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/);
                    if (!m || !m[1]) return null;

                    if (url.indexOf('t=') != -1) {
                        var $split = url.split('t=');
                        var hms = $split[1].replace('h', ':').replace('m', ':').replace('s', '');
                        var a = hms.split(':');

                        if (a.length == 1) {
                            $start = a[0];
                        } else if (a.length == 2) {
                            $start = (+a[0]) * 60 + (+a[1]);
                        } else if (a.length == 3) {
                            $start = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                        }
                    }

                    var suffix = '?autoplay=1';
                    if ($start > 0) {
                        suffix = '?start=' + $start + '&autoplay=1';
                    }

                    return m[1] + suffix;
                },
                src: '//www.youtube.com/embed/%id%'
            },
            vimeo: {
                index: 'vimeo.com/',
                id: function (url) {
                    var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                    if (!m || !m[5]) return null;
                    return m[5];
                },
                src: '//player.vimeo.com/video/%id%?autoplay=1'
            }
        }
    };
    return $iframe;
}


/*========== MAKE ALL ANIMATION "FADEINUP" ON MOBILE ==========*/
$(document).ready(function () {
    if ($(window).width() < 768) {
      $("div").attr('data-animation', 'animate__animated animate__fadeInUp');
    }
});


/*========== (DON'T CHANGE) WAYPOINTS ANIMATION DELAY ==========*/
$(function () { // a self calling function
    function onScrollInit(items, trigger) { // a custom made function
        items.each(function () { //for every element in items run function
            var osElement = $(this), //set osElement to the current
                osAnimationClass = osElement.attr('data-animation'), //get value of attribute data-animation type
                osAnimationDelay = osElement.attr('data-delay'); //get value of attribute data-delay time

            osElement.css({ //change css of element
                '-webkit-animation-delay': osAnimationDelay, //for safari browsers
                '-moz-animation-delay': osAnimationDelay, //for mozilla browsers
                'animation-delay': osAnimationDelay //normal
            });

            var osTrigger = (trigger) ? trigger : osElement; //if trigger is present, set it to osTrigger. Else set osElement to osTrigger

            osTrigger.waypoint(function () { //scroll upwards and downwards
                osElement.addClass('animated').addClass(osAnimationClass); //add animated and the data-animation class to the element.
            }, {
                    triggerOnce: true, //only once this animation should happen
                    offset: '70%' // animation should happen when the element is 70% below from the top of the browser window
                });
        });
    }

    onScrollInit($('.os-animation')); //function call with only items
    onScrollInit($('.staggered-animation'), $('.staggered-animation-container')); //function call with items and trigger
});


/*========== CONTACT FORM INPUT VALIDATION (DON'T CHANGE) ==========*/
$(function () {

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator

    $('#contact-form').validator();


    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact/contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});

/*========== CLOSE MOBILE NAV ON CLICK ==========*/
$(document).ready(function () { //when document loads completely.
    $(document).click(function (event) { //click anywhere
        var clickover = $(event.target); //get the target element where you clicked
        var _opened = $(".navbar-collapse").hasClass("show"); //check if element with 'navbar-collapse' class has a class called show. Returns true and false.
        if (_opened === true && !clickover.hasClass("navbar-toggler")) { // if _opened is true and clickover(element we clicked) doesn't have 'navbar-toggler' class
            $(".navbar-toggler").click(); //toggle the navbar; close the navbar menu in mobile.
        }
    });
});


/*========== MULTI-LEVEL / DOUBLE CLICK DROP DOWN MENU ==========*/
$(document).ready(function () {
    var DELAY = 700, clicks = 0, timer = null;

    // On click or double click
    $("nav ul li.dropdown a.dropdown-toggle")
        .on("click", function (e) {
            clicks++;
            if (clicks === 1) {
                timer = setTimeout(function () {
                    clicks = 0;
                }, DELAY);
            } else {
                clearTimeout(timer);
                window.location.href = $(this).attr('href');
                clicks = 0;
            }
        })
        .on("dblclick", function (e) {
            e.preventDefault();
        });

    //mulit-level menu
    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        $(this).siblings().toggleClass("show");


        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

    });
});


/*========== JQUERY LINE PROGRESSBAR ==========*/
// https://kingrayhan.github.io/LineProgressbar/
$(document).ready(function () {
    ;(function($) {
        'use strict'

        $.fn.LineProgressbar = function(options) {
            options = $.extend(
                {
                    percentage: 100,
                    ShowProgressCount: true,
                    duration: 1000,
                    unit: '%',
                    animation: true,
                    // Styling Options
                    fillBackgroundColor: '#3498db',
                    backgroundColor: '#EEEEEE',
                    radius: '0px',
                    height: '10px',
                    width: '100%',
                },
                options
            )

            $.options = options
            return this.each(function(index, el) {
                // Markup
                $(el).html(
                    '<div class="progressbar"><div class="proggress"></div><div class="percentCount"></div></div>'
                )

                var progressFill = $(el).find('.proggress')
                var progressBar = $(el).find('.progressbar')

                progressFill.css({
                    backgroundColor: options.fillBackgroundColor,
                    height: options.height,
                    borderRadius: options.radius,
                })
                progressBar.css({
                    width: options.width,
                    backgroundColor: options.backgroundColor,
                    borderRadius: options.radius,
                })

                /**
                 * Progress with animation
                 */
                if (options.animation) {
                    // Progressing
                    progressFill.animate(
                        {
                            width: options.percentage + '%',
                        },
                        {
                            step: function(x) {
                                if (options.ShowProgressCount) {
                                    $(el)
                                        .find('.percentCount')
                                        .text(Math.round(x) + options.unit)
                                }
                            },
                            duration: options.duration,
                        }
                    )
                } else {
                    // Without animation
                    progressFill.css('width', options.percentage + '%')
                    $(el)
                        .find('.percentCount')
                        .text(Math.round(options.percentage) + '%')
                }
            })
        }
    })(jQuery)

    $('[data-line-progressbar]').each(function() {
        var $this = $(this)
        function LineProgressing() {
            $this.LineProgressbar({
                percentage: $this.data('percentage'),
                unit: $this.data('unit'),
                animation: $this.data('animation'),
                ShowProgressCount: $this.data('showcount'),
                duration: $this.data('duration'),
                fillBackgroundColor: $this.data('progress-color'),
                backgroundColor: $this.data('bg-color'),
                radius: $this.data('radius'),
                height: $this.data('height'),
                width: $this.data('width'),
            })
        }
        var loadOnce = 0
        $this.waypoint(
            function() {
                loadOnce += 1
                if (loadOnce < 2) {
                    LineProgressing()
                }
            },
            { offset: '80%', triggerOnce: true } //Changed to 80% from original 100% for Waypoints
        )
    })
});


/*============================================================
CUSTOMIZABLE JQUERY PLUGIN SETTINGS
=============================================================*/


/*========== HOME PAGE CLIENT CAROUSEL ==========*/
$(document).ready(function () {
    $('#owl-carousel .carousel-wrap .owl-carousel').owlCarousel({
        autoplay: true, //set to false to turn off autoplay and only use nav
        autoplayHoverPause: true, //set to false to prevent pausing on hover
        loop: true, //set to false to stop carousel after all slides shown
        autoplayTimeout: 8000, //time between transitions
        smartSpeed: 2000, //transition speed
        nav: true, //display prev & next buttons
        navSpeed: 1500, //transition speed when using buttons
        navText: [ //font awesome prev & next buttons
            "<i class='fas fa-chevron-left'></i>",
            "<i class='fas fa-chevron-right'></i>"
        ],
        responsive: { // set number of items shown at screen width
            0: {
                items: 1 //0px width and up display 1 item
            }
        }
    });
});


/*========== LOGO IMAGE CAROUSEL ==========*/
$(document).ready(function () {
    $('#logo-carousel .carousel-wrap .owl-carousel').owlCarousel({
        autoplay: true, //set to false to turn off autoplay and only use nav
        autoplayHoverPause: true, //set to false to prevent pausing on hover
        loop: true, //set to false to stop carousel after all slides shown
        autoplayTimeout: 4000, //time between transitions
        smartSpeed: 1700, //transition speed
        margin: 10, //added margin between carousel items (helps border styling)
        responsive: { // set number of items shown at screen width
            0: {
                items: 1 //0px width and up display 1 item
            },
            600: {
                items: 3 //600px width and up display 3 items
            },
            1000: {
                items: 5 //1000px width and up display 5 items
            }
        }
    });
});


/*========== TOP SCROLL BUTTON FADE ==========*/
$(document).ready(function () {
    $(window).scroll(function () { // when window is scrolled
        if ($(this).scrollTop() > 500) { //if scrolled 500px from top of page
            $('.top-scroll').fadeIn(1000); //add .top-scroll class
        } else {
            $('.top-scroll').fadeOut(1000);//if it's within 500px of top of window don't display class
        }
    });
});


/*========== TOP SCROLL SMOOTH SCROLLING ==========*/
$(document).on('click', 'a[href^="#home"]', function (event) { //when "#home" (to header id) link is clicked
    event.preventDefault(); //cancel click event (to normal URL)

    $('html, body').animate({ //animate html/body (both for browser compatibility)
        scrollTop: $($.attr(this, 'href')).offset().top //scroll top to link "#home" location (header id)
    }, 1000); //top scroll speed (1000ms change to your preference)
});


/*========== ABOUT US PAGE TEAM CAROUSEL ==========*/
$(document).ready(function () {
    $('#team-carousel .carousel-wrap .owl-carousel').owlCarousel({
        autoplay: true, //set to false to turn off autoplay and only use nav
        autoplayHoverPause: true, //set to false to prevent pausing on hover
        loop: true, //set to false to stop carousel after all slides shown
        autoplayTimeout: 8000, //time between transitions
        smartSpeed: 1800, //transition speed
        nav: true, //display prev & next buttons
        navSpeed: 1500, //transition speed when using buttons
        margin: 10, //added margin between carousel items
        navText: [ //font awesome prev & next buttons
            "<i class='fas fa-chevron-left'></i>",
            "<i class='fas fa-chevron-right'></i>"
        ],
        responsive: { // set number of items shown at screen width
            0: {
                items: 1 //0px width and up display 1 item
            },
            1200: {
                items: 2 //1200px width and up display 2 items
            }
        }
    });
});


/*========== CLOSE PROJECT GALLERY NAVBAR COLLAPSE ON CLICK
(so main nav and projects nav don't ipen and close at the same time.) ==========*/
$(document).ready(function () { //NOTE: ** only change query if you use a different filter nav id name **
    $('#navbarProjects .nav-link').on('click', function () { //when filter nav link is clicked
        $('.navbar-collapse.collapse').removeClass('show'); //remove "show" class from filter navbar-collapse to hide dropdown
    });
});


/*========== PROJECTS FILTER (ISOTOPE) INITIALIZATION ==========*/
var $grid = $('.grid').isotope({
    filter: '.web-design', //class for active filter menu link,"is-checked" class needed in nav item.
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
});

/*========== PROJECTS PAGE PROJECT DESCRIPTION CAROUSEL ==========*/
$(document).ready(function () {
    $('.projects-carousel .carousel-wrap .owl-carousel').owlCarousel({
        autoplay: false, //set to true to autoplay
        autoplayHoverPause: true, //set to false to prevent pausing on hover
        loop: true, //set to false to stop carousel after all slides shown
        autoplayTimeout: 8000, //time between transitions
        smartSpeed: 1800, //transition speed
        nav: true, //display prev & next buttons
        navSpeed: 1500, //transition speed when using buttons
        navText: [ //font awesome prev & next buttons
            "<i class='fas fa-chevron-left'></i>",
            "<i class='fas fa-chevron-right'></i>"
        ],
        responsive: { // set number of items shown at screen width
            0: {
                items: 1 //0px width and up display 1 item
            }
        }
    });
});



/*============================================================
*** PLUGINS THAT SHOULD NOT BE CHANGED ***
=============================================================*/


/*========== ISOTOPE FILTER PROJECT GALLERY ==========*/
// filter functions
var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
        var number = $(this).find('.number').text();
        return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
        var name = $(this).find('.name').text();
        return name.match(/ium$/);
    }
};
// bind filter button click
$('.filters-button-group').on('click', 'a.filter', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
});
// change is-checked class on menu
$('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'a.filter', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});


/*========== ISOTOPE GALLERY SPACING FIX ==========*/
$(document).ready(function () {
    $container.imagesLoaded(function () {
    $container.isotope({
        itemSelector: ".item",
        isOriginLeft: false,
    });
    $container.isotope();
    });
});