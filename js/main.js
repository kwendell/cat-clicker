

/*
 * Create a cat class that has the
 * cat specific info
 */

 var Cat = function(name,imgStr) {
    this.name=name
    this.imgStr=imgStr;
    this.clickCount=0;

};

Cat.prototype.incrementClickCount = function() {
	this.clickCount++;
};
Cat.prototype.getClickCount = function() {
	return this.clickCount;
};

Cat.prototype.getName = function() {
	return this.name;
}

var cat1 = new Cat("Cat1","images/catpic.jpg");
var cat2 = new Cat("Cat2","images/cat2.jpg");
var cat3 = new Cat("Cat3","images/cat3.jpg");
var cat4 = new Cat("Cat4","images/cat4.jpg");
var cat5 = new Cat("Cat5","images/cat5.jpg");

var cats = [cat1,cat2,cat3,cat4,cat5];

// put the first cat name in the first span tag
 $("span").html(cat1.name);

