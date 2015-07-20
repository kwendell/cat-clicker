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
            adminView.render();
        },
        getCurrentCatName : function() {
            return model.cats[model.showingIndex].name;
        },
         getCurrentCatImageUrl : function() {
            return model.cats[model.showingIndex].imgStr;
        },
        updateFromAdmin: function() {
            // collect data from the form.
           var vals = $("#admin-form").serializeArray();


           model.cats[model.showingIndex].name=vals[0].value;
           listView.render();


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
            console.log("adminView::render");
            //  <div class="container" hidden="true" id="adminView">
            var adminDiv = $("#adminView");
            adminDiv.css("display","block");
            // set the current cat name

            //<input type="text" name="catName" label="name">
            console.log("setting to "+octopus.getCurrentCatName());
            $("input[name='catName']").val(octopus.getCurrentCatName());
            $("input[name='imageURL']").val(octopus.
                getCurrentCatImageUrl());

            $("#updateButton").click(function() {octopus.updateFromAdmin();});


        }

    };


    var listView = {
        init: function() {
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
            listView.render();
        },
        render: function(){
           // update the text from the model

                var theAnchors = $("li a");
               // console.log(theAnchors[0].val);
                for (var j=0;  j<theAnchors.length; j++) {
                    $(theAnchors[j]).text(model.cats[j].name);

                }
                /*
            for (var i = 0; i <theAnchors.length;i++) {
                var theAnchors[i].val(model.cats[i].name);
            }
            */



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

             var span0 = $("<h2 id='catname'>"+model.cats[model.showingIndex].name+"</h2>");
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
