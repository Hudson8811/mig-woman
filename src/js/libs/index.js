//init
initContent();
initVue('index');

// content
function initContent() {
  content_component = {
    data: function () {
      return {
        info: _page_info,
        testData: _cards_data.reverse(),
        curNumber: 0,
        countQuestions: _cards_data.length,
        resultNumber: 0,
        testResults: [],
        curAnswer: 0,
        barPosition: 0
      }
    },
    mixins: [common_mixin],
    mounted: function () {
      //statistic
      initAppear();

      //choose result by key
      $(document).keyup(function (event) {
        let res = undefined;
        if (event.which === 37) res = false;
        else if (event.which === 39) res = true;
        if (res !== undefined) main.selectAnswer(res);
      });

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
    },
    computed: {},
    methods: {
      nextQuestion: function (num) {
        console.log('nq:',num);
      },
      selectAnswer: function (res) {
        this.curAnswer = 0;
        //statistics
        let stat = '';
        if (this.curNumber === 0) stat = 'test_start';
        else if (this.curNumber === this.countQuestions-1) stat = 'test_finish';
        //if (stat !== '') this.goal(stat);
        this.goal('quest_'+(this.curNumber+1));

        //save result
        if (res) {
          this.resultNumber++;
          this.testResults.push(this.curNumber);
        }

        //check end
        if (this.curNumber === this.countQuestions-1) this.testEnd();
        else this.curNumber++;
      },
      testEnd: function () {
        console.log('test end');
        Cookies.set('results',this.testResults);

        let result_limits = [0,5,11];
        let res = 0;

        for (let i = result_limits.length - 1; i >= 0; i--) {
          if (this.resultNumber >= result_limits[i]) {
            res = i;
            break;
          }
        }
        //console.log(res);
        Cookies.set('result_num',res+1);

        setTimeout(function () {
          location = '/result/'; //+(res+1)+'/';
        },100);
      },
      barStyle: function () {
        let prop = this.resultNumber/this.countQuestions;
        //console.log(prop);
        let persent = 94*prop;
        return {width: persent + 'vw', opacity: 0.1 + prop}
      }
    }
  };
}



