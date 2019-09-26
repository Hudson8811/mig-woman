//app parts
var app;
var common;
var main;

//components
var common_component = {};
var content_component;
var app_component = {};

//common mixin
var common_mixin = {
  data: function () {

  },
  methods: {
    nl2br: function (s) {return s.replace(/\n/g, '<br/>');},
    nl2p: function (s) {return '<p>' + s.replace(/\n/g, '</p><p>') + '</p>';},
    bgi: function (s) {return {'background-image': 'url('+s+')'}},
    goal: function (goal) {
      if (typeof window['ga'] == 'function') ga('send', 'event', goal);
      else console.log('no analitics');
      console.log('goal:',goal);
    }
  }
};

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let lastScrollTop = 0;
    let f = function (e) {
      let scrollTop = window.pageYOffset;
      let winHeight = document.documentElement.clientHeight;
      let winBottom = scrollTop + winHeight;
      let options ={scrollTop: scrollTop, winTop: scrollTop, lastScrollTop: lastScrollTop,
        winHeight: winHeight, winBottom: winBottom};
      lastScrollTop = scrollTop;
      if (binding.value(e, el, options)) {
        window.removeEventListener('scroll', f)
      }
    };
    window.addEventListener('scroll', f)
  }
});

//share
var share_component =  {
  template: '#share',
  props: {
    socials: {
      type: Array,
      default: function () {return ['vk','fb','ok','tw']}
    },
    share_text: {
      type: String,
      default: 'share_'
    },
    share_all: {
      type: String,
      default: ''
    },
    intro: {
      type: String,
      default: ''
    }
  },
  mixins: [common_mixin],
  mounted: function () {},
  computed: {},
  methods: {
    share: function (social) {
      this.goal(this.share_text+social);
      if (this.share_all !== '') this.goal(this.share_all);
    }
  }
};

var link_component = {
  template: '#link',
  props: {
    link: {
      type: [String,Boolean],
      default: false
    },
    directLink: String,
    newWin: {
      type: Boolean,
      default: true
    },
    goal_name: {
      type: String,
      default: ''
    }
  },
  mixins: [common_mixin],
  mounted: function () {},
  computed: {
    tag: function () {
      return this.isLink() ? 'a' : 'div';
    },
    target: function () {
      if (!this.isLink() && !this.newWin()) return false;
      return '_blank';
    }
  },
  methods: {
    isLink: function () {
      return this.link !== '';
    },
    clickLink: function (e) {
      if (this.goal_name) {
        this.goal(this.goal_name);
        if (this.isLink() && !this.newWin) {
          e.preventDefault();
          let link = this.link;
          setTimeout(function () {
            location = link;
          },100)
        }
      }
    }
  }
};

function initVue(name) {
  let _content =  {
    template: '#content',
    mixins: [common_mixin,content_component],
    components: {
      Share: share_component,
      Linker: link_component
    },
    beforeCreate: function() {
      main = this;
    },
  };
  let _common = {
    template: '#common',
    mixins: [common_mixin,common_component],
    components: {
      Share: share_component,
      Linker: link_component
    },
    beforeCreate: function() {
      common = this;
    },
  };

  //init app
  app=new Vue({
    el: '.main',
    name: name,
    data: {
      started: false,
      pages: {index: 0, contest:1},
      pageName: '',
    },
    components: {
      mainCommon: _common,
      mainContent: _content
    },
    mixins: [common_mixin,app_component],
    beforeCreate: function() {
      app = this;
    },
    created: function () {
      this.pageName = name;
    },
    mounted: function () {
      //statistic
      //initAppear();
      //common = this.$refs.common;
      //main = this.$refs.main;
      this.started = true;
    },
    computed: {
      pageId: function() {
        let id = this.pages[this.pageName];
        //console.log(this.pageName,id);
        return id !== undefined ? id : -1;
      },
    },
    methods: {}
  });
}