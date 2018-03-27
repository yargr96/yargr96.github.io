function getDimensions(b) {
    var a = new Image();
    a.src = b.css("background-image").replace(/url\(|\)$|"/ig, "");
    return {
        width: a.width,
        height: a.height
    };
}

function validateEmail(a) {
    var b = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
    return b.test(a);
}

function validatePhone(a) {
    if (a.length < 6) {
        return false;
    }
    return true;
}

function validateForm(b) {
    var a = true;
    $(".tipsy").remove();
    $(b).find(".b-form-input-field").each(function() {
        var c = $(this);
        if ($(c).val().length < 1) {
            if ($(c).hasClass("b-form-input_required")) {
                $(c).attr("title", "Заполните данное поле!");
                $(c).tipsy("show");
                $(c).parents(".b-form-input").addClass("b-form-input_error");
                a = false;
            }
        } else {
            if ($(c).hasClass("b-form-input_required_email") && !validateEmail($(c).val())) {
                $(c).attr("title", "Введите корректный email!");
                $(c).tipsy("show");
                $(c).parents(".b-form-input").addClass("b-form-input_error");
                a = false;
            }
            if ($(c).hasClass("b-form-input_required_phone") && !validatePhone($(c).val())) {
                $(c).attr("title", "Введите корректный телефон!");
                $(c).tipsy("show");
                $(c).parents(".b-form-input").addClass("b-form-input_error");
                a = false;
            }
        }
    });
    return a;
}
$(document).ready(function() {
    var d = {
        BD: "880",
        BE: "32",
        BF: "226",
        BG: "359",
        BA: "387",
        BB: "+1-246",
        WF: "681",
        BL: "590",
        BM: "+1-441",
        BN: "673",
        BO: "591",
        BH: "973",
        BI: "257",
        BJ: "229",
        BT: "975",
        JM: "+1-876",
        BV: "",
        BW: "267",
        WS: "685",
        BQ: "599",
        BR: "55",
        BS: "+1-242",
        JE: "+44-1534",
        BY: "375",
        BZ: "501",
        RU: "7",
        RW: "250",
        RS: "381",
        TL: "670",
        RE: "262",
        TM: "993",
        TJ: "992",
        RO: "40",
        TK: "690",
        GW: "245",
        GU: "+1-671",
        GT: "502",
        GS: "",
        GR: "30",
        GQ: "240",
        GP: "590",
        JP: "81",
        GY: "592",
        GG: "+44-1481",
        GF: "594",
        GE: "995",
        GD: "+1-473",
        GB: "44",
        GA: "241",
        SV: "503",
        GN: "224",
        GM: "220",
        GL: "299",
        GI: "350",
        GH: "233",
        OM: "968",
        TN: "216",
        JO: "962",
        HR: "385",
        HT: "509",
        HU: "36",
        HK: "852",
        HN: "504",
        HM: " ",
        VE: "58",
        PR: "+1-787 and 1-939",
        PS: "970",
        PW: "680",
        PT: "351",
        SJ: "47",
        PY: "595",
        IQ: "964",
        PA: "507",
        PF: "689",
        PG: "675",
        PE: "51",
        PK: "92",
        PH: "63",
        PN: "870",
        PL: "48",
        PM: "508",
        ZM: "260",
        EH: "212",
        EE: "372",
        EG: "20",
        ZA: "27",
        EC: "593",
        IT: "39",
        VN: "84",
        SB: "677",
        ET: "251",
        SO: "252",
        ZW: "263",
        SA: "966",
        ES: "34",
        ER: "291",
        ME: "382",
        MD: "373",
        MG: "261",
        MF: "590",
        MA: "212",
        MC: "377",
        UZ: "998",
        MM: "95",
        ML: "223",
        MO: "853",
        MN: "976",
        MH: "692",
        MK: "389",
        MU: "230",
        MT: "356",
        MW: "265",
        MV: "960",
        MQ: "596",
        MP: "+1-670",
        MS: "+1-664",
        MR: "222",
        IM: "+44-1624",
        UG: "256",
        TZ: "255",
        MY: "60",
        MX: "52",
        IL: "972",
        FR: "33",
        IO: "246",
        SH: "290",
        FI: "358",
        FJ: "679",
        FK: "500",
        FM: "691",
        FO: "298",
        NI: "505",
        NL: "31",
        NO: "47",
        NA: "264",
        VU: "678",
        NC: "687",
        NE: "227",
        NF: "672",
        NG: "234",
        NZ: "64",
        NP: "977",
        NR: "674",
        NU: "683",
        CK: "682",
        XK: "",
        CI: "225",
        CH: "41",
        CO: "57",
        CN: "86",
        CM: "237",
        CL: "56",
        CC: "61",
        CA: "1",
        CG: "242",
        CF: "236",
        CD: "243",
        CZ: "420",
        CY: "357",
        CX: "61",
        CR: "506",
        CW: "599",
        CV: "238",
        CU: "53",
        SZ: "268",
        SY: "963",
        SX: "599",
        KG: "996",
        KE: "254",
        SS: "211",
        SR: "597",
        KI: "686",
        KH: "855",
        KN: "+1-869",
        KM: "269",
        ST: "239",
        SK: "421",
        KR: "82",
        SI: "386",
        KP: "850",
        KW: "965",
        SN: "221",
        SM: "378",
        SL: "232",
        SC: "248",
        KZ: "7",
        KY: "+1-345",
        SG: "65",
        SE: "46",
        SD: "249",
        DO: "+1-809 and 1-829",
        DM: "+1-767",
        DJ: "253",
        DK: "45",
        VG: "+1-284",
        DE: "49",
        YE: "967",
        DZ: "213",
        US: "1",
        UY: "598",
        YT: "262",
        UM: "1",
        LB: "961",
        LC: "+1-758",
        LA: "856",
        TV: "688",
        TW: "886",
        TT: "+1-868",
        TR: "90",
        LK: "94",
        LI: "423",
        LV: "371",
        TO: "676",
        LT: "370",
        LU: "352",
        LR: "231",
        LS: "266",
        TH: "66",
        TF: "",
        TG: "228",
        TD: "235",
        TC: "+1-649",
        LY: "218",
        VA: "379",
        VC: "+1-784",
        AE: "971",
        AD: "376",
        AG: "+1-268",
        AF: "93",
        AI: "+1-264",
        VI: "+1-340",
        IS: "354",
        IR: "98",
        AM: "374",
        AL: "355",
        AO: "244",
        AQ: "",
        AS: "+1-684",
        AR: "54",
        AU: "61",
        AT: "43",
        AW: "297",
        IN: "91",
        AX: "+358-18",
        AZ: "994",
        IE: "353",
        ID: "62",
        UA: "380",
        QA: "974",
        MZ: "258"
    };
    $(document).on("keydown", ".b-form-input_required_phone", function(m) {
        if ($.inArray(m.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (m.keyCode == 65 && m.ctrlKey === true) || (m.keyCode >= 35 && m.keyCode <= 39)) {
            return;
        }
        if ((m.shiftKey || (m.keyCode < 48 || m.keyCode > 57)) && (m.keyCode < 96 || m.keyCode > 105)) {
            m.preventDefault();
        }
    });
    $(document).on("keyup", ".b-form-input_required_phone", function(n) {
        if ($(this).val().charAt(0) != "+") {
            $(this).val("+" + $(this).val());
        }
        if ($.inArray(n.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || (n.keyCode == 65 && n.ctrlKey === true) || (n.keyCode >= 35 && n.keyCode <= 39)) {
            return;
        }
        var m = $(this);
        $.each(d, function(o, p) {
            if ($(m).val().indexOf("+" + p) === 0 && p) {
                $(m).val(formatInternational(o, $(m).val()));
            }
        });
    });
    $(document).on({
            mouseenter: function() {
                $(this).parent(".b-form-input").addClass("b-form-input_hover");
            },
            mouseleave: function() {
                $(this).parent(".b-form-input").removeClass("b-form-input_hover");
            }
        },
        ".b-form-input input");
    $(document).on("focus", ".b-form-input input, .b-form-input textarea", function(m) {
        $(this).parent(".b-form-input").addClass("b-form-input_focus");
        $(this).parent(".b-form-input").removeClass("b-form-input_error");
    });
    $(document).on("blur", ".b-form-input input, .b-form-input textarea", function(m) {
        $(this).parent(".b-form-input").removeClass("b-form-input_focus");
    });
    $(document).on({
            mouseenter: function() {
                $(this).parent(".b-button").addClass("b-button_hover");
            },
            mouseleave: function() {
                $(this).parent(".b-button").removeClass("b-button_hover");
            }
        },
        ".b-button-i");
    $(document).on("click", ".b-button-i", function(m) {
        var n = $(this);
        $(n).parent(".b-button").addClass("b-button_active");
        setTimeout(function() {
                $(n).parent(".b-button").removeClass("b-button_active");
            },
            800);
    });
    $(".i-lazy").lazyload({
        effect: "fadeIn"
    });
    var l = function(m) {
        if (m !== true) {
            m = false;
        }
        if (iOS()) {
            $("#svg_filters").remove();
        }
        if (!window.mobilecheck()) {
            $(".b-form-input").tipsy({
                trigger: "manual",
                gravity: "w",
                fade: true
            });
            $(".ntip").tipsy({
                gravity: "s",
                fade: true
            });
            $(".stip").tipsy({
                gravity: "n",
                fade: true
            });
            $(".etip").tipsy({
                gravity: "w",
                fade: true
            });
            $(".wtip").tipsy({
                gravity: "e",
                fade: true
            });
            $(".formtip").tipsy({
                gravity: "s",
                fade: true,
                trigger: "focus"
            });
            $(".formtip_h").tipsy({
                gravity: "e",
                fade: true,
                trigger: "focus"
            });
            $(".b-ordercall-form-variant .formtip_h2").tipsy({
                gravity: "e",
                fade: true,
                trigger: "focus"
            });
            $(".formtip_h2").tipsy({
                gravity: "w",
                fade: true,
                trigger: "focus"
            });
            if (!m) {
                new WOW().init();
            }
        } else {
            $(".formtip").tipsy({
                gravity: "s",
                fade: true,
                trigger: "focus"
            });
            $(".formtip_h2").tipsy({
                gravity: "s",
                fade: true,
                trigger: "focus"
            });
        }
    };
    l();
    //slider
    var i = 10000;
    var c = false;
    var e = [];
    var b = 0;
    $(".slider-buttons_item").circleProgress({
        value: 0,
        size: 22,
        thickness: 3,
        fill: {
            color: "#ffb71d"
        },
        emptyFill: "rgba(0, 0, 0, .0)",
        animation: {
            duration: i
        }
    });
    $(".b-block_header-slides__item-play-i").circleProgress({
        value: 0,
        size: 77,
        thickness: 2,
        fill: {
            color: "rgba(255,255,255,0.25)"
        },
        emptyFill: "rgba(0, 0, 0, .0)",
        animation: {
            duration: i
        }
    });
    $(".slider-buttons_item_active").circleProgress("value", 1);
    $(".b-block_header-slides__item_active .b-block_header-slides__item-play-i").circleProgress("value", 1);
    $(".b-block-content").addClass("b-block-content_active");
    $(".b-block_header-slides__item-info_hidden").removeClass("b-block_header-slides__item-info_hidden");
    $(document).on("click", ".slider-buttons_item", function(n) {
        $(".b-block_header-slides__item_active").removeClass("b-block_header-slides__item_active");
        $(".slider-buttons_item_active").removeClass(".slider-buttons_item_active");
        $(".background-container_item-" + $(this).attr("data-id")).addClass("background-container_item_active");
        $(this).addClass("slider-buttons_item_active");
        $(".b-block_header-current-val").text("0" + ($(this).index() + 1));
        $(".slider-buttons_item").circleProgress("animation", {
            duration: 500
        });
        $(".slider-buttons_item").circleProgress("value", 0);
        $(".slider-buttons_item_active").circleProgress("animation", {
            duration: i
        });
        $(".slider-buttons_item_active").circleProgress("value", 1);
        $(".b-block_header-slides__item-play-i").circleProgress("animation", {
            duration: 500
        });
        $(".b-block_header-slides__item-play-i").circleProgress("value", 0);
        $(".b-block_header-slides__item_active .b-block_header-slides__item-play-i").circleProgress("animation", {
            duration: i
        });
        $(".b-block_header-slides__item_active .b-block_header-slides__item-play-i").circleProgress("value", 1);
        for (var m = 0; m < e.length; m++) {
            clearTimeout(e[m]);
        }
        e = [];
        e.push(setTimeout(function() {
                h();
            },
            i));
    });

    function h() {
        if (!c) {
            var m = ($(".slider-buttons_item_active").next().length > 0 ? $(".slider-buttons_item_active").next() : $(".slider-buttons_item:first"));
            $(m).click();
        }
        e.push(setTimeout(function() {
                h();
            },
            i));
    }
    e.push(setTimeout(function() {
            h();
        },
        i));
    var k = 2270;
    var j = 1600;
    var a = k;
    var g = function() {
        var n = $(document).width() / j;
        var m = k * n;
        a = m;
        $(".b-block_cases__page").height(m);
    };
    var f = function() {
        if ($(".b-block_cases-more").visible(true)) {
            $(".b-block_cases-more").addClass("b-block_cases-more_hidden");
        }
    };
    g();
    $(window).resize(function(m) {
        g();
    });
    f();
    $(window).scroll(function(m) {
        f();
    });
    $(".b-ordercall-form_case-preview-i2").niceScroll({
        cursorcolor: "#f5c84a"
    });
    $(window).scroll(function() {
        $(".tipsy").remove();
    });
    $(document).on("submit", ".i-order-form", function(o) {
        o.preventDefault();
        var q = $(this).serialize();
        var p = $(this);
        var m = "ORDER";
        var n = new Date().getTime();
        if (!iOS()) {
            $(p).parents(".b-ordercall-form").removeClass("bounce");
            $(p).parents(".b-ordercall-form").removeClass("fadeInDownBig");
            $(p).parents(".b-ordercall-form").removeClass("animated");
        }
        if (validateForm(p)) {
            $(".i-loader").show();
            $.ajax({
                type: "POST",
                url: "1/php/order.php",
                data: q,
                success: function(r) {
                    if (r == "sended") {
                        try {
                            yaCounter43873474.reachGoal(m);
                        } catch (t) {}
                        var s = new Date().getTime();
                        $(".i-loader").hide();
                        if (!iOS()) {
                            $(p).parents(".b-ordercall-form").addClass("fadeOutRightBig");
                            $(p).parents(".b-ordercall-form").addClass("animated");
                        }
                        setTimeout(function() {
                                $(p).find(".b-form-input-field").val("");
                                $(p).parents(".b-ordercall-form").hide();
                                $(p).parents(".b-ordercall-form").removeClass("fadeOutRightBig");
                                $(p).parents(".b-ordercall-form").removeClass("animated");
                            },
                            (iOS() ? 0 : 300));
                        setTimeout(function() {
                                $(".i-order_call-h").click();
                            },
                            (s - n < 300 ? 300 - (s - n) : 0));
                    } else {
                        var s = new Date().getTime();
                        $(".i-loader").hide();
                        if (!iOS()) {
                            $(p).parents(".b-ordercall-form").addClass("fadeOutRightBig");
                            $(p).parents(".b-ordercall-form").addClass("animated");
                        }
                        setTimeout(function() {
                                $(p).parents(".b-ordercall-form").hide();
                                $(p).parents(".b-ordercall-form").removeClass("fadeOutRightBig");
                                $(p).parents(".b-ordercall-form").removeClass("animated");
                            },
                            (iOS() ? 0 : 300));
                        setTimeout(function() {
                                $(".i-order_call-h2").click();
                            },
                            (s - n < 300 ? 300 - (s - n) : 0));
                    }
                }
            });
        } else {
            if (!iOS()) {
                if (!mobilecheck()) {
                    $(p).parents(".b-ordercall-form").addClass("bounce");
                }
                $(p).parents(".b-ordercall-form").addClass("animated");
                setTimeout(function() {
                        $(p).parents(".b-ordercall-form").removeClass("bounce");
                        $(p).parents(".b-ordercall-form").removeClass("fadeInRightBig");
                        $(p).parents(".b-ordercall-form").removeClass("animated");
                    },
                    (mobilecheck() ? 0 : 1000));
            }
        }
        return false;
    });
});
