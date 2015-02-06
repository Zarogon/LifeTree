(function() {
    var docElem = document.documentElement,
        $header = $('#header'),
        didScroll = false,
        changeHeaderOn = 250,
        $menuTrigger = $('main-menu-trigger');

    function init() {
        // disable scrolling
        window.addEventListener( 'scroll', noscroll );

        $('#loader').addClass('loading');

        setTimeout(function(){
            $('#loader').fadeOut('slow', function() {
                $('body').addClass('loaded');
                window.removeEventListener( 'scroll', noscroll );
                svgReplace();
            });
        }, 5500);

        window.addEventListener('scroll', function() {
            if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 250);
            }
        }, false);

        $header.on('click', $menuTrigger, function(event) {
           event.preventDefault();

           $('.menu').toggleClass('is-open');
            $('.lines').toggleClass('open');
        });
    }

    function scrollPage() {
        var sy = scrollY();

        if (sy >= changeHeaderOn) {
            $header.addClass('tb-shrink');
            $header.removeClass('tb-transp');
            $header.removeClass('tb-large');
        } else {
            $header.removeClass('tb-shrink');
            $header.addClass('tb-transp');
            $header.addClass('tb-large');
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    function noscroll() {
        window.scrollTo( 0, 0 );
    }

    function svgReplace() {
        $('img.svg').each(function() {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');
        })
    }

    init();

})();