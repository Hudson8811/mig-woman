$(document).ready(function() {
    //http://special2.woman.ru/mig/get_motivation.php
    $.getJSON('get_motivation.json', function(data) {
        $('.mig-circle .text').html(data.motivation);
    });

    //http://special2.woman.ru/mig/situations.php
    $.getJSON('situations.json', function(data) {
        countQuestions = data.situations.length;
        $.each(data.situations, function( index, value ) {
            $('.test__cards').prepend('<div class="test__card test-card"><div class="test__number"><span class="num_cur">'+(index+1)+'</span>/<span class="num_max">'+countQuestions+'</span></div><div class="card__pic"><img src="'+value.image+'" alt=""></div><div class="card__text">'+value.text+'</div></div>');
        });
        $('.test__cards .test__card:last-child').addClass('current');

        let w = $(window).width();
        let k = w > 768 ? 100 : 60;

        $('.test__card').drags({
            z_index: 1,
            cursor: 'pointer',
            filterDrag: function(obj) {
                return obj.filter('.current');
            },
            onStart: function(obj) {
                let start = Math.round(obj.position().left);
                obj.data('start',start);
                obj.data('left',start);
            },
            onMove: function(obj,e) {
                let left = Math.round(obj.position().left);
                obj.data('left', left);
                let pos = left - obj.data('start');
                let offs = pos /w * k;
                obj.css('transform','rotate('+offs+'deg) scale('+
                    (1 -Math.abs(offs/100))+')');
                if (Math.abs(pos) > 40) {
                    curAnswer = pos < 0 ? 1 : 2;
                    if (pos > 0){
                        $('.test__button.left').removeClass('current');
                        $('.test__button.right').addClass('current');
                    } else {
                        $('.test__button.left').addClass('current');
                        $('.test__button.right').removeClass('current');
                    }
                }
            },
            onDrop: function (obj,e) {
                let res = obj.data('left') - obj.data('start');
                if (Math.abs(res) > 40) {
                    selectAnswer(res  > 0);
                    nextQuest(obj);
                }
                obj.css({top:'', left: ''});
                obj.css('transform','');
                $('.test__button').removeClass('current');
            }
        });
    });

    $.getJSON('results.json', function(data) {
        results = data.results;
    });
});


wow = new WOW({
    mobile: false
});
wow.init();


resultNumber = 0;
testResults = [];
curNumber = 0;
procent = 0;

function selectAnswer(res){
    if (res) {
        resultNumber++;
        testResults.push(curNumber);
        $('.smile').removeClass('pos-'+(resultNumber-1)).addClass('pos-'+resultNumber);
        if (resultNumber == 5) $('.smile').removeClass('smile-1').addClass('smile-2');
        if (resultNumber == 9) $('.smile').removeClass('smile-2').addClass('smile-3');
        if (resultNumber == 13) $('.smile').removeClass('smile-3').addClass('smile-4');
        if (resultNumber == 17) $('.smile').removeClass('smile-4').addClass('smile-5');

        procent = (100/countQuestions)*resultNumber;
        $('.smile .text').html(procent.toFixed()+'%');
    }
    if (curNumber === countQuestions-1) testEnd();
    else curNumber++;
}

function nextQuest(obj) {
    obj.remove();
    $('.test__cards .test__card:last-child').addClass('current');
}

function testEnd() {
    alert('test закончен');
}



$('.line-block').mousemove(function (e) {
    offset = $(this).offset();
    cursor = (e.pageX - offset.left);
    width = $(this).outerWidth();
    percent = cursor / width * 100 - 4.2417559;
    if (percent > 89.6) {
        percent = 89.6;
    } else if (percent < -0.15){
        percent = -0.15;
    }
    $('.smile').removeClassWild("status_*");
    if (percent > 72.8){
        $('.smile').addClass('status_5');
    } else if (percent > 53.4){
        $('.smile').addClass('status_4');
    } else if (percent > 34.6){
        $('.smile').addClass('status_3');
    } else if (percent > 15){
        $('.smile').addClass('status_2');
    }

    $('.smile').css({'left':percent+'%'});


    if (percent > 87.6){
        $('.question').html(results[19].text);
        $('.smile .text').html(results[19].procent+'%');
    } else if (percent > 83.4){
        $('.question').html(results[18].text);
        $('.smile .text').html(results[18].procent+'%');
    } else if (percent > 79.2){
        $('.question').html(results[17].text);
        $('.smile .text').html(results[17].procent+'%');
    } else if (percent > 75.2){
        $('.question').html(results[16].text);
        $('.smile .text').html(results[16].procent+'%');
    } else if (percent > 67.5){
        $('.question').html(results[15].text);
        $('.smile .text').html(results[15].procent+'%');
    } else if (percent > 63.5){
        $('.question').html(results[14].text);
        $('.smile .text').html(results[14].procent+'%');
    } else if (percent > 59.2){
        $('.question').html(results[13].text);
        $('.smile .text').html(results[13].procent+'%');
    } else if (percent > 55.1){
        $('.question').html(results[12].text);
        $('.smile .text').html(results[12].procent+'%');
    } else if (percent > 48.5){
        $('.question').html(results[11].text);
        $('.smile .text').html(results[11].procent+'%');
    } else if (percent > 44.45){
        $('.question').html(results[10].text);
        $('.smile .text').html(results[10].procent+'%');
    } else if (percent > 40.15){
        $('.question').html(results[9].text);
        $('.smile .text').html(results[9].procent+'%');
    } else if (percent > 36.1){
        $('.question').html(results[8].text);
        $('.smile .text').html(results[8].procent+'%');
    } else if (percent > 29.45){
        $('.question').html(results[7].text);
        $('.smile .text').html(results[7].procent+'%');
    } else if (percent > 25.3){
        $('.question').html(results[6].text);
        $('.smile .text').html(results[6].procent+'%');
    } else if (percent > 21.1){
        $('.question').html(results[5].text);
        $('.smile .text').html(results[5].procent+'%');
    } else if (percent > 17.05){
        $('.question').html(results[4].text);
        $('.smile .text').html(results[4].procent+'%');
    } else if (percent > 10.3){
        $('.question').html(results[3].text);
        $('.smile .text').html(results[3].procent+'%');
    } else if (percent > 6.2){
        $('.question').html(results[2].text);
        $('.smile .text').html(results[2].procent+'%');
    } else if (percent > 2.1){
        $('.question').html(results[1].text);
        $('.smile .text').html(results[1].procent+'%');
    } else {
        $('.question').html(results[0].text);
        $('.smile .text').html(results[0].procent+'%');
    }

});


$('.border-block').mouseleave(function (e) {
    $('.smile').removeAttr( 'style' ).removeClassWild("status_*");
    $('.smile .text').html(procent.toFixed()+'%');
    $('.question').html('');
});



(function($) {
    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})(jQuery);