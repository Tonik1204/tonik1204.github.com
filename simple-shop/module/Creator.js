 'use strict';

    var Mediator = (function () {

        var instance;
        var events = {};
        instance = {
            subscribe: function (event_name, callback) {
                if (!events[event_name]) {
                    events[event_name] = [];
                }
                events[event_name].push(callback);
            },
            __publish: function (event_name, data, elem) {
                var callbacks;
                var i;
                callbacks = events[event_name];
                if (callbacks && callbacks.length) {
                    for (i = 0; i < callbacks.length; i += 1) {
                        callbacks[i].call(undefined, data, elem);
                    }
                }
            }
        };
        return function () {
            return instance;
        }
    } ());

    var ShopTableMaker = (function ($, Mediator) {
        var mediator = new Mediator();

        function ShopTableMaker(goodsJSON, currTable) {
            this.tableContent = currTable || $('.mainTab tbody');
            if (this.tableContent.parent().hasClass('mainTab')) {
                this.makeNewMainTable(goodsJSON);
            } else {
                this.makeNewCartTable(goodsJSON);
                mediator.__publish('TableToJSON', $('.cart table'));
            }
            
        }

        ShopTableMaker.prototype.makeNewMainTable = function (objJSON) {
            var self = this;
            this.newTable = $('<tbody></tbody>');
            $(objJSON).each(function () {
                var newTabRow = $('<tr><td>' + this['name'] + '</td><td>' + this['price'] + '</td><td>' + this['quantity'] +
                '</td><td class="act"><input type="text" value="1" class="inpt"/><img class="butn Buy" src="simple-shop/data/img/toCart.png" alt="to Cart"/></td></tr>');
                self.newTable.append(newTabRow);
            });
            this.tableContent.replaceWith(this.newTable);
        };

        ShopTableMaker.prototype.makeNewCartTable = function (objJSON) {
            var self = this;
            this.newTable = $('<tbody></tbody>');
            $(objJSON).each(function () {
                var newTabRow = $('<tr><td>' + this['name'] + '</td><td>' + this['price'] + '</td><td>' + this['quantity'] +
                '</td><td class="act"><input type="text" value="1" class="cartInpt inpt"/><img class="butn Remove" src="simple-shop/data/img/Remove.png" alt="Remove"/></td></tr>');
                self.newTable.append(newTabRow);
            });
            this.tableContent.replaceWith(this.newTable);
        };

        return ShopTableMaker;
    } (window.jQuery, Mediator));


    var sortTable = (function ($, Mediator) {
        var mediator = new Mediator();

        function getComparator(headerName) {
            var comparator = function (a, b) {
                if (a[headerName] > b[headerName]) {
                    return 1;
                } else {
                    if (a[headerName] < b[headerName]) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            };
            return comparator;
        };

        function tableToJSON(currTable) {
            var currJSON = [];
            var objInJSON = {};
            var headers = currTable.find('thead th:not(.act)');
            var info = currTable.find('tbody td:not(.act)');
            for (var i = 0; i < info.length; i) {
                headers.each(function () {
                    objInJSON[$(this).attr('data-type')] = info.eq(i).text();
                    i++;
                });
                currJSON.push($.parseJSON(JSON.stringify(objInJSON)));
            }
            return currJSON;
        }

        function sortTable(currHeader) {
            var headerName = currHeader.attr('data-type');
            var currTable = currHeader.closest('table');
            var header = currTable.find('thead th');
            var data = tableToJSON(currTable);
            if (currHeader.hasClass('az')) {
                data.sort(getComparator(headerName)).reverse();
                mediator.__publish('JSONisReady', data, currTable.find('tbody'));
                currHeader.removeClass('az');
            } else {
                data.sort(getComparator(headerName));
                mediator.__publish('JSONisReady', data, currTable.find('tbody'));
                header.removeClass('az');
                currHeader.addClass('az');
            }
        }
        mediator.subscribe('TableToJSON', function (elem) {
            var cartJSON = tableToJSON(elem);
            document.cookie = 'cartJSON=' + JSON.stringify(cartJSON);
        });
        return sortTable;
    } (window.jQuery, Mediator));
