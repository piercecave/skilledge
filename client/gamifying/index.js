/* old code 

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

/* old code */

// event listener for jumping
window.addEventListener('click', (e)=>{
    if(e.target.id == "button1"){
        startJumping()
    }
});

// event listener for playing dead
window.addEventListener('click', (e)=>{
    if(e.target.id == "button2"){
        startPlayDead()
    }
});

// event listener for fall
window.addEventListener('click', (e)=>{
    if(e.target.id == "button3"){
        startPlayFall()
    }
});

// event listener for hurt
window.addEventListener('click', (e)=>{
    if(e.target.id == "button4"){
        startPlayHurt()
    }
});




// function that makes avatar jump 
function startJumping() { 

    for(const buttons of document.getElementById("theButtons").children){
        buttons.disabled = true;
    }
    
    // blocks orginial picture 
    document.getElementById("myCat").style.display = 'none';

    // unblocks current picture
    document.getElementById("animation1").children[0].style.display = 'block';

    var frames = document.getElementById("animation1").children;

    var frameCount = frames.length;
    var i = 0;

    const interval  = setInterval( () => { 
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);

    setTimeout( () => {
        clearInterval(interval)
       
        // hides all the picture 
        for (const child of document.getElementById("animation1").children){
            child.style.display = "none";
        }
        // reverts back to normal pictue
        document.getElementById("myCat").style.display = 'block';

        for(const buttons of document.getElementById("theButtons").children){
            buttons.disabled = false;
        }
    },2000)
} 




// function that makes avatar jump 
function startPlayDead() { 

    for(const buttons of document.getElementById("theButtons").children){
        buttons.disabled = true;
    }
    // blocks orginial picture 
    document.getElementById("myCat").style.display = 'none';

    // unblocks current picture
    document.getElementById("animation2").children[0].style.display = 'block';

    var frames = document.getElementById("animation2").children;

    var frameCount = frames.length;
    var i = 0;

    const interval  = setInterval( () => { 
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);

    setTimeout( () => {
        clearInterval(interval)
       
        // hides all the picture 
        for (const child of document.getElementById("animation2").children){
            child.style.display = "none";
        }
        // reverts back to normal pictue
        document.getElementById("myCat").style.display = 'block';

        for(const buttons of document.getElementById("theButtons").children){
            buttons.disabled = false;
        }
    },2000)
} 


// function that makes avatar play falling down
function startPlayFall() { 

    for(const buttons of document.getElementById("theButtons").children){
        buttons.disabled = true;
    }
    // blocks orginial picture 
    document.getElementById("myCat").style.display = 'none';

    // unblocks current picture
    document.getElementById("animation3").children[0].style.display = 'block';

    var frames = document.getElementById("animation3").children;

    var frameCount = frames.length;
    var i = 0;

    const interval  = setInterval( () => { 
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);

    setTimeout( () => {
        clearInterval(interval)
       
        // hides all the picture 
        for (const child of document.getElementById("animation3").children){
            child.style.display = "none";
        }
        // reverts back to normal pictue
        document.getElementById("myCat").style.display = 'block';

        for(const buttons of document.getElementById("theButtons").children){
            buttons.disabled = false;
        }
    },2000)
} 


// function that makes avatar play hurt
function startPlayHurt() { 

    for(const buttons of document.getElementById("theButtons").children){
        buttons.disabled = true;
    }
    // blocks orginial picture 
    document.getElementById("myCat").style.display = 'none';

    // unblocks current picture
    document.getElementById("animation4").children[0].style.display = 'block';

    var frames = document.getElementById("animation4").children;

    var frameCount = frames.length;
    var i = 0;

    const interval  = setInterval( () => { 
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);

    setTimeout( () => {
        clearInterval(interval)
       
        // hides all the picture 
        for (const child of document.getElementById("animation4").children){
            child.style.display = "none";
        }
        // reverts back to normal pictue
        document.getElementById("myCat").style.display = 'block';

        for(const buttons of document.getElementById("theButtons").children){
            buttons.disabled = false;
        }
    },2000)
} 