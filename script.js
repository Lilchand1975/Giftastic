
var topics = ["sun", "Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

$(document).ready(function(){
    
    for(var i=0;i<topics.length;i++){
        $("#button-collection").append("<button type='button' class='btns1' value="+topics[i]+">"+topics[i]+"</button>");
    }

    $("#add-new-planet-btn").click(function(){
        var planetName = document.getElementById("planet-names-input").value;
        $("#button-collection").append("<button type='button' class='btns1' value="+planetName+" onclick='getGifs(event)'>"+planetName+"</button>");
    });

    $(".btns1").click(function(){
        var queryName = this.value;

        getGifsFromAPI(queryName);
    });
});

function getGifs(element){
    var clickedValue = element.target.value;    
    getGifsFromAPI(clickedValue);   
}

function getGifsFromAPI(clickedValue){
    $.ajax({
        url: "https://api.giphy.com/v1/stickers/search?api_key=3jclNgrNiJKKU9SXucCFSUWhkaTBwnGt&q="+clickedValue+"&limit=10", 
        success: function(result){
            $("#gif-result").empty();
            for (var i =0; i < result.data.length; i++){
                $("#gif-result").append("<div style='margin:10px 10px 10px 10px; width:210px; height:210px; background-color:white; border:solid 1px;'><img onclick='displayGif(event)' height=200 width=200 id='"+result.data[i].id+"' data-state='still' data-animate='"+result.data[i].images.fixed_height_small.url+"' data-still='"+result.data[i].images.fixed_height_small_still.url+"' src='"+result.data[i].images.fixed_height_small_still.url+"'></div>")//original.url downsized_still.url
            }
        },
        error:function(error){
            console.log(error);
            alert("error occured !")
        }
      }); 
}

function displayGif(element){
    var clickedValue = element.target.getAttribute("id"); 
    var dataState = element.target.getAttribute("data-state");
    var animateUrl = element.target.getAttribute("data-animate");
    var stillUrl = element.target.getAttribute("data-still");

    if(dataState == 'still'){
        $("#"+clickedValue).attr("data-state",'animate');
        $("#"+clickedValue).attr("src",animateUrl);
    }else{
        $("#"+clickedValue).attr("data-state",'still');
        $("#"+clickedValue).attr("src",stillUrl);
    }
}