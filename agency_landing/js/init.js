"use strict";
var hl = new Helper();
var resultPopup = new Popup({
    $popup: $(".result.popup")
});

function initFeedbackForm() {
    // script uses the same form for contacts and order logic.
    // clone order form
    var $seoForm = $(".form.order").clone(),
        $feedbackForm = $(".form.order").clone();
    $feedbackForm.removeClass("order").addClass("feedback");
    $(".page.contacts .content").append($feedbackForm);

    $seoForm.removeClass("order").addClass("seo-form");
    $(".page.seo .seo-make-order").append($seoForm);
    $seoForm.find(".cs-select").val('seo');
    $seoForm.find(".cs-select").parent().hide();
    $seoForm.find(".js-submit").text('Заказать SEO-продвижение');
    // make order link code
    var orderPopup = new Popup({
        $popup: $(".popup.order"),
        onClose: function() {
            window.jsPages && window.jsPages.$currentPage.removeClass("blurred");
        }
    });

    var orderForm = new Form({
        $form: $(".form.order"),
        onComplete: function (data) {
            data.status && this.reset();
            var title = data.status ? "Сообщение" : "Ошибка";

            orderPopup.close();

            resultPopup.setTitle(title);
            resultPopup.setText(data.text);
            resultPopup.open();

            if (this.gaSubmitLabel) {
                ga('send', 'event', 'Button', 'Click', this.gaSubmitLabel);
            }
        }
    });

    function makeOrder () {
        if (window.jsPages) {
            window.jsPages.$currentPage.toggleClass("blurred");
            if (window.jsPages.currentPage !== "contacts") {
                orderPopup.open();
            }
        } else {
            orderPopup.open();
        }
    }

    $(".form.feedback,.form.order,.form.seo-form").on("click", function(event) {
        event.stopPropagation();
    });

    $(".make-order").on("click", function(event) {
        makeOrder();


        //Google Analytics
        if (window.jsPages) {
            var openLabel, submitLabel;
            if (window.jsPages.currentPage === "contacts") {
                openLabel = 'clickc3';
                submitLabel = 'clickf2';
            } else if ((window.jsPages.currentPage === "services") && ($(this).parent().hasClass("container") === false)) {
                var $dataCode = $(this).parent().parent().parent().data("code");
                if ($dataCode === "analysis") {
                    openLabel = 'clickap4z';
                    submitLabel = 'clickf8';
                } else if ($dataCode === "design") {
                    openLabel = 'clickcc5z';
                    submitLabel = 'clickf8';
                } else if ($dataCode === "support") {
                    openLabel = 'clickts6z';
                    submitLabel = 'clickf8';
                } else if ($dataCode === "seo") {
                    openLabel = 'clickssc7z';
                    submitLabel = 'clickf8';
                }
            } else {
                openLabel = 'clickz1';
                submitLabel = 'clickf2';
            }

            ga('send', 'event', 'Button', 'Click', openLabel);
            orderForm.setGASubmitLabel(submitLabel);
        }

        $(document.body).one("click", function() {
            if (window.jsPages) {
                if (window.jsPages.currentPage === "contacts") {
                    orderPopup.close();
                }
            } else {
                orderPopup.close();
            }
        });
        event.stopPropagation();
    });
}

$(function() {
    initFeedbackForm();
    setFaviconRetina();

    $(".input-masked").each(function () {
        hl.makeInputMask($(this));
    });
    $(".cs-select").each(function () {
        hl.makeSelect($(this));
    });
    $(".expanding-area").each(function () {
        hl.makeExpandingArea(this);
    });
    $(".input-file").each(function() {
        hl.makeFileUpload($(this));
    });

    $(".preload").each(function() {
        hl.preload(this);
    });

    sbjs.init({
        lifetime: 3,
        callback: setAnalytics
    });

    if ($(".js-driven-page").length) {
        /* about page */
        var lastfmCS = new LastfmCS({
            user: "Step_forward", //"Henfes" //DamnDeuce
            $wrap: $(".page.about .our-music")
        });

        /* all js switched pages */
        window.jsPages = new Pages({
            $pagesWrapper: $("#pagesWrapper"),
            duration: 1,
            pages: pagesStates
        });

        $("header .menu .link, header .logo , .page-link").on("click", function () {
            window.jsPages.switchPage($(this).data().name, true);
            return false;
        });



        /* main page */
        var mpTLT = new TextillateCS({
            $wrap: $(".main.page .tlt"),
            inEffect: "flipInX",
            autoPlay: true
        });

        /* portfolio page */
        var portfolio = $(".page.portfolio .works").slider({
            onInit: function () {
                var _this = this;
                var wPreviewPopup = new Popup({
                    $popup: $(".work-preview.popup"),
                    onCloseComplete: function () {
                        this.setTitle("");
                        this.setText("");
                    }
                });

                this.$slides.each(function (index, slide) {
                    var $slide = $(slide);

                    $slide.find(".pictures .pic").each(function () {

                    });

                    /*
                    $slide.find(".inner").on("click", function (event) {
                        if (!$slide.hasClass("active")) return;
                        var $this = $(this);
                        wPreviewPopup.setTitle($this.find(".caption").text());
                        wPreviewPopup.setText($this.find(".preview-text").val());
                        wPreviewPopup.open();
                        event.stopPropagation();
                    });*/
                });

            },
            onActivateSlide: function ($slide, animate) {
                var duration = animate ? this.params.duration : 0;
                var _this = this;

                var tl = new TimelineLite();

                $slide.find(".bg-circle, .url-wrap, .pic").show();
                tl.fromTo($slide.find(".bg-circle"), duration, {scale: 0, opacity: 0}, {scale: 1, opacity: 1});

                $slide.find(".pic").each(function(index, pic) {
                    var $pic = $(pic);
                    TweenMax.fromTo($pic, duration, {
                        transform: $pic.data("transform")
                    }, {
                        opacity: 1,
                        transform: "none",
                        ease: _this.params.ease,
                        delay: (duration * .4 + $pic.data("delay") / 1000)
                    });
                });
                tl.to($slide.find(".url-wrap"), duration, {opacity: 1, ease: this.params.ease}, "-=" + duration);
            },
            onDeactivateSlide: function ($slide, animate) {
                var duration = animate ? this.params.duration * 0.6 : 0;

                TweenMax.to($slide.find(".url-wrap"), duration, {opacity: 0, ease: this.params.ease});
                TweenMax.to($slide.find(".pic"), duration, { opacity: 0, ease: this.params.ease });
                TweenMax.to($slide.find(".bg-circle"), duration * 3, {
                    scale: 0, opacity: 0, onComplete: function () {
                        $slide.find(".bg-circle, .url-wrap, .pic").hide();
                    }
                });

                var $preview = $slide.find(".preview");
                TweenMax.to($preview, duration, {
                    opacity: 0, ease: this.params.ease, onComplete: function () {
                        $preview.hide();
                    }
                });
            },
            onStateChange: function (animate) {
                var $this = $(this),
                    duration = animate ? this.params.duration : 0;
                if (this.state) {
                    TweenMax.to($this, duration, {marginTop: "10rem", ease: Power0.easeNone});
                } else {
                    TweenMax.to($this, duration, {marginTop: 0, ease: Power0.easeNone});

                    $(".popup.work-preview").trigger("close");
                }
            }
        });

        /* reviews page */
        var reviews = $(".feedback.page .reviews").slider({
            onActivateSlide: function ($slide, animate) {
                var duration = animate ? this.params.duration : 0;
                $slide.find(".slide-part").show();

                var tl = new TimelineLite();

                tl.to($slide.find(".project-name"), duration / 2, {opacity: 0, scale: 0});
                tl.to($slide.find(".avatar"), duration, {opacity: 1, scale: 1}, "-=" + duration / 2);
                tl.to($slide.find(".person, .target"), duration, {opacity: 1}, "-=" + duration / 2);
                tl.to($slide.find(".text"), duration, {opacity: 1}, "-=" + duration);
                tl.to($slide.find(".case-link-wrap"), duration, {opacity: 1}, "-=" + duration / 2);
            },
            onDeactivateSlide: function ($slide, animate) {
                var duration = animate ? this.params.duration : 0;

                var tl = new TimelineLite();

                tl.to($slide.find(".case-link-wrap"), duration, {opacity: 0});
                tl.to($slide.find(".text"), duration, {opacity: 0}, "-=" + duration);
                tl.to($slide.find(".person, .target"), duration, {opacity: 0}, "-=" + duration);
                if (this.state) {
                    tl.to($slide.find(".avatar"), duration / 1.5, {opacity: 0, scale: 0}, "-=" + duration / 2);
                }
                tl.fromTo($slide.find(".project-name"), duration / 2, {opacity: 0, scale: 0}, {
                    opacity: 1,
                    scale: 1
                }, "-=" + duration);

                setTimeout(function () {
                    $slide.find(".slide-part").hide();
                }, duration * 1000)
            },
            onStateChange: function (animate) {
                var _this = this,
                    $this = $(this),
                    duration = animate ? this.params.duration : 0;

                var showParams = {opacity: 1, scale: 1},
                    hideParams = {opacity: 0, scale: 0};

                var marginTop = this.state ? "10rem" : "7rem";
                TweenMax.to($this, duration, {marginTop: marginTop, ease: Power0.easeNone});


                if (this.state) {
                    this.$slides.each(function (index, slide) {
                        var $slide = $(slide);
                        if (index !== _this.currIndex) {
                            TweenMax.to($slide.find(".project-name"), duration, showParams);
                            TweenMax.to($slide.find(".avatar"), duration, hideParams);
                        }
                    });
                } else {
                    this.$slides.each(function (index, slide) {
                        var $slide = $(slide),
                            currShowParams = index === _this.currIndex ? $.extend({}, showParams, {scale: 1.3}) : showParams;

                        TweenMax.to($slide.find(".avatar"), duration, currShowParams);
                        TweenMax.to($slide.find(".project-name"), duration, hideParams);
                    });
                }
            }
        });

        /* service page */
        var services = new Services({
            $wrap: $(".services.page"),
            duration: 1
        });
        var seoForm = new Form({
            $form: $(".form.seo-form"),
            onComplete: function (data) {
                data.status && this.reset();
                var title = data.status ? "Сообщение" : "Ошибка";
                resultPopup.setTitle(title);
                resultPopup.setText(data.text);
                resultPopup.open();
            }
        });
        /* contact page */
        var feedbackForm = new Form({
            $form: $(".form.feedback"),
            onComplete: function (data) {
                data.status && this.reset();
                var title = data.status ? "Сообщение" : "Ошибка";
                resultPopup.setTitle(title);
                resultPopup.setText(data.text);
                resultPopup.open();
            }
        });

        /* blog page */
        var blog = new Blog({
            $wrap: $(".posts")
        });

        /* seo page */
        var seo = new Seo({
            $wrap: $(".page.seo")
        });

        /* team page */
        var team = new Team({
            $wrap: $(".team-wrap")
        });

        $(".team").on("click", ".plusone", function (event) {
            sendResumePopup.open();
            event.stopPropagation();
        });

        var sendResumeForm = new Form({
            $form: $(".form.send-resume"),
            showPreloader: true,
            onComplete: function (data) {
                if (data.status) {
                    this.reset();
                } else {

                }
                this.options.showResultMessage(data);
            },
            showResultMessage: function (data) {
                var $mainMessage = this.$form.find(".main-message");
                var $resMessage = this.$form.find(".result-message");
                var $messageWrap = this.$form.find(".message-wrap");

                $resMessage.find(".text").text(data.text);
                $messageWrap.height($mainMessage.height());

                $mainMessage.hide();
                $resMessage.addClass("active");

                $messageWrap.height($resMessage.height());
            },
            resetFormMessage: function () {
                var $mainMessage = this.$form.find(".main-message");
                var $resMessage = this.$form.find(".result-message");

                var $messageWrap = this.$form.find(".message-wrap");
                $resMessage.removeClass("active");
                $resMessage.find(".text").text("");
                $mainMessage.show();
                $messageWrap.css({ height: "auto" });
            }
        });

        var sendResumePopup = new Popup({
            $popup: $(".send-resume.popup"),
            onCloseComplete: function() {
                sendResumeForm.reset();
                sendResumeForm.options.resetFormMessage();
            }
        });
    }

    if ($(window).scrollTop() > 100) {
        $('.pw.seo header.header').addClass('fixed');
    }
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.pw.seo .greetings .arrow').addClass('hide');
            $('.pw.seo header.header').addClass('fixed');
        } else {
            $('.pw.seo .greetings .arrow').removeClass('hide');
            $('.pw.seo header.header').removeClass('fixed');
        }
    });

    if($('.seo-slider').length) {
        $('.seo-slider').slick({
            centerMode: true,
            centerPadding: '22.8%',
            prevArrow: '<div class="slick-prev"></div>',
            nextArrow: '<div class="slick-next"></div>',
            speed: 1000,
            infinite: false
        })
            .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                if (currentSlide === nextSlide) return;
                $($('.seo-slider .slide-wrap .text')[nextSlide]).addClass('show-slide-text');
                $($('.seo-slider .slide-wrap .text')[nextSlide]).removeClass('hide-slide-text');
                $($('.seo-slider .slide-wrap .text')[currentSlide]).addClass('hide-slide-text');
                $($('.seo-slider .slide-wrap .text')[currentSlide]).removeClass('show-slide-text');
                if (currentSlide > 0) $($('.seo-slider .slide-wrap .logo-wrap')[currentSlide - 1]).removeClass('slick-precurrent');
                if (nextSlide > 0) $($('.seo-slider .slide-wrap .logo-wrap')[nextSlide - 1]).addClass('slick-precurrent');
            });
    }
    if ($('.not-found').length) {
        var feedbackForm = new Form({
            $form: $(".form.feedback"),
            onComplete: function (data) {
                data.status && this.reset();
                var title = data.status ? "Сообщение" : "Ошибка";
                resultPopup.setTitle(title);
                resultPopup.setText(data.text);
                resultPopup.open();
            }
        });
    }

});

function setFaviconRetina() {
    var retina = window.devicePixelRatio > 1 ? true : false;
    var link;
    if (retina) {
        link = '<link rel="icon" href="/local/templates/justlook/images/favicon-32.png?123" sizes="32x32"/>';
        $("head").prepend(link);
    }
};
