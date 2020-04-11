import React from 'react';
// import './HomePage.css';
import { Header } from './Header'; 

export class Logout extends React.Component {
    render() {
        return (
            <div className="Logout">
                <Header />
                { renderScreen() }
            </div>
        );
    }
}

function renderScreen() {
    return (
<body>
  <div id="main_nav"></div>
  <main>
    <section id="login-form">
      <div class="page-header">
        <h1>Log Out?</h1>
      </div>
      <br/>
      <button id="log_out" class="btn btn-primary">Log Out</button>
      <div id="meta-container" class="card hidden"></div>
    </section>
  </main>
</body>
    )
}

export default Logout;