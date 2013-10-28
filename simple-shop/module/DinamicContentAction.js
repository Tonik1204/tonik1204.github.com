'use strict';
	
    var afterTableLoadAction = (function ($, Mediator) {
        var mediator = new Mediator();

        function setScrollCart() {
            if (Math.ceil($('.cart').height()) >= $(window).height()) {
                $('.cart').height($(window).height());
            }
            else {
                $('.cart').height('');
            }
        }

        function smallMenuCounter(valueToRemove) {
            var total = 0;
            var items = 0;

            if (valueToRemove) {
                $('.Items').text(
						parseInt($('.Items').text()) - valueToRemove
                    );
            } else {
                $('.cart td:nth-child(3)').each(function () {
                    items += parseInt($(this).text());
                });
                $('.Items').text(items);
            }
            $('.cartTab td:nth-child(3)').each(function () {
                total += parseInt($(this).text()) * parseInt($(this).prev().text());
            });
            $('.Total').text(total + ' $');
        }

        function removeAction() {
            $('.Remove').off();
            $('.Remove').on('click', function () {
                var staffToRemove = $(this).closest('tr');
                var valueToRemove = parseInt(staffToRemove.find('.cartInpt').val());
                var currStafQuantity = staffToRemove.find('td:nth-child(3)').text();
                var newQuantity = 0;
                if (valueToRemove >= parseInt(currStafQuantity)) {
                    staffToRemove.remove();
                    valueToRemove = parseInt(currStafQuantity);
                } else {
                    newQuantity = parseInt(currStafQuantity) - valueToRemove;
                    staffToRemove.find('td:nth-child(3)').text(newQuantity);
                }
                smallMenuCounter(valueToRemove);
                setScrollCart();
                mediator.__publish('TableToJSON', $('.cart table'));
            });
        }

        function cartTableMaker(choosenStafCopy, newQuantity, currStafQuantity) {
            var currStafName = choosenStafCopy.find('td:first-child').text();
            var removeButn = $('<img class="butn Remove" src="simple-shop/data/img/Remove.png" alt="Remove"/>');
            var quantBalance = parseInt(currStafQuantity.text()) - newQuantity;
            var staffNameInCart = $('.cartTab td:first-child');
            var hasSuchName = false;
            var currStaffQuanInCart;

            if (staffNameInCart.length) {
                staffNameInCart.each(function () {
                    var self = $(this);

                    if (self.text() === currStafName) {
                        hasSuchName = true;
                        quantBalance -= parseInt(self.siblings('td:nth-child(3)').text());
                        currStaffQuanInCart = self.siblings('td:nth-child(3)').text();
                        currStaffQuanInCart = parseInt(currStaffQuanInCart) + newQuantity;

                        if (quantBalance >= 0) {
                            self.siblings('td:nth-child(3)').text(currStaffQuanInCart);
                            smallMenuCounter();
                            removeAction();
                            setScrollCart();
                            mediator.__publish('TableToJSON', $('.cart table'));
                        }
                    }
                });
                if (!hasSuchName && quantBalance >= 0) {
                    currStafQuantity.text(newQuantity);
                    choosenStafCopy.find('img').replaceWith(removeButn);
                    $('.cart tbody').append(choosenStafCopy);
                    smallMenuCounter();
                    removeAction();
                    setScrollCart();
                    mediator.__publish('TableToJSON', $('.cart table'));
                }
            } else {
                currStafQuantity.text(newQuantity);
                choosenStafCopy.find('img').replaceWith(removeButn);
                $('.cart tbody').append(choosenStafCopy);
                smallMenuCounter();
                removeAction();
                setScrollCart();
                mediator.__publish('TableToJSON', $('.cart table'));
            }

        }

        mediator.subscribe('LoadRemoveAction', function () {
            removeAction();
            smallMenuCounter();
        });

        return function () {
            var inputs = $('.inpt');

            $('.Buy').on('click', function () {
                var choosenStafCopy = $(this).closest('tr').clone(true);
                var input = choosenStafCopy.find('.inpt');
                var newQuantity = parseInt(input.val());
                var currStafQuantity = choosenStafCopy.find('td:nth-child(3)');
                input.addClass('cartInpt');
                if (newQuantity <= parseInt(currStafQuantity.text())) {
                    cartTableMaker(choosenStafCopy, newQuantity, currStafQuantity);
                }
            });

            inputs.on('keyup', function () {
                var self = $(this);
                var quantity = parseInt(self.parent().prev().text());
                if ((/\D/.test(self.val())) || (parseInt(self.val()) < 1)) {
                    self.val(1);
                } else {
                    if (parseInt(self.val()) > quantity) {
                        self.val(quantity);
                    }
                }
            });

            inputs.on('blur', function () {
                if ($(this).val() === "") {
                    $(this).val(1);
                }
            });
        };

    } (window.jQuery, Mediator)); 
