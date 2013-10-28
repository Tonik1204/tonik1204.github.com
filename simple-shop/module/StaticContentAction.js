'use strict';
	
    var contentAction = (function (document, $, Mediator) {
        var mediator = new Mediator();
        var cartClickCounter = 0;
        var hiden = $('.hide');
        var categories = $('.categories li');

        categories.on('click', 'a', function () {
            document.cookie = 'activeCategory=' + this.href;
            var clickedCategoryLink = $(this);
            var url = "data/db/" + clickedCategoryLink.html() + ".json";
            categories.removeClass('active');
            clickedCategoryLink.parent().addClass('active');

            $.getJSON(url, function (dataJSON) {
                mediator.__publish('JSONisReady', dataJSON);
            });
        });

        $('.mainTab .sorted').on('click', function () {
            mediator.__publish('TimeToSort', $(this));
        });

        $('.cartTab .sorted').on('click', function () {
            mediator.__publish('TimeToSort', $(this));
        });

        $('.cartOpener').on('click', function () {
            var cartTable = $('.cartTab tbody');
            if (cartClickCounter % 2) {
                $(this).attr('colspan', '0');
                hiden.addClass('hide');
                cartTable.addClass('hide');
                $('.cart').height('');
            } else {
                $(this).attr('colspan', '4');
                hiden.removeClass('hide');
                cartTable.removeClass('hide');
                if ($('.cart').height() > $(window).height()) {
                    $('.cart').height($(window).height());
                }
            }
            cartClickCounter++;
        });

    } (document, window.jQuery, Mediator));

    var setActiveCategoryAndCart = (function (document, $, RegExp) {
        var resultHref, reg;
        var categories = $('ul li a');
        resultHref = document.cookie.match(/(?:activeCategory)(.+?)(?=;|$)/g);
        categories.each(function () {
            reg = new RegExp('#' + $(this).text() + '');
            if (reg.test(resultHref)) {
                $('.categories li').removeClass('active');
                $(this).parent().addClass('active');
            }
        });
    } (document, window.jQuery, window.RegExp));
