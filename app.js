$( document ).ready(function(){
  $(".button-collapse").sideNav({
      menuWidth: 150,
      edge: 'left',
      closeOnClick: true,
      draggable: true
  });

  $('a').smoothScroll({
    // offset: -77
  });




  $('.collapsible').collapsible();
});
