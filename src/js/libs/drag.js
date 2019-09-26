// drag function
$.fn.drags = function (opt) {
  opt = $.extend({
    handle: "",
    cursor: "move",
    z_index: 1,
    onStart: function () {},
    onMove: function () {},
    onDrop: function () {},
    pos_x: 0,
    pos_y: 0,
    filterDrag: function (obj) {return obj;}
  }, opt);
  var $handle, $drag;
  if (opt.handle === "") $handle = this;
  else {
    $handle = this.find(opt.handle);
    $handle.addClass('active-handle');
  }
  $drag = $(this);
  //console.log($drag);

  return $handle.css('cursor', opt.cursor).on("mousedown touchstart", function (e, touch) {
    let curDrag = opt.filterDrag($drag);
    if (!curDrag.length) return;

    curDrag.addClass('draggable');
    //var z_idx = curDrag.css('zIndex');
    curDrag.css('zIndex', opt.z_index);

    var body = $('body');
    var drg_h, drg_w, pageX, pageY;
    let d = e.type === 'mousedown' ? e : e.changedTouches[0];
    pageX = d.pageX; pageY = d.pageY;
    drg_h = curDrag.outerHeight();
    drg_w = curDrag.outerWidth();
    curDrag.pos_y = curDrag.offset().top + drg_h - pageY;
    curDrag.pos_x = curDrag.offset().left + drg_w - pageX;
    //console.log(pageX,pageY,drg_w,drg_h,curDrag.offset().left,curDrag.offset().top);

    opt.onStart(curDrag);
    function onMove(e, touch) {
      if (curDrag === undefined || !curDrag.length || !curDrag.hasClass('draggable')) return;
        let d = e.type === 'mousemove' ? e : e.changedTouches[0];
        pageX = d.pageX; pageY = d.pageY;
        curDrag.offset({
          top: pageY + curDrag.pos_y - drg_h,
          left: pageX + curDrag.pos_x - drg_w
        });
        opt.onMove(curDrag,e);
    }
    function onUp(e) {
      //console.log('mouseup',obj);
      if (curDrag !== undefined && curDrag.length && curDrag.hasClass('draggable')) {
        curDrag.removeClass('draggable').css({'z-index':''});

        opt.onDrop(opt.filterDrag(curDrag), e);
        body.off("mousemove touchmove", onMove).off("mouseup touchend", onUp);
      }
    }

    body.on("mousemove touchmove", onMove).on("mouseup touchend", onUp);
    // obj = $('.draggable');
    // console.log('start:',obj);
    e.preventDefault(); // disable selection
  });
};
