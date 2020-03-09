var intervalId;

function startAnimation() { 
    // this blocks the orginally picture 
    document.getElementById("myCat").style.display = 'none';
    // 3 fixed num
    for(var i = 1; i <4;i++){
        document.getElementById("animation" + i).style.display = "none";
    }


    var random = Math.floor(Math.random() * 3) + 1;
        document.getElementById("animation" + random).style.display = 'block';
    
        var frames = document.getElementById("animation" + random).children;
        //var frames = document.querySelectorAll("animation").children;
        console.log(frames)
        var frameCount = frames.length;
        var i = 0;
        if (!intervalId) {
            intervalId = setInterval(function () { 
                frames[i % frameCount].style.display = "none";
                frames[++i % frameCount].style.display = "block";
            }, 100); 
          } 
        else {
            clearInterval(intervalId);
            intervalId = null;
            intervalId = setInterval(function () { 
                frames[i % frameCount].style.display = "none";
                frames[++i % frameCount].style.display = "block";
            }, 100); 
          }
} 


function animationLoop(frames, count){
    if(count == 4){
        count = 0;
    }
    else{
       count ++;
    }
    frames[count].style.display= 'block';
    animationLoop(frames, count);
}


window.addEventListener('click', (e)=>{
    if(e.target.id == "button1"){
        startAnimation()
    }
});