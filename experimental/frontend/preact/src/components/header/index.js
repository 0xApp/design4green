import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header}>
		<h1></h1>
		<nav>
		<img src="assets/icons/inr.jpg" alt="HTML5 Icon" style="width:128px;height:128px;"/>
			<Link activeClassName={style.active} href="/">Home</Link>
			{/* <Link activeClassName={style.active} href="/profile">Me</Link>
			<Link activeClassName={style.active} href="/profile/john">John</Link> */}
		</nav>
	</header>
);

export default Header;
