<template>
	<div class="w-85 margin-auto text-17 paddingtb-25">
		<div>
			<p>
				<strong>Cuenta Free / Beneficios Cuenta Premiun</strong>
			</p>
		</div>
		<div class="grey lighten-2 padding-25 b-radius-10">
			<ul>
				<li class="vertical-center margintb-10">
					<i class="material-icons red-text">fiber_manual_record</i>
					<span style="margin-left: 20px;">Test con preguntas reales</span>
				</li>
				<li class="vertical-center margintb-10">
					<i class="material-icons red-text">fiber_manual_record</i>
					<span style="margin-left: 20px;">Simulador oficial examenes SENASA</span>
				</li>
				<li class="vertical-center margintb-10">
					<i class="material-icons red-text">fiber_manual_record</i>
					<span style="margin-left: 20px;">Descubre todos los beneficios que brindamos</span>
				</li>
				<li class="vertical-center margintb-10">
					<i class="material-icons red-text">fiber_manual_record</i>
					<span style="margin-left: 20px;">Descubre todos los beneficios que brindamos, y accede a miles de exámenes</span>
				</li>
				<li class="vertical-center margintb-10">
					<i class="material-icons red-text">fiber_manual_record</i>
					<span style="margin-left: 20px;">Descubre todos los beneficios que brindamos</span>
				</li>
			</ul>
		</div>
		<div class="margint-45">
			<p>
				<strong>Historial de Planes</strong>
			</p>
		</div>
		<div class="row grey darken-3 b-radius-10 white-text reset">
			<div class="col s8">
				<p>Estatus</p>
			</div>
			<div class="col s2">
				<p>Inicio</p>
			</div>
			<div class="col s2">
				<p>Fin</p>
			</div>
		</div>
		<div class="row grey lighten-2 b-radius-10 paddingtb-10 vertical-center d-block-sm center-align-sm">
			<div class="col s12 m8">
				<p class="paddinglr-25 paddingtb-10 grey darken-3 d-inline-block b-radius-25 white-text">
					{{ Object.keys(subscription).length > 0 ? 'Premiun' : 'Free' }}
				</p>
			</div>
			<div class="col s12 m2">
				<p>{{ subscription.dateActiveFrom._seconds | dateTime }}</p>
			</div>
			<div class="col s12 m2">
				<p>{{ subscription.dateActiveUntil._seconds | dateTime }}</p>
			</div>
		</div>
		<div class="white-text margint-45">
			<vue-glide :breakpoints="breakpoint">
				<vue-glide-slide>
					<div class="padding-20 grey darken-3 b-radius-10">
						<h3>Free</h3>
						<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
						<button class="d-block paddinglr-25 w-90 b-radius-25 btn grey lighten-2" disabled>Plan Actual</button>
					</div>
				</vue-glide-slide>
				<vue-glide-slide>
					<div class="padding-20 grey darken-4 b-radius-10">
						<h3>3 Mes</h3>
						<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
						<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
					</div>
				</vue-glide-slide>
				<vue-glide-slide>
					<div class="padding-20 grey darken-4 b-radius-10">
						<h3>1 Año</h3>
						<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
						<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
					</div>
				</vue-glide-slide>
				<vue-glide-slide>
					<div class="padding-20 grey darken-4 b-radius-10">
						<h3>3 Años</h3>
						<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
						<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
					</div>
				</vue-glide-slide>
				<template slot="control">
			        <button class="b-radius-25 red btn" data-glide-dir="<"><</button>
			        <button class="b-radius-25 red btn" data-glide-dir=">">></button>
			      </template>
		    </vue-glide>
		</div>

	</div>
</template>
<script>
	import { Glide, GlideSlide } from 'vue-glide-js'

	export default {
		name: 'plan',
		components: {
			[Glide.name]: Glide,
			[GlideSlide.name]: GlideSlide
		},
		created(){
			this.loadData();
		},
		data(){
			return {
				subscription: {
					dateActiveFrom: {
						_seconds: 0
					},
					dateActiveUntil: {
						_seconds: 0
					},
				},
				breakpoint: {
				  800: {
				    perView: 2
				  },
				  600: {
				  	perView: 1
				  }
				}
			}
		},
		methods: {
			loadData(){
				this.$api.get(`subscriptions/${this.$store.state.user.subscriptionId}`).then(res => {
					if (Object.values(res.data).length > 0) {
						this.subscription = Object.values(res.data)[0];
					}
				})
			}
		},
		filters: {
			dateTime(value){
		  		let dateObj = new Date(value * 1000);
		  		let month = dateObj.getMonth();
			    let day = String(dateObj.getDate()).padStart(2, '0');
			    let year = dateObj.getFullYear();
			    let hour = dateObj.getHours().toString().length == 1 ? "0"+dateObj.getHours() : dateObj.getHours()
			    let minutes = dateObj.getMinutes().toString().length == 1 ? "0"+dateObj.getMinutes() :dateObj.getMinutes()
		  		return day + '-' + month + '-' + year + ' : ' + hour + ':' + minutes
		  	}
		}
	};
</script>
<style>
	
</style>
