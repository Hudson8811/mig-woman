$(document).ready(function() {
    $.getJSON('http://special2.woman.ru/mig/get_motivation.php', function(data) {

        console.log(data);
    });
});

new WOW().init();




//drag the question image
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
            main.curAnswer = pos < 0 ? 1 : 2
        }
    },
    onDrop: function (obj,e) {
        let res = obj.data('left') - obj.data('start');
        if (Math.abs(res) > 40) main.selectAnswer(res  > 0);
        obj.css({top:'', left: ''});
        obj.css('transform','');
    }
});