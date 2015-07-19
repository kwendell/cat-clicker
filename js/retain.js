$(function(){

    var Cat = function(name,imgStr) {
        this.name=name;
        this.imgStr=imgStr;
        this.clickCount=0;
    };

    var model = {
        init: function() {

            var cat1 = new Cat("Cat1","images/catpic.jpg");
            var cat2 = new Cat("Cat2","images/cat2.jpg");
            var cat3 = new Cat("Cat3","images/cat3.jpg");
            var cat4 = new Cat("Cat4","images/cat4.jpg");
            var cat5 = new Cat("Cat5","images/cat5.jpg");

            this.cats = [cat2,cat3,cat4,cat5];
        },
        showingIndex:-1

    };



    var octopus = {
        incrementCatClickCount: function() {
            alert("increment specific cat");
        },

        setCat: function(catIndex) {
             catView.render(catIndex);
             // clear the current content
             model.showingIndex=catIndex;



        },

        init: function() {
            model.init();

            for (var i = 0 ; i< views.length ; i++) {
            views[i].init();
            }
        },
        showAdmin: function()  {
            console.log("get cat info from model for cat "+model.showingIndex);
        }
    };

    var adminView ={
        init : function() {
            // add the button listener
            // for the show admin function
            var adminButton = $("#adminButton");

            adminButton.click(function() {octopus.showAdmin();})

        },
        render : function()  {

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
            //catView.render(catIndex);

        },
        render: function(catIndex) {
             $("#catcontent").empty();
              // set the content based on catIndex

            model.showingIndex=catIndex;
             var theDiv = $("<div>");
             alert(catIndex);
             var span0 = $("<h2 id='catname'>"+model.cats[catIndex].name+"</h2>");
             var theImg = $("<img src='"+model.cats[catIndex].imgStr+"' id='"+catIndex.toString()+"'' />");
             theImg.click(function(event) {
                  model.cats[catIndex].clickCount++;

                  $("#click-count"+catIndex.toString()).text(model.cats[catIndex].clickCount);
             });
             var span1 = $("<h2>click count:  </h2>");
             var span2 = $("<h2 id='click-count"+catIndex.toString()+"'>0<h2");
             span2.text(model.cats[catIndex].clickCount);
             theDiv.append(span0);
            theDiv.append(theImg);
           // theDiv.append(span1);
            theDiv.append(span2);
            $("#catcontent").append(theDiv);

        }
    };
   var views = [listView,catView,adminView];

    octopus.init();
});
