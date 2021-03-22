<template>
	<div>
		<div class="d-flex bg-project">
			<div class="w-75 padding-25 paddinglr-60">
				<p class="text-35 white-text">
					<strong>
						Inicia un test gratuitamente y  comprueba cuando estás 100% preparado para ir a realizar tus exámenes oficiales
					</strong>
				</p>
				<p class="text-20 red-text">Estamos mejorando las funcionalidades que ofrecemos</p>
			</div>
			<div class="w-25 v-center">
				<button @click="$router.push({name: 'generate'})" class="btn btn-large paddinglr-55 b-radius-25 red">Iniciar Test</button>
			</div>
		</div>
		<div id="tariffs" class="all-center">
			<div class="w-80 max-w-1400 white-text">
				<div class="center-align margint-55">
					<h2 class="extra-bold">Nuestras Tarifas</h2>
					<p class="text-25">Mejora tus probabilidades de aprobar tu exámen para piloto privado</p>
				</div>

				<div class="white-text margint-45">
					<vue-glide :breakpoints="breakpoint" :autoplay="4000" :bound="true">
						<vue-glide-slide>
							<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
								<h3>Free</h3>
								<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
								<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
							</div>
						</vue-glide-slide>
						<vue-glide-slide>
							<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
								<h3>3 Mes</h3>
								<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
								<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
							</div>
						</vue-glide-slide>
						<vue-glide-slide>
							<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
								<h3>1 Año</h3>
								<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
								<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
							</div>
						</vue-glide-slide>
						<vue-glide-slide>
							<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
								<h3>3 Años</h3>
								<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
								<button class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
							</div>
						</vue-glide-slide>

						<template v-if="false" slot="control">
					        <button class="b-radius-25 red btn" data-glide-dir="<"><</button>
					        <button class="b-radius-25 red btn" data-glide-dir=">">></button>
					    </template>
				    </vue-glide>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Glide, GlideSlide } from 'vue-glide-js'
	export default {
		name: 'Tariffs'	,
		components: {
			[Glide.name]: Glide,
			[GlideSlide.name]: GlideSlide
		},
		data(){
			return {
				breakpoint: {
				  800: {
				    perView: 2
				  },
				  600: {
				  	perView: 1
				  }
				},
			}
		},
		methods: {

		}
	}
	
</script>

<style type="text/css" scoped>
	#tariffs{
		background-image: url(../../assets/img/bg-tariffs.jpg);
		min-height: 400px;
		background-size: cover;
		padding-bottom: 40px;
	}
	.bg-project{
		background-color: #262936;
	}
</style>