$( document ).ready(function(){
  $(".button-collapse").sideNav({
      menuWidth: 150,
      edge: 'left',
      closeOnClick: true,
      draggable: true
  });

  $('a').smoothScroll({
    offset: -64,
    exclude: ['#test-swipe-1', '#test-swipe-2', '#test-swipe-3'],
    excludeWithin: ['#tabs-swipe-demo']
  });

  $('ul.tabs').tabs({
    swipeable: true
  });

  $('.collapsible').collapsible();

  $('.li').hover(function(){
    // console.log(this.children[0].children[0]);
    $(this.children[0].children[1].children).toggleClass('colored');
    $(this.children[0].children[0]).toggleClass('fancy');
  });

});
