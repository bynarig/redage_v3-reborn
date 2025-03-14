<script>
	import { translateText } from '#/shared/locale'
	import Male from './../images/male.png'
	import Female from './../images/female.png'
	import Logo from './images/logo.png'

	export const gender;
	export const name;
	export const surname;
	export const rank;
	export const cardNO;

	const pad = (str, max = 6) => {
		str = str.toString();
		return str.length < max ? pad("0" + str, max) : str;
	}
</script>

<div class="card_army msc rounding5" id="card">
	<div class="right"><p>IDENTIFICATION CARD</p></div>
	<div class="content">
	
		<div class="ar1">
			<div class="title">
			Merryweather Security Consulting
			</div>
			
			<img src={Logo} alt="" />
			<p>Active Duty</p>
		</div>
		<div class="ava">
			<img src={gender === "male" ? Male : Female} width="140" height="172" alt="avatar"/>
			<div>Security</div>
			<div class="usa"></div>
			<div class="label">
				<span>{translateText('player', 'Имя')}:</span>
				<span>{name} {surname}</span>
			</div>

			<div class="label">
				<span>{translateText('player', 'Должность')}:</span>
				<span>{rank}</span>
			</div>

			<div class="label">
				<span>Identification Card NO.</span>
				<span>RA{pad(cardNO)}</span>
			</div>
		</div>
			
	</div>
	
	<p class="bottom-ar">
	THIS IS THE WARRANT AND AUTHORITY FOR EXECUTING THE DUTIES OF THEIR OFFICE.
	</p>
	<div class="serial"></div>
</div>