import React from 'react';
import { Divider } from 'semantic-ui-react';
const Home = () => (
	<div>
	  <div>
		  <img src="./assets/temp.png" />
		  <div>
			  <span>Name (by artist)</span> 
			  <span>Description</span>
			  <span>Year</span>
			  <span>Estimated value</span>
			  <button>Bid now</button>
		  </div>
	  </div>
	  <Divider />
	  <p>---------------------------</p>
	  <p>Auctions</p>
	  <p>
	    <img src="./assets/logo.jpeg" />
	    <img src="./assets/logo.jpeg" />
	    <img src="./assets/logo.jpeg" />
	  </p>
	  <p>Artists</p>
	  <Divider />
	  <p>
	    <img src="./assets/logo.jpeg" />
	    <img src="./assets/logo.jpeg" />
	    <img src="./assets/logo.jpeg" />
	  </p>
    </div>
)
export default Home;
