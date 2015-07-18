$(function(){

    var Cat = function(name,imgStr) {
        this.name=name
        this.imgStr=imgStr;
        this.clickCount=0;
    };

    var model = {
        init: function() {
	        alert("initializing cats...");
            var cat1 = new Cat("Cat1","images/catpic.jpg");
            var cat2 = new Cat("Cat2","images/cat2.jpg");
            var cat3 = new Cat("Cat3","images/cat3.jpg");
            var cat4 = new Cat("Cat4","images/cat4.jpg");
            var cat5 = new Cat("Cat5","images/cat5.jpg");

            this.cats = [cat1,cat2,cat3,cat4,cat5];
        }

    };



    var octopus = {
        incrementCatClickCount: function() {
            alert("increment specific cat");
        },

        setCat: function(catIndex) {
             catView.render(catIndex);
             // clear the current content



        },

        init: function() {
            model.init();

            for (var i = 0 ; i< views.length ; i++) {
            views[i].init();
            }
        }
    };


    var listView = {
        init: function() {
            listView.render();
        },
        render: function(){
           // create list items to be appended
            var catlist = $("#catlist");
            for (var i = 0; i <model.cats.length;i++) {
                var theLI = $("<li>");
                var theAnchor = $("<a href='' id='"+i.toString()+"'>"+model.cats[i].name+"</a>");
                // add click listener to the anchor
                theAnchor.click(function(event) {
                   event.preventDefault();

                    var theIndex = new Number(event.target.id);
                   octopus.setCat(theIndex);
               }
               );
                theLI.append(theAnchor);
                catlist.append(theLI);
            }


        }
    };

    var catView = {
        init: function() {
            catView.render();

        },
        render: function(catIndex){
            alert("catView::render()");
             $("#catcontent").empty();
              // set the content based on catIndex


             var theDiv = $("<div>");
             var span0 = $("<span id='catname'>"+model.cats[catIndex].name+"</span>");
             var theImg = $("<img src='"+model.cats[catIndex].imgStr+"' id='"+catIndex.toString()+"'' />");
             theImg.click(function(event) {
                  model.cats[catIndex].clickCount++;
                  alert("looking for element "+"#click-count"+catIndex.toString());
                  $("#click-count"+catIndex.toString()).text(model.cats[catIndex].clickCount);
             });
             var span1 = $("<span>click count:  </span>");
             var span2 = $("<span id='click-count"+catIndex.toString()+"'>0<span>");
             span2.text(model.cats[catIndex].clickCount);
             theDiv.append(span0);
            theDiv.append(theImg);
            theDiv.append(span1);
            theDiv.append(span2);
            $("#catcontent").append(theDiv);

        }
    };
   var views = [listView,catView];

    octopus.init();
});
