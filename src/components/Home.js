import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

const versionHistory = [
  {
    versionNumber: "1.1",
    items: [
      "added sanctuary donations tracker"
    ],
    date: "2017/06/10"
  },
  { 
    versionNumber: "1.0",
    items: [
      "the app has launched!",
      "various helper text added to guide users"
    ],
    date: "2017/04/26"
  },
  { 
    versionNumber: "0.9",
    items: [
      "basic features added",
      "version tracking enabled"
    ],
    date: "2017/04/23"
  },
];

class HomeComponent extends Component {

  makeVersionHistory(version) {
    let listItems = version.items.map((item, index) =>
      <li key={index}>{item}</li>
    );

    return (
      <div key={version.versionNumber}>
        <p><em>{version.date}</em> - Version: {version.versionNumber}</p>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

  render() {
    let appHistory = versionHistory.map((version) =>
      this.makeVersionHistory(version)
    );

    return (
      <div className="container">
      	<Grid className="home-container">
      		<Row className="hidden-xs">
      			<Col xs={12} md={12}>
              <div className="well">
                <p className="lead">Welcome to <strong><em>The Arcane Library</em></strong>, a companion app and set of utilities for the board game <strong>Gloomhaven</strong>. We hope you enjoy your stay!</p>
                <p><strong><em>The Arcane Library</em></strong> can track a variety of information about your Gloomhaven campaign, and also provides some <strong>standalone utilities</strong> that will work even when you're not tracking campaign progress.</p>
                <p>By using the <strong>Save</strong> and <strong>Load</strong> buttons at the top of the page, you can save your progress in Gloomhaven to a text file on your computer and resume tracking your game at a later time. Be sure to save often!</p>
                <p>If you need any help with the application, have any suggestions or requests, or have experienced any unexpected behaviour, please feel free to <strong><a href="https://boardgamegeek.com/user/FoxWithTwoTales">send me a message</a></strong> on BoardGameGeek.</p>
              </div>
      			</Col>
          </Row>
          <Row className="visible-xs">
            <Col xs={12} md={12}>
              <div className="well">
                <p className="lead">Welcome to <strong><em>The Arcane Library</em></strong>, a companion app and set of utilities for the board game <strong>Gloomhaven</strong>. We hope you enjoy your stay!</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>Standalone Utilities <small className="hidden-xs">Direct links to useful pages</small></h3>
            </Col>
            <Col xs={12} md={6}>
              <Button href="/utilities/enhancementCalculator" bsSize="large" block className="btn-brute">Enhancement Calculator</Button>
            </Col>
            <Col xs={12} md={6}>
              <Button href="/utilities/scenarioLevel" bsSize="large" block className="btn-doomstalker">Scenario Level Calculator</Button>
            </Col>
      		</Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>Upcoming Features <small className="hidden-xs">What we're working on next...</small></h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <p>You can view the GitHub repository's list of bugs and new features here: <a href="https://github.com/ninjawithkillmoon/gloomhaven-thearcanelibrary/issues">Issues</a>. Feel free to comment or make requests.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>About this App <small className="hidden-xs">Who, what, where, why</small></h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <p>This app was originally made by John Tonkin, a software developer from Adelaide, Australia.</p>
              <ul>
                <li><a href="https://boardgamegeek.com/user/FoxWithTwoTales">BoardGameGeek profile</a></li>
                <li><a href="https://github.com/ninjawithkillmoon">GitHub profile</a></li>
                <li><a href="mailto:john.william.tonkin+thearcanelibrary@gmail.com">Email</a></li>
              </ul>
              <p>The code is available open source on <a href="https://github.com/ninjawithkillmoon/gloomhaven-thearcanelibrary">GitHub</a>. It is built using the front-end JavaScript framework <a href="https://facebook.github.io/react/">React</a>.</p>
              <p>Feel free to contact me regarding the app: bugs reports, feature requests, comments or offers of assistance all appreciated.</p>
              <p>None of this would be possible without the wonderful creation that is <strong><a href="https://boardgamegeek.com/boardgame/174430/gloomhaven">Gloomhaven</a></strong>, a board game by <strong><a href="https://boardgamegeek.com/boardgamedesigner/69802/isaac-childres">Isaac Childres</a></strong> at <strong><a href="http://www.cephalofair.com/">Cephalofair Games</a></strong>.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="text-center">
              <h3>App History <small className="hidden-xs">See what has changed here</small></h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              {appHistory}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default HomeComponent;