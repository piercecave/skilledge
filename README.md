# Skill Edge: Web Applicaiton for Helping Build your Skills

Within this repo we have a collection of Node.js, SQL, and Java files that work
in conjunction to build a web application for helping individuals track and
build their skills.

### What Does it Do?

The web application prompts users for a skill they want to focus on improving
within a month timespan and provides interactive UI that allows users to schedule
how and when they want to hone their specific skill.

## Developer Instructions

Hi! In order to work on this code you will want to deploy it to your local computer. In order to do that you will need to navigate to:

    skilledge/client/app/

and run the following code:

    bash live-local-deploy-client.sh

This will make it so any time you save your code you will see it in your browser.

In order to get this fully functional you will also have to navigate to:

    skilledge/backend

and run:

    local-deploy-client.sh

After that, navigate to:

    skilledge/backend/gateway

and run:

    live-local-deploy-gateway.sh

Boom. Please do not run the any scripts not prepended with live-local or local as those scripts deploy to the main website if you have credentials.


### Visualizations

Within the backend of the application we are tracking user input and log times
to gather meta data that will help us build D3 visualizations of each individual
user and how often they have practiced their skill. We have our own API that
we draw data from and communicate that information to the AWS server we are
hosted on.

We soon hope to compute all user data into platform-wide visualizations that
offer a look into what skills are being practiced in specific areas.

### Conclusion

The source code for the initial build of our web application is hosted here
and illustrates how we will build the application over the next 16 weeks. 

### Contact Info

<!-- ![Ethan](/assets/ethan.PNG) -->
<img src="/assets/ethan.PNG" alt="Ethan" width="200px"/>
<b>Ethan Toth</b><br/>
<i>Data Analyst and Project Management</i><br/>
ethan.toth.al@gmail.com<br/><br/><br/>

<!-- ![Matthew](/assets/matthew.JPG) -->
<img src="/assets/matthew.JPG" alt="Matthew" width="200px"/>
<b>Matthew Cho</b><br/>
<i>Data Analyst and Full-Stack Developer</i><br/>
jcho95@uw.edu<br/><br/><br/>

<!-- ![Roy](/assets/roy.jpg) -->
<img src="/assets/roy.jpg" alt="Roy" width="200px"/>
<b>Roy Mosby</b><br/>
<i>Data Analyst and Front-End Developer</i><br/>
mosbyroy@uw.edu<br/><br/><br/>

<!-- ![Pierce](/assets/pierce.png) -->
<img src="/assets/pierce.png" alt="Pierce" width="200px"/>
<b>Pierce Cave</b><br/>
<i>Full-Stack Developer</i><br/>
pcave@uw.edu<br/><br/><br/>