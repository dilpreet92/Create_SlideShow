function CreateSlideShow(elements) {
  this.slideShowElement = elements.slideShowElement;
  this.firstListElement = elements.firstListElement;
  this.lastListElement = elements.lastListElement;
};

CreateSlideShow.prototype.init = function() {
  this.slideShowElement.prependTo("#main");
  this.slideShowElement.find("li").hide();
  this.bindEvents();
};

CreateSlideShow.prototype.showNavigation = function(currentListItem) {
  $(".navigation").remove();
  var divTag = $("<div/>").appendTo(this.slideShowElement).addClass("navigation");
  divTag.text((currentListItem.prevAll("li").length + 1) + " Out of " + this.slideShowElement.find("li").length );
};

CreateSlideShow.prototype.createCycle = function(currentListItem) {
  var _this = this;
  this.createFadeInFadeOut(currentListItem);
  currentListItem = currentListItem.next();
  setInterval(function() {
    var trackItem = "";
    if(currentListItem.is(_this.lastListElement)) {
      trackItem = _this.firstListElement; 
    }
    else {
      trackItem = currentListItem.next();
    }
    _this.createFadeInFadeOut(currentListItem);
    currentListItem = trackItem;
  },6000);
};

CreateSlideShow.prototype.createFadeInFadeOut = function(currentElement) {
  currentElement.fadeIn(3000).fadeOut(3000);
  this.showNavigation(currentElement);
};

CreateSlideShow.prototype.bindEvents = function() {
  this.createCycle(this.firstListElement);
};

$(document).ready(function(){
  var elements = {
    "slideShowElement" : $("#slideshow"),
    "firstListElement" : $("#slideshow li:first"),
    "lastListElement" : $("#slideshow li:last"), 
  };
  var slideShowObj = new CreateSlideShow(elements);  
  slideShowObj.init();    
});
