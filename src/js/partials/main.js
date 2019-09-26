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
});


wow = new WOW({
    mobile: false
});
wow.init();


resultNumber = 0;
testResults = [];
curNumber = 0;

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
