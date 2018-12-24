//disclaimer!! used this video to create effect https://www.youtube.com/watch?v=7ZO2RTMNSAY
let sliderImages = document.querySelectorAll('.slide');
let arrowRight = document.querySelector("#arrow-right");
let arrowLeft = document.querySelector("#arrow-left");
current=0;

//function will clear images
function reset(){
   for(let i =0; i < sliderImages.length;i++){
       sliderImages[i].style.display="none";
   }
}  


//initialiaze the slideshow
function startSlide(){
    reset();
    sliderImages[0].style.display="block";
}

//show image to the left
function slideLeft(){
    reset();
    sliderImages[current - 1].style.display="block";
    current--;
}
function slideRight(){
    reset();
    sliderImages[current + 1].style.display="block";
    current++;
}



//slide right
arrowRight.addEventListener("click",function(){
   if(current===(sliderImages.length-1)){
       current= -1;
   }
   slideRight();
});
//left arrow click
arrowLeft.addEventListener("click",function(){
    if(current===0){
        current = sliderImages.length;
    }
    slideLeft();
});
startSlide();





