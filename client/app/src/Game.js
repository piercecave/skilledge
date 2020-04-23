import React from 'react';
import './Game.css';

// Animation when you complete a task
// Unlock new avatars as you progress

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.startJumping = this.startJumping.bind(this);
        this.startPlayDead = this.startPlayDead.bind(this);
        this.startPlayFall = this.startPlayFall.bind(this);
        this.startPlayHurt = this.startPlayHurt.bind(this);
        this.startChangeAvatar = this.startChangeAvatar.bind(this);
        //this.startDogJump = this.startDogJump(this);
    }

    // function that makes avatar jump 
    startJumping() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }

        if (document.getElementById("myCat").className === 'center d-none') {

            // blocks orginial picture 
            document.getElementById("myDog").classList.remove('d-block');
            document.getElementById("myDog").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation5").children[0].classList.remove('d-none');
            document.getElementById("animation5").children[0].classList.add('d-block');

            var frames = document.getElementById("animation5").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');

            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation5").children) {
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myDog").classList.remove('d-none');
                document.getElementById("myDog").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        } else {

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = true;
            }

            // blocks orginial picture 
            document.getElementById("myCat").classList.remove('d-block');
            document.getElementById("myCat").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation1").children[0].classList.remove('d-none');
            document.getElementById("animation1").children[0].classList.add('d-block');

            var frames = document.getElementById("animation1").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');
            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation1").children) {
                    // child.style.display = "none";
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myCat").classList.remove('d-none');
                document.getElementById("myCat").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        }
    }



    // function that makes avatar play dead 
    startPlayDead() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }

        if (document.getElementById("myCat").className === 'center d-none') {

            // blocks orginial picture 
            document.getElementById("myDog").classList.remove('d-block');
            document.getElementById("myDog").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation6").children[0].classList.remove('d-none');
            document.getElementById("animation6").children[0].classList.add('d-block');

            var frames = document.getElementById("animation6").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');

            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation6").children) {
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myDog").classList.remove('d-none');
                document.getElementById("myDog").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        } else {

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = true;
            }

            // blocks orginial picture 
            document.getElementById("myCat").classList.remove('d-block');
            document.getElementById("myCat").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation2").children[0].classList.remove('d-none');
            document.getElementById("animation2").children[0].classList.add('d-block');

            var frames = document.getElementById("animation2").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');
            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation2").children) {
                    // child.style.display = "none";
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myCat").classList.remove('d-none');
                document.getElementById("myCat").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        }
    }


    // function that makes avatar play falling down
    startPlayFall() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }

        if (document.getElementById("myCat").className === 'center d-none') {

            // blocks orginial picture 
            document.getElementById("myDog").classList.remove('d-block');
            document.getElementById("myDog").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation7").children[0].classList.remove('d-none');
            document.getElementById("animation7").children[0].classList.add('d-block');

            var frames = document.getElementById("animation7").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');

            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation7").children) {
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myDog").classList.remove('d-none');
                document.getElementById("myDog").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        } else {

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = true;
            }

            // blocks orginial picture 
            document.getElementById("myCat").classList.remove('d-block');
            document.getElementById("myCat").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation3").children[0].classList.remove('d-none');
            document.getElementById("animation3").children[0].classList.add('d-block');

            var frames = document.getElementById("animation3").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');
            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation3").children) {
                    // child.style.display = "none";
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myCat").classList.remove('d-none');
                document.getElementById("myCat").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        }

    }


    // function that makes avatar play hurt
    startPlayHurt() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }

        if (document.getElementById("myCat").className === 'center d-none') {

            // blocks orginial picture 
            document.getElementById("myDog").classList.remove('d-block');
            document.getElementById("myDog").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation8").children[0].classList.remove('d-none');
            document.getElementById("animation8").children[0].classList.add('d-block');

            var frames = document.getElementById("animation8").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');

            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation8").children) {
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myDog").classList.remove('d-none');
                document.getElementById("myDog").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        } else {

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = true;
            }

            // blocks orginial picture 
            document.getElementById("myCat").classList.remove('d-block');
            document.getElementById("myCat").classList.add('d-none');

            // unblocks current picture
            document.getElementById("animation4").children[0].classList.remove('d-none');
            document.getElementById("animation4").children[0].classList.add('d-block');

            var frames = document.getElementById("animation4").children;

            var frameCount = frames.length;
            var i = 0;

            const interval = setInterval(() => {
                frames[i % frameCount].classList.remove('d-block');
                frames[i % frameCount].classList.add('d-none');
                frames[++i % frameCount].classList.remove('d-none');
                frames[++i % frameCount].classList.add('d-block');
            }, 100);

            setTimeout(() => {
                clearInterval(interval)

                // hides all the picture 
                for (const child of document.getElementById("animation4").children) {
                    // child.style.display = "none";
                    child.classList.remove('d-block');
                    child.classList.add('d-none');
                }
                // reverts back to normal pictue
                document.getElementById("myCat").classList.remove('d-none');
                document.getElementById("myCat").classList.add('d-block');

                for (const buttons of document.getElementById("theButtons").children) {
                    buttons.disabled = false;
                }
            }, 2000)
        }
    }


    startChangeAvatar() {
        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }


        if ((document.getElementById("myCat").className === 'center d-block')) {
            // blocks orginial picture 
            document.getElementById("myCat").classList.remove('d-block');
            document.getElementById("myCat").classList.add('d-none');

            // unblocks current picture
            document.getElementById("myDog").classList.remove('d-none');
            document.getElementById("myDog").classList.add('d-block');

        } else {

            document.getElementById("myCat").classList.remove('d-none');
            document.getElementById("myCat").classList.add('d-block');
            // unblocks current picture
            document.getElementById("myDog").classList.remove('d-block');
            document.getElementById("myDog").classList.add('d-none');
        }

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = false;
        }
    }

    render() {
        return (
            <div className="Game">

                <h3 className="card-header">Avatar</h3>

                <img src="./../cat/Idle/Idle%20(1).png" id='myCat' className="center d-block" width="200" height="200" alt="idle" />

                <img src="./../dog/Idle/Idle%20(1).png" id='myDog' className="center d-none" width="200" height="200" alt="idle" />


                <div id="animation1" className="cat jump">
                    <img src="./../cat/Jump/Jump%20(1).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(2).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(3).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(4).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(5).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(6).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(7).png" className="center" width="200" height="200" alt="cat jump" />
                    <img src="./../cat/Jump/Jump%20(8).png" className="center" width="200" height="200" alt="cat jump" />
                </div>

                <div id="animation2" className="cat dead">
                    <img src="./../cat/Dead/Dead%20(1).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(2).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(3).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(4).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(5).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(6).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(7).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(8).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(9).png" className="center" width="200" height="200" alt="cat dead" />
                    <img src="./../cat/Dead/Dead%20(10).png" className="center" width="200" height="200" alt="cat dead" />
                </div>

                <div id="animation3" className="cat falling">
                    <img src="./../cat/Fall/Fall%20(1).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(2).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(3).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(4).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(5).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(6).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(7).png" className="center" width="200" height="200" alt="cat fall" />
                    <img src="./../cat/Fall/Fall%20(8).png" className="center" width="200" height="200" alt="cat fall" />
                </div>

                <div id="animation4" className="cat hurt">
                    <img src="./../cat/Hurt/Hurt%20(1).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(2).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(3).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(4).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(5).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(6).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(7).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(8).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(9).png" className="center" width="200" height="200" alt="cat hurt" />
                    <img src="./../cat/Hurt/Hurt%20(10).png" className="center" width="200" height="200" alt="cat hurt" />
                </div>


                {/* Dog Animations  */}

                <div id="animation5" className="dog jump">
                    <img src="./../dog/Jump/Jump%20(1).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(2).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(3).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(4).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(5).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(6).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(7).png" className="center" width="200" height="200" alt="dog jump" />
                    <img src="./../dog/Jump/Jump%20(8).png" className="center" width="200" height="200" alt="dog jump" />
                </div>

                <div id="animation6" className="dog dead">
                    <img src="./../dog/Dead/Dead%20(1).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(2).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(3).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(4).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(5).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(6).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(7).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(8).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(9).png" className="center" width="200" height="200" alt="dog dead" />
                    <img src="./../dog/Dead/Dead%20(10).png" className="center" width="200" height="200" alt="dog dead" />
                </div>

                <div id="animation7" className="dog falling">
                    <img src="./../dog/Fall/Fall%20(1).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(2).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(3).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(4).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(5).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(6).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(7).png" className="center" width="200" height="200" alt="dog fall" />
                    <img src="./../dog/Fall/Fall%20(8).png" className="center" width="200" height="200" alt="dog fall" />
                </div>

                <div id="animation8" className="dog hurt">
                    <img src="./../dog/Hurt/Hurt%20(1).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(2).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(3).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(4).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(5).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(6).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(7).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(8).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(9).png" className="center" width="200" height="200" alt="dog hurt" />
                    <img src="./../dog/Hurt/Hurt%20(10).png" className="center" width="200" height="200" alt="dog hurt" />
                </div>
                <div id="theButtons">
                    <button type="jumping" id="button1" className="btn btn-info btn-lg btn-block" onClick={this.startJumping}>Jump Now</button>
                    <button type="play dead" id="button2" className="btn btn-info btn-lg btn-block" onClick={this.startPlayDead}>Play Dead</button>
                    <button type="play falling " id="button3" className="btn btn-info btn-lg btn-block" onClick={this.startPlayFall}>Fall Down</button>
                    <button type="fake injury" id="button4" className="btn btn-info btn-lg btn-block" onClick={this.startPlayHurt}>Fake Injury</button>
                    <button type="change avatar" id="button5" className="btn btn-info btn-lg btn-block" onClick={this.startChangeAvatar}>Change Avatar</button>
                </div>
            </div >
        );
    }
}