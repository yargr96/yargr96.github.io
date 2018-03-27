/**
 * Created by Gosha on 02.06.2015.
 */
"use strict";
(function($) {
    $.fn.slider = function(params) {

        // slider methods
        this.toggleRestSlides = function(state, animate) {
            if (!_this.params.backCount || _this.$slides.length <= _this.params.backCount) return;

            var $restSlides = _this.$slides.slice(_this.params.backCount),
                params;
            if (state) {
                params = { scale: 1, opacity: 1 };
            } else {
                $restSlides = [].reverse.apply($restSlides);
                params = { scale: 0, opacity: 0 };
            }
            if (animate) {
                TweenMax.staggerTo($restSlides, _this.params.duration, params, 0.05);
            } else {
                TweenLite.set($restSlides, params);
            }
        };

        this.changeState = function(state, animate) {
            _this.state = state;
            if (state) {
                this.activate(animate);
            } else {
                this.deactivate(animate);
            }
            _this.params.onStateChange && _this.params.onStateChange.apply(_this, [animate]);
        };

        this.activate = function(animate) {
            var width = (_this.$slides.length - 1) * _this.params.slWidth + _this.params.currSlWidth + 10;
            $slideLine.css({ width: width + "rem" });

            _this.toggleRestSlides(true, animate);

            _this.slide(0, animate);

            $(document.body).on("keydown", _this.keyHandler);
        };

        this.deactivate = function(animate) {
            _this.toggleRestSlides(false, animate);

            _this.slide(0, animate, function() {
                var count = !_this.params.backCount || _this.$slides.length < _this.params.backCount
                    ? _this.$slides.length : _this.params.backCount;
                var width = count * _this.params.slWidth;

                $slideLine.css({ width: width + "rem" });
            });

            $(document.body).off("keydown", _this.keyHandler);
        };

        this.keyHandler = function(event) {
            switch (event.keyCode) {
                case 39: {
                    _this.slideUI(_this.currIndex + 1, true);
                    break;
                }
                case 37: {
                    _this.slideUI(_this.currIndex - 1, true);
                    break;
                }
            }
        };

        this.refreshArrow = function(state) {
            var showParams = { opacity: 1, scale: 1 },
                hideParams = { opacity: 0, scale: 0 };

            if (!state) {
                TweenMax.to([$leftArr, $rightArr], _this.params.duration, hideParams);
            } else {
                if (_this.currIndex === 0) {
                    TweenMax.to($leftArr, _this.params.duration, hideParams);
                } else {
                    TweenMax.to($leftArr, _this.params.duration, showParams);
                }
                if (_this.currIndex === _this.$slides.length - 1) {
                    TweenMax.to($rightArr, _this.params.duration, hideParams);
                } else {
                    TweenMax.to($rightArr, _this.params.duration, showParams);
                }
            }
        };

        this.activateSlide = function($slide, animate) {
            _this.params.onActivateSlide && _this.params.onActivateSlide.apply(_this, [$slide, animate]);
        };

        this.deactivateSlide = function($slide, animate) {
            _this.params.onDeactivateSlide && _this.params.onDeactivateSlide.apply(_this, [$slide, animate]);
        };

        this.slideUI = function(index, animate, callback) {
            if (index === _this.currIndex
                || index < 0
                || index >= _this.$slides.length
            ) {
                return;
            }
            _this.slide(index, animate, callback);
        };

        this.slide = function(index, animate, callback) {
            if (_this.animating) {
                return;
            }
            _this.animating = true;

            var duration = animate ? _this.params.duration : 0;

            // hide current slide
            var $currSlide = _this.currIndex !== undefined// && _this.currIndex !== index && _this.state === false
                ? $(_this.$slides[_this.currIndex])
                : undefined;
            if ($currSlide ) {
                if ($currSlide.hasClass("active")) {
                    $currSlide.removeClass("active");
                    _this.deactivateSlide($currSlide, animate);
                }
                TweenMax.to($currSlide, duration, { width: _this.params.slWidth + "rem", ease: _this.params.ease });
            }

            // move line and show new slide
            _this.moveLine(index, animate);

            var $newSlide = $(_this.$slides[index]),
                newWidth = _this.state ? _this.params.currSlWidth : _this.params.slWidth;


            newWidth += "rem";
            TweenMax.to($newSlide, duration, { width: newWidth, ease: _this.params.ease, onComplete: function() {
                callback && callback();
                _this.animating = false;
            }});

            if (_this.state) {
                $newSlide.addClass("active");
                _this.activateSlide($newSlide, animate);
            }

            _this.currIndex = index;
            _this.refreshArrow(_this.state);

        };

        this.moveLine = function(toIndex, animate) {
            //var center = $this.width() / 2;
            var leftSlidesWidth = 0;
            if (toIndex > 0) {
                leftSlidesWidth += (toIndex) * _this.params.slWidth;
            }

            var currSlideCenter;
            if (_this.state) {
                currSlideCenter = leftSlidesWidth + _this.params.currSlWidth / 2;
            } else {
                currSlideCenter = leftSlidesWidth + _this.params.slWidth / 2;
            }
            var diff = _this.params.cntWidth / 2 - currSlideCenter,
                //lineParams = { transform: "translateX(" + diff + "rem)", ease: _this.params.ease };
                lineParams = { left: diff + "rem", ease: _this.params.ease };

            if (animate) {
                TweenLite.to($slideLine, _this.params.duration, lineParams);
            } else {
                TweenLite.set($slideLine, lineParams);
            }
        };

        // save this in closure and merge params
        var _this = this,
            $this = $(this);

        _this.params = $.extend(true, {
            currSlWidth: 80,
            slWidth: 27,
            backCount: 2,
            duration: 0.7,
            cntWidth: 30,
            ease: Power2.easeInOut
        }, params);
        _this.params.duration_ms = _this.params.duration * 1000;


        // make html structure and create refs
        $this.addClass("slider");
        $this.wrapInner("<div class='slide-line' />");

        var $slideLine = $this.find(".slide-line"),
            $leftArr = $("<a href='javascript:void(0)' class='button arrow left'></a>"),
            $rightArr = $("<a href='javascript:void(0)' class='button arrow right'></a>");

        _this.$slides = $this.find(".slide");

        $this.append($leftArr);
        $this.append($rightArr);


        // create handlers
        $this.on("refresh", function(event, state) {
            _this.changeState(state, true);
        });
        $rightArr.on("click", function() {
            _this.slideUI(_this.currIndex + 1, true);
        });
        $leftArr.on("click", function() {
            _this.slideUI(_this.currIndex - 1, true);
        });
        _this.$slides.on("click", function() {
            if (!_this.state) return;
            _this.slideUI($(this).index(), true);
        });

        $slideLine.swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                if (_this.state) {
                    switch (direction) {
                        case "left": {
                            _this.slideUI(_this.currIndex + 1, true);
                            break;
                        }
                        case "right": {
                            _this.slideUI(_this.currIndex - 1, true);
                            break;
                        }
                    }
                }
            },
            threshold: 100
        });



        // init slider code
        _this.params.onInit && _this.params.onInit.apply(_this);

        var state = $this.closest(".page").hasClass("active");
        this.changeState(state, false);

        return this;
    };
})(jQuery);
