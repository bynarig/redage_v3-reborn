<script>
	import { translateText } from 'lang'
	import Male from './images/ava.png'
	import Female from './../images/female.png'
	import Fib_logo from './images/6.png'
	
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
<div class="card_leather lspd_leather" id="card">
	<div class="ct">
		<div class="left badgeLSPD">
			<div class="a rounding5">
	<div class="b1 badge">
		<div class="card badge fib rounding5">
			<div class="content">
				<div class="title">
					<span>LOS SANTOS</span>
					<span>POLICE DEPARTMENT</span>
				</div>
				
				<div class="ava" style="background-image: url({gender === translateText('player', 'Мужской') ? Male : Female})"/>
				
				<div class="desc">
					<span class="line">{name} {surname}</span>
					<span>{translateText('player', 'Имя')}</span>
				</div>
				
				<div class="desc">
					<span class="line">{rank}</span>
					<span>{translateText('player', 'Должность')}</span>
				</div>
				
				<div class="desc">
					<span class="line">RA{pad(cardNO)}</span>
					<span>{translateText('player', 'Жетон')}</span>
				</div>
				
				<img src={Fib_logo} class="img_lg img_lspdBadge" alt="fib" />		
				
			</div>
		</div>
	</div>
</div></div></div>
</div>