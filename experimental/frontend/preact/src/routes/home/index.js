import { h } from 'preact';
import style from './style.css';
import { Link } from 'preact-router/match';



const Home = () => (
	<div class={style.home}>
		
		<div class="academie">
                <h1><font style="vertical-align: inherit;"><font style="vertical-align: inherit;color: #0d3280;">National Index of Digital Fragility</font></font></h1>
                <span id="bandeau-beta" style="width: 100%;background: #0d3280; color: #fff;display: block;padding: 1% 2%;margin: 2% 0;font-size: 13px;font-style: italic;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">This tool is a Beta version under development. </font><font style="vertical-align: inherit;">You can join the working group which will be in charge of producing a stable version from September 2020 with the INR and Mednum, by appearing at the e-mail address indicated at the top of the page or </font></font><em><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">via </font></font></em> <a href="https://lamednum.coop/actions/indice-de-fragilite-numerique/" target="_blank"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">the form on the Mednum website.</font></font></a></span>
                <p class="para" ><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">This cartographic tool, developed by the Responsible Digital Institute (INR), allows the visualization of indices of digital fragility territory by territory. </font><font style="vertical-align: inherit;">Digital fragility is identified on criteria linked to access to digital technology and on the level of skills of each and everyone.
                </font></font></p>
                <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                The digital fragility index of the territories was produced within the framework of the IncubO of SGAR Occitanie with the support of ANSA in partnership with Mednum, thanks to the support of the Transformation Fund for Public Action.
                </font></font></p>

            </div>
			<div id="mooc">
                <h2><font style="vertical-align: inherit;"><font style="vertical-align: inherit;color: #0d3280;">Detection of digital exclusion situations by territory</font></font></h2>
                <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                The digital fragility index, through its graphic representation, reveals the digital exclusion zones in a given territory. </font><font style="vertical-align: inherit;">This tool allows you, whether you are a municipality, a department or a region, to compare your digital fragility index with other territories.</font></font></p>
            </div>
			
			   <a href="#"  class="buttonlink" target="_blank">
				<font style="vertical-align: inherit;">
					<font style="vertical-align: inherit;">
					<nav>
                     <Link   href="/cartographie-indicateurs-fragilite">Access the cartography</Link>
		           </nav>
						</font></font></a>
	     <div class="Cardslink">
		 <h2><font style="vertical-align: inherit;"><font style="vertical-align: inherit;color: #0d3280;">The Four Indicators of Fragility</font></font></h2>
		 <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">The four indicators selected make it possible to create a global analysis based on access on the one hand (information, digital interfaces) and on skills on the other (use of an interface, administrative skills).
        </font></font></p>

		<div class="quatre-indicateurs_link" >
            <div class="un-indicateur_link">
                
                <h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Access to information</font></font></h3>
                <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                   Identify areas poorly covered by an information service offer or populations who will have difficulty understanding information.
                </font></font></p>
            </div>
            <div class="un-indicateur_link" >
                
                <h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Access to digital interfaces</font></font></h3>
                <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                   Identify areas poorly covered by networks or in which populations will have financial difficulties in accessing them. 
                </font></font></p>
            </div>
            <div class="un-indicateur_link" >
              
                <h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Ability to use digital interfaces</font></font></h3>
                <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                   Identify populations among which there is a frequency of illectronism or difficulty in using the Internet.
                </font></font></p>
            </div>
            <div class="un-indicateur_link" >
                
                <h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Administrative skills</font></font></h3>
                <p class="para"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                    Identify populations among whom there are difficulties in carrying out administrative procedures
                </font></font></p>
            </div>
        </div>
		 </div>
		
	
	</div>
);

export default Home;
