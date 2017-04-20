import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';

class HomeComponent extends Component {

  render() {
    return (
      <div className="container">
      	<Grid>
      		<Row>
      			<Col xs={12} md={12}>
              <Jumbotron>
                <h1>Welcome!</h1>
                <p>Stay a while and listen...</p>
              </Jumbotron>
      			</Col>
      		</Row>
      	</Grid>
      </div>
    );
  }
}

export default HomeComponent;