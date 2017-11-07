if ($(window).width() > 1024) {
    function addHandler(object, event, handler) {
        if (object.addEventListener) {
            object.addEventListener(event, handler, false);
        } else if (object.attachEvent) {
            object.attachEvent('on' + event, handler);
        } else alert("Обработчик не поддерживается");
    }
    // Функция, обрабатывающая событие
    function wheel(event) {
        var delta; // Направление колёсика мыши
        event = event || window.event;
        // Opera и IE работают со свойством wheelDelta
        if (event.wheelDelta) { // В Opera и IE
            delta = event.wheelDelta / 120;
            // В Опере значение wheelDelta такое же, но с противоположным знаком
            if (window.opera) delta = -delta; // Дополнительно для Opera
        } else if (event.detail) { // Для Gecko
            delta = -event.detail / 3;
        }

        if (delta > 0) {
            var s = $(window).scrollTop();

            if (s == 0) {

                $('#page').removeClass('modify');
                $('.home').removeClass('modify');
            }
            // Добавляем обработчики для разных браузеров
            addHandler(window, 'DOMMouseScroll', wheel);
            addHandler(window, 'mousewheel', wheel);
            addHandler(document, 'mousewheel', wheel);
        } else {
            $('#page').addClass('modify');
            $('.home').addClass('modify');
        }
    }



    (function() {

        // detect if IE : from http://stackoverflow.com/a/16657946      
        var ie = (function() {
            var undef, rv = -1; // Return value assumes failure.
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf('MSIE ');
            var trident = ua.indexOf('Trident/');

            if (msie > 0) {
                // IE 10 or older => return version number
                rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            } else if (trident > 0) {
                // IE 11 (or newer) => return version number
                var rvNum = ua.indexOf('rv:');
                rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
            }

            return ((rv > -1) ? rv : undef);
        }());


        // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179                  
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [32, 37, 38, 39, 40],
            wheelIter = 0;

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        function keydown(e) {
            for (var i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    preventDefault(e);
                    return;
                }
            }
        }

        function touchmove(e) {
            preventDefault(e);
        }

        function wheel(e) {
            // for IE 
            //if( ie ) {
            //preventDefault(e);
            //}
        }

        function disable_scroll() {
            window.onmousewheel = document.onmousewheel = wheel;
            document.onkeydown = keydown;
            document.body.ontouchmove = touchmove;
        }

        function enable_scroll() {
            window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
        }

        var docElem = window.document.documentElement,
            scrollVal,
            isRevealed,
            noscroll,
            isAnimating,
            container = document.getElementById('page'),
            trigger = container.querySelector('a.down');

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        function scrollPage() {
            scrollVal = scrollY();

            if (noscroll && !ie) {
                if (scrollVal < 0) return false;
                // keep it that way
                window.scrollTo(0, 0);
            }

            if (classie.has(container, 'notrans')) {
                classie.remove(container, 'notrans');
                return false;
            }

            if (isAnimating) {
                return false;
            }

            if (scrollVal <= 0 && isRevealed) {
                toggle(0);
            } else if (scrollVal > 0 && !isRevealed) {
                toggle(1);
            }
        }

        function toggle(reveal) {
            isAnimating = true;

            if (reveal) {
                classie.add(container, 'modify');
            } else {
                noscroll = true;
                disable_scroll();
                classie.remove(container, 'modify');
            }

            // simulating the end of the transition:
            setTimeout(function() {
                isRevealed = !isRevealed;
                isAnimating = false;
                if (reveal) {
                    noscroll = false;
                    enable_scroll();
                }
            }, 1200);
        }

        // refreshing the page...
        var pageScroll = scrollY();
        noscroll = pageScroll === 0;

        disable_scroll();

        if (pageScroll) {
            isRevealed = true;
            classie.add(container, 'notrans');
            classie.add(container, 'modify');
        }

        window.addEventListener('scroll', scrollPage);
        trigger.addEventListener('click', function() {
            toggle('reveal');
        });
    })();



} else {
    $('#body').addClass('modify');
    $('.home').addClass('mobha');
    $('#second').find('.wow').removeClass('wow fadeIn');



    $('#menu-toggle').click(function() {
        $(this).toggleClass('open');
    })

    window.onload = function() {
        var slideout = new Slideout({
            'panel': document.getElementById('page'),
            'menu': document.getElementById('menu'),
            'side': 'right'
        });

        document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
            slideout.toggle();
        });

        document.querySelector('.menu').addEventListener('click', function(eve) {
            if (eve.target.nodeName === 'A') {
                slideout.close();
            }
        });
    };


}




(function() {
    var header = document.querySelector("#header");
    if (window.location.hash) {
        header.classList.add("slide--up");
    }

    new Headroom(header, {
        tolerance: {
            down: 10,
            up: 20
        },
        offset: 205,
        classes: {
            initial: "slide",
            pinned: "slide--reset",
            unpinned: "slide--up"
        }
    }).init();

}());


$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });




    $('body').fadeIn(1500);
    $('.menu-item a,.navbar-brand').click(function() {
        event.preventDefault();
        newLocation = this.href;
        $('body').fadeOut(1000, newpage);
    });

    function newpage() {
        window.location = newLocation;
    }

    var flag = 0;
    $('#otz, .close').click(function() {
        if (flag == 0) {
            $('#slide').fadeOut(700);
            $('#form').delay(710).fadeIn(700);
            flag = 1;
        } else {
            $('#form').fadeOut(700);
            $('#slide').delay(710).fadeIn(700);
            flag = 0;
        }
    });


    $('#dalee').click(function() {
        $('#thnx').fadeOut(700);
        $('#slide').delay(700).fadeIn(700);

    });

    wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        callback: function(box) {
            console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
    });
    wow.init();




    $("#example4").validate({

        rules: {
            "email": {
                required: true,
                email: true
            },
            "name": {
                required: true,
                minlength: 5
            },
            "message": {
                required: true,
                maxlength: 400,
                minlength: 30
            },
            messages: {
                "name": {
                    required: ""
                },
                "numb": {
                    required: ""
                },
                "message": {
                    required: ""
                }
            }
        },
        showErrors: function(errorMap, errorList) {
            $("#summary").fadeIn(700).html("Вы допустили ошибку при заполнении! Заполните поля корректно");
            $("button.button").css("opacity", "0.5");
            this.defaultShowErrors();
            if (this.numberOfInvalids() > 0) {
                $("#summary").show();
            } else {
                $("#summary").hide();
                $("button.button").css("opacity", "1");
            }
        },
        errorPlacement: function() {
            return false; // <- kill default error labels
        }
    });


    var maxLength = 400;
    $('#message').keyup(function() {
        var textlen = $(this).val().length;
        $('#rchars').text(textlen);
    });



    $('#form').ajaxForm(function() {
        $('#thnx').fadeIn(300);
        $('#form').fadeOut(0);
        $('#example4')[0].reset();
    });
});