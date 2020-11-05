import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1></h1>
		<nav>
		<Link   href="/"><img src="assets/icons/inr.jpg" alt="HTML5 Icon" /></Link>
		
			
		</nav>
	</header>
);

export default Header;
