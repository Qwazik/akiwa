//myPlugins
  ;(function($){
    $.fn.qTabs = function(){
        var global = this;
        global.find('.tabs-content__item').hide();
        global.find('.tabs-content__item.active').show();
        $(this).find('.tabs-nav li').click(function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var data = $(this).find('a').attr('href');
            $(global).find('.tabs-content__item').hide().removeClass('active');
            $(global).find('.tabs-content__item' + data + '').fadeIn(300).addClass('active');
            return false;
        })
    }

    $.fn.qToggle = function(){
        var global = this;
        $(this).click(function(e){
            e.preventDefault();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        })
    }
    $.fn.equalHeight = function(){
        var global = this,
            maxHeigh = 0,
            tmpHeigh = 0;
        $(this).each(function(){
            tmpHeight = $(this).outerHeight();
            if(tmpHeight > maxHeigh){
                maxHeigh = tmpHeight;
            }
        })

        $(this).each(function(){
            $(this).css('min-height', maxHeigh);
        })
    }
  }(jQuery));

$(window).load(function(){
    checkAchivementsCurrentItem();
})
$(window).resize(function(){

})
$(document).ready(function(){

    //city-choise
    city.init();
    $('.responsive-menu').click(function(){
        $(this).siblings('ul').slideToggle();
    })


    /*####################
    #####  PLUGINS  ######
    ####################*/

    $('#mainSlider').owlCarousel({
        items: 1
    });
    var owlAchivements = $('.achivements').owlCarousel({
        items: 1,
        margin: 72,
        startPosition: $('.achivements__item').length - 1,
        onTranslated: checkAchivementsCurrentItem
    });
    $('#achivementsControls .next').click(function(){
        owlAchivements.trigger('next.owl.carousel');
        console.log('owl-next')
        return false;
    })
    $('#achivementsControls .prev').click(function(){
        owlAchivements.trigger('prev.owl.carousel');
        console.log('owl-prev')
        return false;
    })
    var clientsCarousel = $('#clientsCarousel').owlCarousel({
        items: 1,
        autoWidth: true,
        slideBy: 1,
        margin: 40
    });



    var clientsItemCol = $('#clientsCarousel').find('.client__item').length;
    
    $('.clients-controls .max').text(clientsItemCol);
    $('.clients-slider').slider({
        min: 0,
        max: clientsItemCol - 5,
        slide: function(){
            var val = $(this).slider('value');
            clientsCarousel.trigger('to.owl.carousel', val);
            $('.clients-controls .min').text(val + 5);
        },
        change: function(){
            var val =  $(this).slider('value');
            clientsCarousel.trigger('to.owl.carousel', val);
            $('.clients-controls .min').text(val + 5);
        }
    });
  clientsCarousel.trigger('to.owl.carousel', 2);

  $('.news__item-wrap').equalHeight(); // выравнивание высоты блоков новостей (главная)
  $('.main-footer__col').equalHeight(); //выравнивание высоты колонок в футере
  $('.achivements__item').each(function(){
    $(this).find('.achivements__col').equalHeight();
  })
})//ready


var city = {
    choise: $('.city__choise'),
    choiseItem: $('.city__list a'),
    list: $('.city__list'),
    close: $('.city__close'),
    init: function(){
        this.listeners();
    },
    listeners: function(){ 
        city.choise.click(city.show);
        city.close.click(city.hide);
        city.choiseItem.click(city.change);
    },
    show: function(){
        city.list.fadeIn();
        return false;
    },  
    hide: function(){
        city.list.fadeOut();
        return false;
    },
    change: function(){
        console.log('change');
        var id = $(this).attr('href');
        $('.city').find(id).addClass('active').siblings().removeClass('active');
        city.hide();
        city.choise.text($(this).text());
        return false;
    }
}
//achivements pos auto color change
var positionNums = document.querySelectorAll('.position__pos');
for(var i = 0; i < positionNums.length; i++){
    if(document.querySelectorAll('.position__pos')[i].textContent * 1 <= 3){document.querySelectorAll('.position__pos')[i].style.color = 'red'}
}

function checkAchivementsCurrentItem(){
     var currentItem = $('.achivements .owl-item.active').index();
            $('.achivements-controls .position-num').text(currentItem+1);
            console.log($('.achivements .owl-item.active')[0]);
}