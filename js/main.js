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


$(window).resize(function(){

})
$(document).ready(function(){

    //vacancy city choise
    vacancyCityChoise();
    $('.inner-vacancy__city-choise').click(function(){
        $(this).toggleClass('active');
        vacancyCityChoise();
    })
    //contacts city select
    $('.contacts-city__nav').click(function(){
        $(this).siblings('.contacts-city__menu').slideToggle();
    });
    $('.contacts-city__menu li a').click(function(){
        $('.contacts-city__menu, .contacts-city__main').hide();
        $('.contacts-city__main'+$(this).attr('href')+'').fadeIn(300);
        return false;
    })
    //add stars for required input
    autoStarsForRequiredInput()
    //detect top positions in table
    topPositionsInTable('#positionsTable');
    //left-menu-submenu
    $('.left-menu__item').click(leftMenuClick);
    //city-choise
    city.init();
    $('.responsive-menu, .left-menu__responsive-button').click(function(){
        $(this).siblings('ul').slideToggle();
    })

    //addfile input
    $('.form-addfile button').click(function(){
        $(this).closest('.form-addfile').find('input').click();
    })
    $('.form-addfile input').change(function(){

        var filename = $(this).val();
        filename = filename.substr(filename.lastIndexOf('\\') + 1, filename.length - 1);
        if(filename == ''){
            $(this).closest('.form-addfile').find('button').text('Выберите файл');    
        }else{
            $(this).closest('.form-addfile').find('button').text(filename);
        }
    })
    /*####################
    #####  PLUGINS  ######
    ####################*/

    $('#mainSlider').owlCarousel({
        items: 1
    });

    $('.sup-works-isdone__slider').owlCarousel({
        items: 1
    });

    var mainFormSlider = {
        inputMin: $('.main-form__ui-slider-values .min'),
        inputMax: $('.main-form__ui-slider-values .max'),
        min: +$('.main-form__ui-slider-values .min').val(),
        max: +$('.main-form__ui-slider-values .max').val(),
    }

    //изменение значений слайдера при вводе данных в input
    $(mainFormSlider.inputMin).on('keyup change',function(){
        var val = $(this).val();
        $(mainFormSliderInit).slider('values',0, val);
        
    })
    $(mainFormSlider.inputMax).on('keyup change',function(){
        var val = $(this).val();
        $(mainFormSliderInit).slider('values',1, val);
        
    })
    $(mainFormSlider.inputMin).on('blur',function(){
    sliderValuesBalanceMin(mainFormSlider.inputMax, mainFormSlider.inputMin);
    })
    $(mainFormSlider.inputMax).on('blur',function(){
        sliderValuesBalanceMax(mainFormSlider.inputMax, mainFormSlider.inputMin);
    })
    function sliderValuesBalanceMin(max, min){
        if(+max.val() < +min.val()){
            max.val(+min.val());
        mainFormSliderInit.slider('values', 1, +min.val());
        }
    }
    function sliderValuesBalanceMax(max, min){
        if(+max.val() < +min.val()){
            min.val(+max.val());
        mainFormSliderInit.slider('values', 0, +max.val());
        }
    }
    

    var mainFormSliderInit = $('#mainFormSlider').slider({
        range: true,
        min: mainFormSlider.min,
        max: mainFormSlider.max,
        values: [mainFormSlider.min, mainFormSlider.max],
        slide:function(e, ui){
            var min = ui.values[0],
                max = ui.values[1];
            mainFormSlider.inputMin.val(min);
            mainFormSlider.inputMax.val(max);
        },
        change:function(e, ui){
            var min = ui.values[0],
                max = ui.values[1];
            mainFormSlider.inputMin.val(min);
            mainFormSlider.inputMax.val(max);
        }
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
        max: clientsItemCol-1,
        slide: function(){
            var val = $(this).slider('value');
            clientsCarousel.trigger('to.owl.carousel', val);
            // $('.clients-controls .min').text(val);
        },
        change: function(){
            var val =  $(this).slider('value');
            clientsCarousel.trigger('to.owl.carousel', val);
            // $('.clients-controls .min').text(val);
        }
    });
  clientsCarousel.trigger('to.owl.carousel', 2);

  $('.news__item-wrap').equalHeight(); // выравнивание высоты блоков новостей (главная)
  $('.main-footer__col').equalHeight(); //выравнивание высоты колонок в футере
  $('.achivements__item').each(function(){
    $(this).find('.achivements__col').equalHeight();
  })
  // клик на это интересно
  $('.interesting__item').click(function(){location.href = $(this).find('.interesting__name')[0].href});
})//ready


$(window).load(function(){
    checkAchivementsCurrentItem();
})//load

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

//left menu

function leftMenuClick(e){
    if(e.target.className != 'title'){
        var el = $(this);
        $(el).find('.left-menu__submenu').slideToggle(function(){
            if($(el).hasClass('open')){
                $(el).removeClass('open').addClass('closed');
            }else{
                $(el).removeClass('closed').addClass('open');
            }
            
        })
        return false;
    }
}
//table top positions
function topPositionsInTable(table){
    $(table).find('.pos').each(function(){
        if($(this).text() <= 3) $(this).addClass('mark')
    })
}
function autoStarsForRequiredInput(){
    $('.form-label').each(function(){
        if($(this).find('input')[0].required){
            $(this).find('.input-title').text(function(i,v){
                return v+='*';
            });
        }
    })
}
//innder vacancy city choise
function vacancyCityChoise(){
    var activeCity = [];
    $('.inner-vacancy__item').removeClass('active');
    $('.inner-vacancy__city-choise').each(function(){
        if($(this).hasClass('active')) activeCity.push($(this).text());
    })
    for(i in activeCity){
        $('.inner-vacancy__city:contains('+activeCity[i]+')').closest('.inner-vacancy__item').addClass('active');
        console.log($('.inner-vacancy__city:contains('+activeCity[i]+')'))
    }
}

