'use strict';

    /* Создание модуля MyGallery */
    var MyGallery = (function () {
	
	/* ------------------------myTools---------------------------- */
        function addEvent(obj, event_name, handler) {
            if (obj.addEventListener) {
                obj.addEventListener(event_name, handler, false);
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + event_name, handler);
				if(event_name='mouseover'){
					event_name='mouseenter';
				}
				else if(event_name='mouseout'){
					event_name='mouseleave';
				}
            }
        }

        function mouseEnter(handler) {

            return function (e) {
                e = e || event; 
                var toElement = e.relatedTarget || e.srcElement; 
                while (toElement && toElement !== this) {
                    toElement = toElement.parentNode;
                }
                if (toElement == this) { 
                    return;
                }
                return handler.call(this, e);
            };
        }

        function mouseLeave(handler) {

            return function (e) {
                e = e || event; 
                var toElement = e.relatedTarget || e.toElement; 
                while (toElement && toElement !== this) {
                    toElement = toElement.parentNode;
                }
                if (toElement == this) { 
                    return; 
                }
                return handler.call(this, e);
            };
        }
		
			function removeEvent(obj, event_name, handler) {
				if (obj.removeEventListener) {
					obj.removeEventListener(event_name, handler, false);
				} else {
					obj.detachEvent('on' + event_name, handler);
				}
			}

        function hasClass(el, name) {
            return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
        }

        function addClass(el, name) {
            if (!hasClass(el, name)) {
                el.className += (el.className ? ' ' : '') + name;
            }
        }

        function removeClass(el, name) {
            if (hasClass(el, name)) {
                el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
            }
        }

        function getStyle(selector, styleProp) {
            var elem = document.querySelector(selector);
            if (elem.currentStyle)
                var value = elem.currentStyle[styleProp];
            else if (window.getComputedStyle)
                var value = document.defaultView.getComputedStyle(elem, null).getPropertyValue(styleProp);
            return value;
        }

        function prevDef(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        }
		
//----------------------------------MAIN PART-------------------------------------------------------
       
        function MyGalleryConstuctor(selector) {
            var self = this;
            this.numOfGalleries = document.querySelectorAll(selector).length;
            this.containersArr = document.querySelectorAll(selector);
            this.bigPicsArr = document.querySelectorAll('.bigPic');
            this.smallPicsDIVArr = document.querySelectorAll('.smallPic');
            this.smallPicsULArr = [];
            for (var i = 0; i < this.numOfGalleries; i++) {
                this.smallPicsULArr[i] = this.smallPicsDIVArr[i].getElementsByTagName("ul")[0].children;
                addClass(this.containersArr[i], "noactive");
            } /* Переменные, необходимые для правильного размещения галерей на страничке*/
            this.PADDING = 10;
            this.BORDER_SIZE = 5;
            this.CONTAINER_WIDTH = document.documentElement.clientWidth / 2;
            this.CONTAINER_HEIGHT = document.documentElement.clientHeight * (3 / 4);
            this.ARROW_WIDTH = document.querySelector('.arrow').scrollWidth;
            /* Обработка всех действий происходит внутри конструктора*/
            for (var i = 0; i < this.numOfGalleries; i++) {
                addEvent(this.containersArr[i], 'mouseover', mouseEnter(keyAction));
                addEvent(this.containersArr[i], 'mouseout', mouseLeave(keyStop));
            }

            function clickAction(event) {
                prevDef(event);
                if (hasClass(event.target, "right")) {
                    self.back();
                }
                else if (hasClass(event.target, "left")) {
                    self.next();
                }
                else if (event.target.nodeName === "IMG") {
                    var currentBigPic = document.querySelector('.current').querySelector('img');
                    currentBigPic.src = event.target.src;
                }
            }
            function keyEvent(e) {
                self.keyboardAction(e, self);
            }
            function keyAction() {
                addClass(this, "current");
                removeClass(this, "noactive");
                addEvent(document.documentElement, 'keydown', keyEvent);
            }
            function keyStop() {
                removeClass(this, "current");
                addClass(this, "noactive");
				removeEvent(document.documentElement, 'keydown', keyEvent);
                clearInterval(self.timer);
                self.setTimer(self);
            }
            addEvent(document, 'click', clickAction);
            /*Вызов необходимых методов, для отображения и корректной работы галерей(решил вывать внутри модуля)*/
            this.show(self);
            this.setTimer(self);
        }

        MyGalleryConstuctor.prototype.setTimer = function (self) {

            self.timer = setInterval(function () {
                self.next(self);
            }, 5000);
        }

        MyGalleryConstuctor.prototype.next = function (self) {

            if (arguments.length === 0) {
                var imgs = document.querySelector('.current').querySelectorAll('li img');
                var newSrc;
                for (var i = imgs.length - 2; i >= 0; i--) {
                    newSrc = imgs[imgs.length - 1].src;
                    imgs[imgs.length - 1].src = imgs[i].src;
                    imgs[i].src = newSrc;
                }
            }
            else {
                var noactiveImgs = document.querySelectorAll('.noactive');
                for (var j = 0; j < noactiveImgs.length; j++) {
                    var imgs = noactiveImgs[j].querySelectorAll('li img');
                    var newSrc;
                    for (var i = 0; i < imgs.length - 1; i++) {
                        newSrc = imgs[i].src;
                        imgs[i].src = imgs[imgs.length - 1].src;
                        imgs[imgs.length - 1].src = newSrc;
                    }
                }
            }
        }

        MyGalleryConstuctor.prototype.back = function () {

            var imgs = document.querySelector('.current').querySelectorAll('li img');
            var newSrc;
            for (var i = 0; i < imgs.length - 1; i++) {
                newSrc = imgs[i].src;
                imgs[i].src = imgs[imgs.length - 1].src;
                imgs[imgs.length - 1].src = newSrc;
            }
        }

        MyGalleryConstuctor.prototype.show = function (self) {
            /* Галерей может быть любое кол-во, метод show обрабатывает сразу все галереи*/
            for (var i = 0; i < self.numOfGalleries; i++) {
                var container = self.containersArr[i];
                var bigPic = self.bigPicsArr[i];
                var smallPicDIV = self.smallPicsDIVArr[i];
                var smallpicLI = self.smallPicsULArr[i];
                container.style.width = self.CONTAINER_WIDTH - self.PADDING * 2 - self.BORDER_SIZE + "px";
                container.style.height = self.CONTAINER_HEIGHT - self.PADDING - self.BORDER_SIZE + "px";
                if (i % 2 !== 0) {
                    container.style.marginLeft = "5px";
                }
                bigPic.style.width = container.clientWidth - self.PADDING - self.BORDER_SIZE + "px";
                bigPic.style.height = self.CONTAINER_HEIGHT * (2 / 3) - self.PADDING * 2 - self.BORDER_SIZE + "px";
                smallPicDIV.style.width = bigPic.clientWidth - self.BORDER_SIZE + "px";
                smallPicDIV.style.height = self.CONTAINER_HEIGHT * (1 / 3) - self.PADDING * 2 - self.BORDER_SIZE + "px";

                for (var j = 0; j < smallpicLI.length; j++) {
                    var smallpicIMG = smallpicLI[j].children[0];
                    smallpicIMG.style.width = (smallPicDIV.clientWidth - self.ARROW_WIDTH * 2) / 3 - self.BORDER_SIZE * 3 + "px";
                    smallpicIMG.style.height = smallPicDIV.clientHeight - self.BORDER_SIZE * 3 + "px";
                }
            }
        }

        MyGalleryConstuctor.prototype.keyboardAction = function (event, self) {

            if (event.keyCode === 39) {
                self.back();
            }
            if (event.keyCode === 37) {
                self.next();
            }
        }

        return MyGalleryConstuctor;
    } ());

var gallery = new MyGallery(".gallery");