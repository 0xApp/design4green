import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
// import Profile from '../routes/profile';
// import WindowTable from '../routes/profilewindowtable';
// import FluidTable from '../routes/fluid-table';
import VirtualTable from '../routes/virtual-table';
const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			{/* <Profile path="/cartographie-indicateurs-fragilite/" /> */}
			{/* <FluidTable path="/cartographie-indicateurs-fragilite/" /> */}
			{/* <WindowTable path="/cartographie-indicateurs-fragilite/" /> */}
			<VirtualTable path="/cartographie-indicateurs-fragilite/" />
		</Router>
	</div>
)

export default App;
