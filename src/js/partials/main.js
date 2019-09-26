$(document).ready(function() {
    $.getJSON('http://special2.woman.ru/mig/get_motivation.php', function(data) {

        console.log(data);
    });
});

wow = new WOW({
    mobile: false
});
wow.init();




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
            curAnswer = pos < 0 ? 1 : 2
        }
    },
    onDrop: function (obj,e) {
        let res = obj.data('left') - obj.data('start');
        console.log(res);
        if (Math.abs(res) > 40) selectAnswer(res  > 0);
        obj.css({top:'', left: ''});
        obj.css('transform','');
    }
});

var resultNumber = 0;
var testResults = [];

function selectAnswer(res){
    curAnswer = 0;
    //statistics
    let stat = '';
    if (this.curNumber === 0) stat = 'test_start';
    else if (this.curNumber === this.countQuestions-1) stat = 'test_finish';
    //if (stat !== '') this.goal(stat);
    goal('quest_'+(this.curNumber+1));

    //save result
    if (res) {
        resultNumber++;
        testResults.push(curNumber);
    }

    //check end
    if (this.curNumber === this.countQuestions-1) this.testEnd();
    else this.curNumber++;
}

function goal(goal) {
    if (typeof window['ga'] == 'function') ga('send', 'event', goal);
    else console.log('no analitics');
    console.log('goal:',goal);
}