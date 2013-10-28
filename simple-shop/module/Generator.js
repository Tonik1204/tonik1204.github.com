'use strict';
	
    var contentGenerate = (function ($, Mediator, ShopTableMaker, afterTableLoadAction, sortTable) {
        var mediator = new Mediator();
        var url = "simple-shop/data/db/" + $('.active').children().text() + ".json";
        var cartJSON = /(?:cartJSON=)(.+?)(?=;|$)/g.exec(document.cookie);

        mediator.subscribe('JSONisReady', function (data, elem) {			
			if (elem === undefined || elem.closest('table').hasClass('mainTab')) {
				new ShopTableMaker(data, elem);
				afterTableLoadAction();
			} else {
				new ShopTableMaker(data, elem);
				mediator.__publish('LoadRemoveAction');
			}
        });
        mediator.subscribe('TimeToSort', function (elem) {
            sortTable(elem);
        });

        $.getJSON(url, function (dataJSON) {
            mediator.__publish('JSONisReady', dataJSON);
        });
        if (cartJSON) {
            cartJSON = JSON.parse(cartJSON[1]);
            mediator.__publish('JSONisReady', cartJSON, $('.cart tbody'));
            $('.cart tbody').addClass('hide');
        }
    } (window.jQuery, Mediator, ShopTableMaker, afterTableLoadAction, sortTable));
