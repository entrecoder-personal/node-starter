(function ($, window) {

    $.fn.userMenu = function (settings) {

        return this.each(function () {

            // Open context menu
            $(this).on("click", function (e) {
                e.preventDefault(); 

                if($(settings.menuSelector).is(":visible")){
                    $(settings.menuSelector).hide();
                    return false;
                }

                $('.dropdown').hide();

                //open menu
                $(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        top: getTopLocation(e)
                    })
                    .off('click')
                    .on('click', function (e) {
                        //e.preventDefault(); e.stopPropagation();

                        $(this).hide();
                        var $invokedOn = $(this).data("invokedOn");
                        var $selectedMenu = $(e.target);
                        
                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                });
                
                return false;
            });

            //make sure menu closes on any click
            $(document).click(function () {
                $(settings.menuSelector).hide();
            });
        });

        function getLeftLocation(e) {
            var mouseWidth = e.pageX;
            var pageWidth = $(settings.menuOffset).width();
            var menuWidth = $(settings.menuSelector).width();
            // opening menu would pass the side of the page
            if (mouseWidth + menuWidth > pageWidth &&
                menuWidth < mouseWidth) {
                return mouseWidth - menuWidth;
            } 
            return mouseWidth;
        }        
        
        function getTopLocation(e) {
            var mouseHeight = e.pageY;
            var pageHeight = $(settings.menuOffset).height();
            var menuHeight = $(settings.menuSelector).height();
            // opening menu would pass the bottom of the page
            if (mouseHeight + menuHeight > pageHeight &&
                menuHeight < mouseHeight) {
                return mouseHeight - menuHeight - 20;
            } 
            return mouseHeight;
        }

    };

})(jQuery, window);