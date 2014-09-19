
var txt = $( ".btn-split" ).text();
$( ".btn-split" ).attr("name", txt);

var txt = $( ".btn-loop" ).text();
$( ".btn-loop" ).attr("name", txt);

// Hover-Carousel jQuery plugin
// By Yair Even-Or
// https://github.com/yairEO/hover-carousel
// http://dropthebit.com

;(function($){
    "use strict";

    var bindToClass      = 'carousel',
        containerWidth   = 0,
        scrollWidth      = 0,
        posFromLeft      = 0,    // Stripe position from the left of the screen
        stripePos        = 0,    // When relative mouse position inside the thumbs stripe
        animated         = null,
        $indicator, $carousel, el, $el, ratio, scrollPos, nextMore, prevMore, pos, padding;

    // calculate the thumbs container width
    function calc(e){
        $el = $(this).find(' > .wrap');
        el  = $el[0];
        $carousel = $el.parent();
        $indicator = $el.prev('.indicator');

        nextMore = prevMore  = false; // reset

        containerWidth       = el.clientWidth;
        scrollWidth          = el.scrollWidth; // the "<ul>"" width
        padding              = 0.2 * containerWidth; // padding in percentage of the area which the mouse movement affects
        posFromLeft          = $el.offset().left;
        stripePos            = e.pageX - padding - posFromLeft;
        pos                  = stripePos / (containerWidth - padding*2);
        scrollPos            = (scrollWidth - containerWidth ) * pos;
        
        if( scrollPos < 0 )
          scrollPos = 0;
        if( scrollPos > (scrollWidth - containerWidth) )
          scrollPos = scrollWidth - containerWidth;
      
        $el.animate({scrollLeft:scrollPos}, 200, 'swing');
        
        if( $indicator.length )
            $indicator.css({
                width: (containerWidth / scrollWidth) * 100 + '%',
                left: (scrollPos / scrollWidth ) * 100 + '%'
            });

        clearTimeout(animated);
        animated = setTimeout(function(){
            animated = null;
        }, 200);

        return this;
    }

    // move the stripe left or right according to mouse position
    function move(e){
        // don't move anything until inital movement on 'mouseenter' has finished
        if( animated ) return;

        ratio     = scrollWidth / containerWidth;
        stripePos = e.pageX - padding - posFromLeft; // the mouse X position, "normalized" to the carousel position

        if( stripePos < 0)
            stripePos = 0;

        pos = stripePos / (containerWidth - padding*2); // calculated position between 0 to 1
        // calculate the percentage of the mouse position within the carousel
        scrollPos = (scrollWidth - containerWidth ) * pos;   

        el.scrollLeft = scrollPos;
        if( $indicator[0] && scrollPos < (scrollWidth - containerWidth) )
          $indicator[0].style.left = (scrollPos / scrollWidth ) * 100 + '%';

        // check if element has reached an edge
        prevMore = el.scrollLeft > 0;
        nextMore = el.scrollLeft < (scrollWidth - containerWidth);

        $carousel[prevMore ? "addClass" : "removeClass"]('left');
        $carousel[nextMore ? "addClass" : "removeClass"]('right');
    }

    $.fn.carousel = function(options){
        $(document)
            .on('mouseenter.carousel', '.' + bindToClass, calc)
            .on('mousemove.carousel', '.' + bindToClass, move);
    };

    // automatic binding to all elements which have the class that is assigned to "bindToClass"
    $.fn.carousel();

})(jQuery);

function scrollFooter(scrollY, heightFooter)
{
    console.log(scrollY);
    console.log(heightFooter);

    if(scrollY >= heightFooter)
    {
        $('footer').css({
            'bottom' : '0px'
        });
    }
    else
    {
        $('footer').css({
            'bottom' : '-' + heightFooter + 'px'
        });
    }
}

$(window).load(function(){
    var windowHeight        = $(window).height(),
        footerHeight        = $('footer').height(),
        heightDocument      = (windowHeight) + ($('.content').height()) + ($('footer').height()) - 20;

    // Definindo o tamanho do elemento pra animar
    $('#scroll-animate, #scroll-animate-main').css({
        'height' :  heightDocument + 'px'
    });

    // Definindo o tamanho dos elementos header e conteúdo
    $('header').css({
        'height' : windowHeight + 'px',
        'line-height' : windowHeight + 'px'
    });

    $('.wrapper-parallax').css({
        'margin-top' : windowHeight + 'px'
    });

    scrollFooter(window.scrollY, footerHeight);

    // ao dar rolagem
    window.onscroll = function(){
        var scroll = window.scrollY;

        $('#scroll-animate-main').css({
            'top' : '-' + scroll + 'px'
        });
        
        $('header').css({
            'background-position-y' : 50 - (scroll * 100 / heightDocument) + '%'
        });

        scrollFooter(scroll, footerHeight);
    }
});

(function() {
  var parallaxScroll;

  parallaxScroll = (function(_this) {
    return function() {
      var currentScrollPosition;
      currentScrollPosition = $(_this).scrollTop();
      $('.opening').css({
        'background-position': '50% ' + (-currentScrollPosition / 4) + 'px'
      });
      return $('.openingText').css({
        'margin-top': (currentScrollPosition / 4) + "px",
        'opacity': 1 - (currentScrollPosition / 250)
      });
    };
  })(this);

  $(document).ready((function(_this) {
    return function() {
      $(window).scroll(function() {
        return parallaxScroll();
      });
      return $(document).scroll(function() {
        var bottomOfOpening, compareWindowHeight, header, sideBar, windowHeight, windowTop;
        windowTop = $(window).scrollTop();
        bottomOfOpening = $('.opening').position().top + $('.opening').height();
        header = $('.header');
        sideBar = $('.sideBar');
        windowHeight = $(window).height();
        compareWindowHeight = (windowHeight - 70) + "px";
        if (bottomOfOpening > windowTop) {
          return header.css({
            'position': 'absolute',
            'top': '100%',
            'left': '0'
          });
        } else {
          return header.css({
            'position': 'fixed',
            'top': '0',
            'left': '0'
          });
        }
      });
    };
  })(this));

}).call(this);

/*
 * uilang v1.0.1
 * http://uilang.com
 */

document.addEventListener("DOMContentLoaded", function() {
  "use strict"

  var codeElements = document.getElementsByTagName("code")
  var i = codeElements.length
  var delimiter = "clicking on"
  var codeBlock
  var codeBlockContent

  while (i--) {
    var code = codeElements[i]
    var content = code.textContent.trim()
    if (content.lastIndexOf(delimiter, 0) === 0) {
      codeBlock = code
      codeBlockContent = content
      break
    }
  }

  if (!codeBlock) return
  codeBlock.parentNode.removeChild(codeBlock)

  function InstructionParsing(instruction) {
    var separator = instruction.charAt(0)
    var instructionSplit = instruction.split(separator)

    this.clickSelector = instructionSplit[1]
    this.classBehavior = instructionSplit[2].trim().split(" ")[0]
    this.classValue = instructionSplit[3]
    this.targetSelector = instructionSplit[5]
  }

  function UIElement(clickSelector, classBehavior, classValue, targetSelector) {
    this.clickSelector = clickSelector
    this.classBehavior = classBehavior.charAt(classBehavior.length-1) == "s"
                       ? classBehavior.substring(0, classBehavior.length-1)
                       : classBehavior
    this.classValue = classValue.charAt(0) == "."
                    ? classValue.substring(1, classValue.length)
                    : classValue
    this.targetSelector = targetSelector
    this.createEventListener()
  }

  UIElement.prototype.createEventListener = function() {
    var self = this
    var clicked = document.querySelectorAll(self.clickSelector)
    var i = clicked.length

    if (i < 1) {
      throw new Error("There's no element matching your \"" + self.clickSelector + "\" CSS selector.")
    }

    while (i--) {
      clicked.item(i).addEventListener("click", clickCallback)
    }

    function updateClass(el) {
      el.classList[self.classBehavior](self.classValue)
    }

    function clickCallback(e) {
      switch (self.targetSelector) {
        case "target" :
        case "this"   :
        case "it"     :
        case "itself" :
        case undefined:
          updateClass(e.target)
          break
        default:
          var target = document.querySelectorAll(self.targetSelector)
          var i = target.length
          while (i--) {
            updateClass(target.item(i))
          }
      }
      if (e.target.nodeName.toLowerCase() == "a") {
        e.preventDefault()
      }
    }
  }

  codeBlockContent.split(delimiter).forEach(function(data) {
    if (!data) return
    var params = new InstructionParsing(data.trim())
    new UIElement(
      params.clickSelector,
      params.classBehavior,
      params.classValue,
      params.targetSelector
    )
  })
})

$(document).ready(function() {
  //get and set section height to window height
  var sectionHeight = $(window).height();
  $('section').css('height', sectionHeight);
  
  // reset section heights to 100% on resize
  $(window).resize(function() {
    var sectionHeight = $(window).height();
    $('section').css('height', sectionHeight);
  });
  
  // set first dot and section to #current or .onScreen
  $('nav ul li:first-child a').attr('id','current');
  $('body section:first-of-type').attr('class','onScreen');
  
  // set clicked dot on right to #current
  $('nav a').click(function() {
    $('nav a').removeAttr('id');
    $(this).attr('id','current');
  });
  
  /* reveal section titles on dot hover
  $('nav ul li').mouseenter(function() {
    $(this).children('span').css({
      'marginLeft':'-105px',
      'opacity':'1.0'
    });
    $(this).on('mouseleave', function() { 
      $(this).children('span').css({
        'marginLeft':'-120px',
        'opacity':'0'
      });
    });
  });*/
  
  // scrollTo easing from http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links/ via css-tricks.com
  $(function() {
    $('nav a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 61
          }, 333);
          return false;
        }
      }
    });
  });
  
  // sticky header
    $(window).on('scroll', function() {
      var scrollDist = $('body').scrollTop(); 
      if (scrollDist > 444) {
        $('header').addClass('sticky');
      } else {
        $('header').removeClass();
      }
    });
  
  // activate dots when the corresponding section is scrolled into view
    $(window).on('scroll', function() { 
      var onScreen = '';
      $('nav a').removeAttr('id'); 
      $('section').removeAttr('class');
      $('section').each(function() {
        var vpHeight = $(window).innerHeight(),
            vpThreshhold = vpHeight / 3,
            scrollDist = $('body').scrollTop(),            
            positionY = $(this).position().top,
            sectionHeight = $(this).outerHeight(),
            sectionOffsetBottom = positionY + sectionHeight;
        if (positionY - scrollDist <= vpThreshhold && positionY - scrollDist >= 0) {
          var onScreen = $(this).children('h1').attr('id');
          $('nav ul li:nth-child(' + onScreen + ') > a').attr('id','current');
          //  console.log(onScreen);
          $('body section:nth-of-type(' + onScreen + ')').attr('class','onScreen');
           // console.log(onScreen);
        }
      });     
    });
  
  
});
