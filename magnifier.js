/**
 * 
 * @param {jQuery.HTMLDomElement} $container
 * @param {String} selectorElement
 * @param {jQuery.HTMLDomElement} $containerGallery
 * @param {String} selectorGalleryElements
 * @returns {undefined}
 */
function magnifier($container, selectorElement, $containerGallery, selectorGalleryElements) {
    jQuery('.zoomContainer').remove();
    $container.find('img').removeData('elevateZoom');
    
    var $el = $container.find(selectorElement);
    $el.removeData('elevateZoom');
    $el.elevateZoom({
        responsive: true,
        scrollZoom: true,
        zoomWindowFadeIn: 500,
        zoomWindowFadeOut: 500,
        lensFadeIn: 500,
        lensFadeOut: 500,
        zoomWindowPosition: 1,
        zoomWindowOffetx: 10,
        zoomWindowWidth: 358,
        zoomWindowHeight: 358,
        zoomLevel: 0.5,
        tint: true,
        tintColour: 'black',
        tintOpacity: 0.5
    });
    
    // Pass the images to Fancybox
    $el.on('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        var ez = $el.data('elevateZoom');
        ez.closeAll(); // This function force hides the lens, tint and window
        
        // build the array of images for fancybox
        var imgArray = new Array();
        imgArray.push({
            src: $el.data('zoom-image'),
            type: 'image'
        });
        var $galleryItems = $containerGallery.find(selectorGalleryElements);
        if ($galleryItems.length > 0) {
            $galleryItems.each(function (index) {
                if (jQuery(this).data('zoom-image') !== $el.data('zoom-image')) {
                    imgArray.push({
                        src: $(this).data('zoom-image'),
                        type: 'image'
                    });
                }
            });
        }
        jQuery.fancybox.open(imgArray, {
            protect: true
        });
        return false;
    });
}

/**
 * 
 * @param {Array} array
 * @param {String} key
 * @returns {undefined}
 */
function removeDuplicateArrayObject(array, key) {
    var obj = {};

    for (var i = 0, len = array.length; i < len; i++) {
        obj[array[i][key]] = array[i];
    }

    array = new Array();
    for (var item in obj) {
        array.push(obj[item]);
    }
    
    return array;
}