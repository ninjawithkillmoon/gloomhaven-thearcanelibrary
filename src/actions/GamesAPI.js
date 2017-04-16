import fetch from 'node-fetch';

export default {

  newGame: () => {
  	/*
    return fetch("http://ec2-13-54-124-87.ap-southeast-2.compute.amazonaws.com/api/Games/newGame", {
        method: "POST",
        compress: false
      })
      .then(function(response) {
        return response.json();
      });
    */

    return {
  		name: "John's Game"
    };

  }
}