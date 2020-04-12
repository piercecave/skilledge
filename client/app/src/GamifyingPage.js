import React from 'react';
import './GamifyingPage.css';
import { Header } from './Header';

export class GamifyingPage extends React.Component {

    constructor(props) {
        super(props);

        document.title = 'Gamifying';

        this.GET_EVENTS_FOR_USER_URL = process.env.REACT_APP_BACKEND_URL + "/users/events";
    }

    //     // event listener for jumping
    // window.addEventListener('click', (e)=>{
    //     if(e.target.id == "button1"){
    //         startJumping()
    //     }
    // });

    // // event listener for playing dead
    // window.addEventListener('click', (e)=>{
    //     if(e.target.id == "button2"){
    //         startPlayDead()
    //     }
    // });

    // // event listener for fall
    // window.addEventListener('click', (e)=>{
    //     if(e.target.id == "button3"){
    //         startPlayFall()
    //     }
    // });

    // // event listener for hurt
    // window.addEventListener('click', (e)=>{
    //     if(e.target.id == "button4"){
    //         startPlayHurt()
    //     }
    // });




    // function that makes avatar jump 
    startJumping() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }

        // blocks orginial picture 
        document.getElementById("myCat").style.display = 'none';

        // unblocks current picture
        document.getElementById("animation1").children[0].style.display = 'block';

        var frames = document.getElementById("animation1").children;

        var frameCount = frames.length;
        var i = 0;

        const interval = setInterval(() => {
            frames[i % frameCount].style.display = "none";
            frames[++i % frameCount].style.display = "block";
        }, 100);

        setTimeout(() => {
            clearInterval(interval)

            // hides all the picture 
            for (const child of document.getElementById("animation1").children) {
                child.style.display = "none";
            }
            // reverts back to normal pictue
            document.getElementById("myCat").style.display = 'block';

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = false;
            }
        }, 2000)
    }




    // function that makes avatar jump 
    startPlayDead() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }
        // blocks orginial picture 
        document.getElementById("myCat").style.display = 'none';

        // unblocks current picture
        document.getElementById("animation2").children[0].style.display = 'block';

        var frames = document.getElementById("animation2").children;

        var frameCount = frames.length;
        var i = 0;

        const interval = setInterval(() => {
            frames[i % frameCount].style.display = "none";
            frames[++i % frameCount].style.display = "block";
        }, 100);

        setTimeout(() => {
            clearInterval(interval)

            // hides all the picture 
            for (const child of document.getElementById("animation2").children) {
                child.style.display = "none";
            }
            // reverts back to normal pictue
            document.getElementById("myCat").style.display = 'block';

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = false;
            }
        }, 2000)
    }


    // function that makes avatar play falling down
    startPlayFall() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }
        // blocks orginial picture 
        document.getElementById("myCat").style.display = 'none';

        // unblocks current picture
        document.getElementById("animation3").children[0].style.display = 'block';

        var frames = document.getElementById("animation3").children;

        var frameCount = frames.length;
        var i = 0;

        const interval = setInterval(() => {
            frames[i % frameCount].style.display = "none";
            frames[++i % frameCount].style.display = "block";
        }, 100);

        setTimeout(() => {
            clearInterval(interval)

            // hides all the picture 
            for (const child of document.getElementById("animation3").children) {
                child.style.display = "none";
            }
            // reverts back to normal pictue
            document.getElementById("myCat").style.display = 'block';

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = false;
            }
        }, 2000)
    }


    // function that makes avatar play hurt
    startPlayHurt() {

        for (const buttons of document.getElementById("theButtons").children) {
            buttons.disabled = true;
        }
        // blocks orginial picture 
        document.getElementById("myCat").style.display = 'none';

        // unblocks current picture
        document.getElementById("animation4").children[0].style.display = 'block';

        var frames = document.getElementById("animation4").children;

        var frameCount = frames.length;
        var i = 0;

        const interval = setInterval(() => {
            frames[i % frameCount].style.display = "none";
            frames[++i % frameCount].style.display = "block";
        }, 100);

        setTimeout(() => {
            clearInterval(interval)

            // hides all the picture 
            for (const child of document.getElementById("animation4").children) {
                child.style.display = "none";
            }
            // reverts back to normal pictue
            document.getElementById("myCat").style.display = 'block';

            for (const buttons of document.getElementById("theButtons").children) {
                buttons.disabled = false;
            }
        }, 2000)
    }

    render() {
        return (
            <div className="GamifyingPage">
                <Header />
                <div id="recordContainer" className="container">
                    <div className="card my-3">
                        <div className="card-body">
                            <h5 className="card-title">Record Your Progress!</h5>


                            <img src="./../cat/Idle/Idle%20(1).png" id='myCat' className="center d-block" width="200" height="200" alt="idle"/>


                            <div id="animation1" className="center jump ">
                                <img src="./../cat/Jump/Jump%20(1).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(2).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(3).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(4).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(5).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(6).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(7).png" className="center" width="200" height="200" alt="cat jump"  />
                                <img src="./../cat/Jump/Jump%20(8).png" className="center" width="200" height="200" alt="cat jump"  />
                            </div>

                            <div id="animation2" className="center play dead ">
                                <img src="./../cat/Dead/Dead%20(1).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(2).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(3).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(4).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(5).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(6).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(7).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(8).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(9).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Dead/Dead%20(10).png" className="center" width="200" height="200" alt="cat dead"  />
                            </div>

                            <div id="animation3" className="center play falling">
                                <img src="./../cat/Fall/Fall%20(1).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(2).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(3).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(4).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(5).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(6).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(7).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Fall/Fall%20(8).png" className="center" width="200" height="200" alt="cat dead"  />
                            </div>

                            <div id="animation4" className="center play hurt">
                                <img src="./../cat/Hurt/Hurt%20(1).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(2).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(3).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(4).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(5).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(6).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(7).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(8).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(9).png" className="center" width="200" height="200" alt="cat dead"  />
                                <img src="./../cat/Hurt/Hurt%20(10).png" className="center" width="200" height="200" alt="cat dead"  />
                            </div>
                        </div>
                        <div id="theButtons">
                            <button type="jumping" id="button1" className="btn btn-info btn-lg btn-block" onClick={this.startJumping}>Jump</button>
                            <button type="play dead" id="button2" className="btn btn-info btn-lg btn-block" onClick={this.startPlayDead}>Play Dead</button>
                            <button type="play falling " id="button3" className="btn btn-info btn-lg btn-block" onClick={this.startPlayFall}>Fall Down</button>
                            <button type="fake injury" id="button4" className="btn btn-info btn-lg btn-block" onClick={this.startPlayHurt}>Fake Injury</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GamifyingPage;