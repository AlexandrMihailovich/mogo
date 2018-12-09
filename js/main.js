$(document).ready(function () {
    function miniSlider(conteinerTab, navBlock, nextKey, prevKey, over, margin) {
        if (margin === undefined) {
            margin = 0;
        }
        var _tabs = $(conteinerTab);
        var _conteiners = _tabs.children();
        if(navBlock !== false) {
            var _tabControl = $(navBlock);
        }
        if(nextKey !== false) {
            var _next = $(nextKey);
        }
        if (prevKey !== false) {
            var _prev = $(prevKey);
        }

        var currentTab = 0;
        var sumWidth = 0;
        var currentLeft = 0;
        var oneTab;
        var tabIndexes = [];
        var currentIndex = 0;
        var tabCount = 0;
        var currentItem = _conteiners.eq(currentIndex);
        var currentHeight = currentItem.height();

        function slids() {
            if(over === undefined) {
                oneTab = _tabs.parent().width();
            } else {

                oneTab = _conteiners.width() + (margin * 2);
            }
            sumWidth = 0;
            tabCount = _conteiners.length;
            _conteiners.each(function (index) {
                var _this = $(this);
                sumWidth += oneTab;
                var id = _this.attr('id');
                if(id === undefined) {
                    id = 'tab-' + index;
                    _this.attr('id' ,id);
                    if(navBlock !== false) {
                        _tabControl.children().eq(index).children().attr('href', '#' + id);
                    }
                }
                if (currentTab === 0) {
                    currentTab = id;
                }
                tabIndexes[id] = index;

                _this.css('width', (oneTab - (margin*2)) + 'px');
            });
            currentLeft = currentIndex * oneTab * -1;

            _conteiners.css('float', 'left');
            if(margin !== 0) {
                _conteiners.css('margin-left', margin + 'px');
                _conteiners.css('margin-right', margin + 'px');
            }

            _tabs.css('margin-right', 'auto');
            _tabs.css('margin-left', 'auto');
            _tabs.css('width', sumWidth + 'px');
            _tabs.css('position', 'relative');
            _tabs.css('clear', 'both');
            _tabs.css('overflow', 'hidden');
            _tabs.css('left', currentLeft + 'px');
            currentHeight = currentItem.height();
            _tabs.css('height', currentHeight + 'px');
            if(nextKey !== false) {
                _next.css('top', currentHeight / 2 - (_next.height() / 2));
            }
            if (prevKey !== false) {
                _prev.css('top', currentHeight / 2 - (_prev.height() / 2));
            }
            _tabs.parent().css('overflow', 'hidden');
            _tabs.parent().css('display', 'block');

            if (prevKey !== false && nextKey !== false) {
                hideButton();
            }
        }
        if(navBlock !== false) {
            _tabControl.on('click', 'a', function (index) {
                var href = $(this).attr('href');
                href = href.substr(1, href.length);
                currentLeft = tabIndexes[href] * oneTab * -1;
                currentTab = href;
                currentIndex = tabIndexes[href];

                _tabs.css('left', currentLeft + 'px');
                _tabs.css('height', $('#' + href).height());

                setSelected(currentIndex);

                return false;
            });
        }
        function hideButton() {
            //console.log('conteinerTab tabCount ', tabCount);
            if(currentIndex === 0) {
                _prev.hide();
            } else {
                _prev.show();
            }
            if (over !== undefined) {
                if ((currentLeft * -1) >= (sumWidth - _tabs.parent().width() - margin * 2)) {
                    //console.log('ofset ', sumWidth - _tabs.parent().width());
                    _next.hide();
                    return false;
                }
            }
            if(currentIndex >= tabCount-1) {
                _next.hide();
            } else {
                _next.show();
            }
        }
        function setSelected(index) {
            _tabControl.children().removeClass('activeSlide');
            _tabControl.children().eq(index).addClass('activeSlide');
        }
        function setPosition() {
            currentItem = _conteiners.eq(currentIndex);
            currentHeight = currentItem.height();
            currentTab = currentItem.attr('id');
            currentLeft = currentIndex * oneTab * -1;

            _tabs.css('height', currentHeight + 'px');
            _tabs.css('left', currentLeft + 'px');

            hideButton();
        }
        if (prevKey !== false) {
            _prev.click(function () {
                if (currentIndex <= 0) {
                    return false
                }
                currentIndex--;
                setPosition();
                return false;
            });
        }
        if(nextKey !== false) {
            _next.click(function () {
                if (currentIndex >= (tabCount - 1)) {
                    return false
                }
                if (over !== undefined) {
                    if ((currentLeft * -1) >= (sumWidth - _tabs.parent().width() - margin * 2)) {
                        //console.log('ofset ', sumWidth - _tabs.parent().width());
                        //_next.hide();
                        return false;
                    }
                }
                currentIndex++;
                setPosition();
                return false;
            });
        }

        slids();
        $(window).resize(function () {
            slids();
        });
    }
    $('.quoteTabs').css('transition', 'all .5s');
    miniSlider('.quoteTabs', false, '.slideConQuote>.next', '.slideConQuote>.prev');

    $('.testimonialTabs').css('transition', 'all .5s');
    miniSlider('.testimonialTabs', false, '.slideConTestimonial>.next', '.slideConTestimonial>.prev');

    $('.logosTabs').css('transition', 'all .5s');
    miniSlider('.logosTabs', false, '.slideConlogos>.next', '.slideConlogos>.prev', true, 20);

    $('.headerBanner').css('transition', 'all .5s');
    miniSlider('.headerBanner', '.slideNav', false, false);

    function mimiAccordion(selector, heightDonor) {
        var element = $(selector);
        var tabs = element.children();
        var itemCount = tabs.length;
        var paddingTop = 0;
        var paddingBottom = 0;
        var currentTab = tabs.eq(1).children().eq(1);
        var tabContentHeight = 0;
        var borderBottom = 0;
        var borderTop = 0;
        var headerH = 0;
        var MaxHeight = 0;
        var MinHeight = currentTab.innerHeight();

        var calcContentHeight = function () {
            borderBottom = currentTab.css('border-bottom-width');
            borderTop = currentTab.css('border-top-width');
            paddingTop = currentTab.css('padding-top');
            paddingBottom = currentTab.css('padding-bottom');

            tabs.hide();
            var height = $(heightDonor).height();
            tabs.show();

            headerH = 0;
            MaxHeight = 0;
            MinHeight = currentTab.innerHeight();
            tabs.each(function (index) {
                var current = $(this);
                headerH += current.children().eq(0).innerHeight();
                var content = current.children().eq(1);
                content.css('height', '');
                var contentHeight = content.innerHeight();
                if(MinHeight > contentHeight) {
                    MinHeight = contentHeight;
                }
                if(MaxHeight < contentHeight) {
                    MaxHeight = contentHeight;
                }
            });

            if(height < (headerH * 2)) {
                height = MaxHeight;
            }

            var h = (height - headerH) / itemCount;
            var itemHeight = (h*itemCount);
            var fullHeight = itemHeight + headerH;

            tabs.each(function (index) {
                $(this).children().eq(1).css('height', h + 'px');
            });

            var oneHeight = element.height();
            var margins = oneHeight - fullHeight;
            var freeHeight = itemHeight - margins;

            tabContentHeight = freeHeight;
        };

        var closeAllTab = function () {
            tabs.each(function (index) {
                $(this).children().eq(1)
                    .css('height', 0 + 'px')
                    .css('padding-top', 0)
                    .css('padding-bottom', 0)
                    .css('border-top-width', 0)
                    .css('border-bottom-width', 0);
                $(this).children().eq(0)
                    .children('.accordion-header-icon')
                    .removeClass('icon-triangle-1-e')
                    .addClass('icon-triangle-1-s');
            });
        };

        var openTab = function (item) {
            closeAllTab();
            item
                .css('height', tabContentHeight + 'px')
                //.css('height', headerH + 'px')
                .css('padding-top', paddingTop)
                .css('padding-bottom', paddingBottom)
                .css('border-top-width', borderTop)
                .css('border-bottom-width', borderBottom);
            item.prev()
                .children('.accordion-header-icon')
                .removeClass('icon-triangle-1-s')
                .addClass('icon-triangle-1-e');
        };

        /***************/

        calcContentHeight();

        $(window).resize(function () {
            calcContentHeight();
            openTab(currentTab);
        });

        openTab(currentTab);

        tabs.each(function () {
            $(this).children().eq(0).click(function () {
                currentTab = $(this).next();
                openTab(currentTab);
            });
        });

    }
    mimiAccordion('#accordion', '.service .serviceImg');



    function paralax(target, speed) {

        window.addEventListener('scroll', function() {
            worker (target);
        });
        target = document.querySelector(target);

        function worker(target) {
            var targetPosition = {
                    top: window.pageYOffset + target.getBoundingClientRect().top,
                    left: window.pageXOffset + target.getBoundingClientRect().left,
                    right: window.pageXOffset + target.getBoundingClientRect().right,
                    bottom: window.pageYOffset + target.getBoundingClientRect().bottom
                },
                windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };

            if (targetPosition.bottom > windowPosition.top &&
                targetPosition.top < windowPosition.bottom &&
                targetPosition.right > windowPosition.left &&
                targetPosition.left < windowPosition.right) {

                var element = $(target);
                var elementYPosition = element.position().top;
                element.css('background-position', 'center 0px');

                var pos = Math.floor(pageYOffset - elementYPosition) / speed;
                element.css('background-position', 'center ' + pos + 'px');
            }
        }
    };

    paralax ('.map', 3);
    paralax('.site-header', 5);
    paralax('.uniqueDesign', 5);
    paralax('.peopleSay', 8);
});