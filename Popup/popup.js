/*
	Для создания метода makePopup у jQuery объектов и работы с ним, достаточно запустить этот код,
	на любой страничке, где есть jQuery.
	Пример работы с методом: 
	1) $('селектор').makePopup({'height': 150, 'animationFrom':'element'})- по клику на первый элемент из выборки $('селектор'),
	создает попап с анимацией от элемента и высотой окна попапа 150px.
	2) $('селектор').makePopup('show', {'width': '100px','animationFrom':'center'}) - сразу показывает созданный попап,
	с анимацией из центра и шириной окна 100px.
	3) $('селектор').makePopup('close') - закрывает открытый попап.
	4) $('селектор').makePopup() - по клику на елемент открывает попап, с анимацией из центра.
*/

var Popup = (function ($) {
	'use strict';
        function PopupMaker(collection, params) {
			this.targetElem = collection.eq(0);
			this.selector = collection.selector;
			this.cloneTarget = this.targetElem.clone();
			this.popup = $('[data-selector = "'+ this.selector +'"]');
			this.action = false;
			this.settings = false;
			
			switch (params.length) {
                    case 1:
						if (typeof params[0] === 'string') {
							this.action = params[0];
						} else {
							this.settings = params[0];
						}
                        break;
					case 2:
						this.action = params[0];
						this.settings = params[1];
                        break;
			}
			this.setSize();
			this.create();
			this.setAction();
        };
		
		PopupMaker.prototype.setSize = function () {
			var self = this;
			this.closeBtnSize = 15;
			this.elemHeight = parseInt(this.settings['height']) || this.targetElem.height();
			this.elemWidth = parseInt(this.settings['width']) || this.targetElem.width();

			this.windowHeight = $( window ).height();
			this.windowWidth = $( window ).width();

			if (this.elemHeight > this.windowHeight) {
				this.elemHeight = this.windowHeight;
			}
			if (this.elemWidth > this.windowWidth) {
				this.elemWidth = this.windowWidth;
			}
			this.cloneTarget.height(this.elemHeight);
			this.cloneTarget.width(this.elemWidth);
			this.elemHeight += this.closeBtnSize*2;
			this.elemWidth += this.closeBtnSize*2;
		};
		
		function rePosition(self, wrap) {
			var wind = $(this);
			wrap.css({
				'top' : '' + (wind.height()/2 - self.elemHeight/2) + 'px',
				'left' : '' + (wind.width()/2 - self.elemWidth/2) + 'px'
			});
		};
		
		PopupMaker.prototype.create = function () {
			var self = this;
			this.popupWrap = $('<div></div>').css({
				'background' : 'rgba(173, 192, 226, 0.7)',
				'border' : '1px solid blue',
				'border-radius' : '10px',
				'position' : 'fixed',
				'top' : '' + (this.windowHeight/2 - this.elemHeight/2) + 'px',
				'left' : '' + (this.windowWidth/2 - this.elemWidth/2) + 'px',
				'height' : '' + this.elemHeight + 'px',
				'width' : '' + this.elemWidth + 'px',
				'z-index' : '10000'
			});
			this.popupBack = $('<div data-selector="'+ this.selector +'"></div>').css({ 
				'display' : 'none',
				'background' : 'rgba(128, 128, 128, 0.7)',
				'position' : 'fixed',
				'left' : '0',
				'top' : '0',
				'height' : '100%',
				'width' : '100%',
				'z-index' : '9999'
			});
			this.popupCloseBtn = $('<div class="popup-close">X</div>').css({ 
				'color' : 'white',
				'border-radius' : '10px',
				'cursor' : 'pointer',
				'background' : 'blue',
				'font-size': '13px',
				'text-align': 'center',
				'font-style': 'normal',
				'float' : 'right',
				'height' : '15px',
				'width' : '15px',
				'z-index' : '10001'
			});
			this.cloneTarget.css({
				'border' : '1px solid grey',
				'position' : 'absolute',
				'overflow' : 'hidden',
				'border-radius' : '10px',
				'top' : '14px',
				'left' : '14px',
				'padding' : '0',
				'margin' : '0',
				'background-color' : 'rgba(250, 250, 250, 1.0)',
				'z-index' : '10001'
			});
			this.popupWrap.append(this.popupCloseBtn);
			this.popupBack.append(this.popupWrap);
			this.popupWrap.prepend(this.cloneTarget);
			
			$( window ).bind('resize', function() {
				rePosition.call(this, self, self.popupWrap);
			});
		};
		
		PopupMaker.prototype.addCloseAction = function () {
			var self = this;
			this.popupBack.bind('click', function(event) {
				event = event || window.event;
				var target = event.target || event.srcElement;
				if ($(target).attr('data-selector')) {
					self.animationClose(self.popupBack);
				}
			});
			$('.popup-close').eq(0).bind('click', function() {
					self.animationClose(self.popupBack);
			});
			$(window).bind('keyup', function(event) {
				event = event || window.event;
				if (event.keyCode === 27) {
					self.animationClose(self.popupBack);
				}
			}); 
		};
		
		PopupMaker.prototype.animationShow = function () {
			this.popupBack.fadeIn(2000);
			var animAct = this.settings['animationFrom'];
				if (!animAct || animAct === 'center') {
					this.popupWrap.css({
						'width' : 0,
						'height' : 0,
						'opacity' : 0
					});
					this.popupWrap.animate({
						'width' : this.elemWidth,
						'height' : this.elemHeight,
						'opacity' : 1
					}, 2000);
				} else if (animAct === 'element') {
					this.popupWrap.css({
						'top' : this.targetElem.offset().top - $(window).scrollTop(),
						'left' : this.targetElem.offset().left - - $(window).scrollLeft(),
						'opacity' : 0
					});
					this.popupWrap.animate({
						'top' : '' + (this.windowHeight/2 - this.elemHeight/2) + 'px',
						'left' : '' + (this.windowWidth/2 - this.elemWidth/2) + 'px',
						'opacity' : 1
					}, 2000);
				}
		};
		
		PopupMaker.prototype.animationClose = function (popup) {
			popup.fadeOut(2000);
			setTimeout(function() {
				popup.remove();
			}, 2100);	
		};
		
        PopupMaker.prototype.setAction = function () {
			var self = this;
			if (this.action === 'close') {
				this.animationClose(this.popup);
			} else if (this.action === 'show') {
					$('body').prepend(this.popupBack);
					this.addCloseAction();
					this.animationShow();
				} else {
					this.targetElem.unbind('click');
					this.targetElem.bind('click', function() {
						$('body').prepend(self.popupBack);
						self.addCloseAction();
						self.animationShow();
					});
				}
        };

        return PopupMaker;
}(window.jQuery));

jQuery.fn.makePopup = function() {
	new Popup(this, arguments);
};