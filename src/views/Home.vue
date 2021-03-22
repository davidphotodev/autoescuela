<template>
  <div id="main">
  	<header class="all-center">
  		<div class="w-85 max-w-1400">
  			<div class="jc-between d-block-sm paddingtb-25 paddingb-5-sm">
	  			<div class="w-30 w-100-sm center-align-sm all-center-sm">
	  				<div class="vertical-center">
	  					<img width="70px" src="../assets/img/logo.png">
	  					<h4 class="d-inline reset grey-text">Au<strong class="red-text">survey</strong></h4>
	  				</div>
	  			</div>
	  			<div class="w-70 w-100-sm jc-end vertical-center horizontal-center-sm margintb-15-sm d-block-sm center-align-sm">
	  				<div class="">
	  					<i class="paddinglr-10 material-icons white-text">adjust</i>
		  				<i class="paddinglr-10 material-icons white-text">adjust</i>
		  				<i class="paddinglr-10 material-icons white-text">adjust</i>
		  				<i class="paddinglr-10 material-icons white-text">adjust</i>
	  				</div>
	  			</div>
	  		</div>
	  		<hr class="white">
	  		<div>
	  			<div class="w-100 jc-between menu vertical-center d-block-sm d-block-md">
					<div class="jc-between d-block-sm center-align-sm w-100-md">
						<p class="d-none">Test</p>
						<p class="d-none">Tarifas</p>
					</div>
					<div class="center-align d-none d-block-sm paddingb-20-sm">
						<span @click="showLogin" class="white-text c-pointer">Iniciar Sesión</span>
					</div>
					<div class="paddingtb-15">
						
						<form @submit.prevent="login" class="jc-between w-100-md paddingtb-15-md d-none-sm" :style="{display: loginResponsive}">
							<div class="margintb-15-sm marginlr-15 center-align-sm">
								<input required="" v-model="userLogin.email" placeholder="Email" class="txt-header browser-default" type="email">
							</div>
							<div class="margintb-15-sm marginlr-15 center-align-sm">
								<input required="" v-model="userLogin.password" placeholder="Contraseña" class="txt-header browser-default" type="password">
							</div>
							<div class="margintb-15-sm marginlr-15 center-align-sm">
								<button class="paddinglr-40 btn b-radius-25 red">Iniciar Sesión</button>
							</div>
						</form>
					</div>
				</div>
	  		</div>
  		</div>
  	</header>

  	<div id="slide" class="all-center">
  		<div class="row w-80 max-w-1400 white-text w-95-md">
  			<div class="col s12 m7 paddinglr-30">
  				<div class="d-none-sm">
  					<img src="../assets/img/logo.png">
  				</div>
  				<div class="margintb-30-sm">
  					<h3 class="extra-bold text-35-sm">Simulación de exámenes oficial de SENASA</h3>
  					<p class="text-17">
  						La mejor forma de prepararte para superar los exámenes oficiales y conseguir rapidamente tu licencia de piloto privado
  					</p>
  					<button class="paddinglr-40 btn b-radius-25 blue paddinglr-10-sm w-100-sm">Simula tu primer exámen</button>
  				</div>
  			</div>
  			<div class="col s12 m5">
  				<div>
  					<p class="extra-bold text-19">Regístrate</p>
  					<p class="text-17">Y obtén una evaluación gratis</p>
  				</div>
  				<form @submit.prevent="formSend">
  					<div class="box-register padding-20 b-radius-10">
	  					<div class="margin-15">
	  						<p class="p p-input">NOMBRES Y APELLIDOS</p>
	  						<input required v-model="userToCreate.displayName" class="txt-register browser-default" type="text">
	  					</div>
	  					<div class="margin-15">
	  						<p class="p p-input">EMAIL</p>
	  						<input v-validate="'required|email'" name="email" required v-model="userToCreate.email" class="txt-register browser-default" type="email">
	  						<span>{{ errors.first('email') }}</span>
	  					</div>
	  					<div class="margin-15">
	  						<p class="p p-input">CONTRASEÑA</p>
	  						<input v-validate="'required'" name="password" ref="password" required minlength="6"  v-model="userToCreate.password" class="txt-register browser-default" type="password">
	  						<span>{{ errors.first('password') }}</span>
	  					</div>
	  					<div class="margin-15">
	  						<p class="p p-input">REPITA LA CONTRASEÑA</p>
	  						<input v-validate="'required|confirmed:password'" name="password_confirmed" minlength="6"  class="txt-register browser-default" type="password">
	  						<span>{{ errors.first('password_confirmed') }}</span>
	  					</div>
	  					<div class="margin-15 margint-45">
	  						<button type="submit" class="paddinglr-40 btn b-radius-25 red w-100"><strong>Regístrate</strong></button>
	  					</div>
	  					<div class="right-align">
	  						<span class="p p-input cursor-pointer">¿OLVIDÓ SU CONTRASEÑA?</span>
	  					</div>
	  				</div>
  				</form>
  			</div>
  		</div>
  	</div>
	
	<div id="features" class="all-center">
		<div class="w-80 max-w-1400">
			<div class="margint-45">
				<p class="p text-19">Test</p>
				<h3 class="margin-0"><strong class="extra-bold">Exámen</strong> SENASA</h3>
			</div>
			<div class="margint-25">
				<div class="row vertical-center d-block-sm">
					<div class="col s12 m6 d-none d-block-sm">
						<img width="100%" src="../assets/img/features-1.png">
					</div>
					<div class="col s12 m6">
						<h4 class="extra-bold">Programa de exámenes de SENASA</h4>
						<p class="text-17">Trabajamos con una base actualizada de exámenes electrónicos de conocimientos teóricos para la obtención de licencias LMA y para el levantamiento de limitaciones y diferencias establecidas por AESA</p>
						<p class="text-17 margint-35 blue-text cursor-pointer"><strong>Iniciar Test</strong></p>
					</div>
					<div class="col s12 m6 d-none-sm">
						<img width="100%" src="../assets/img/features-1.png">
					</div>
				</div>

				<div class="row margint-25 vertical-center d-block-sm">
					<div class="col s12 m6">
						<img width="100%" src="../assets/img/features-2.png">
					</div>
					<div class="col s12 m6">
						<p class="grey-text extra-bold text-40 text-35-sm">Preguntas únicas completamente explicadas por pilotos experimentados</p>
						<p class="text-17 margint-35 blue-text cursor-pointer"><strong>Iniciar Test</strong></p>
					</div>
				</div>

				<div class="row margint-25 vertical-center d-block-sm">
					<div class="col s12 m6 d-none d-block-sm">
						<img width="100%" src="../assets/img/features-1.png">
					</div>
					<div class="col s12 m6">
						<h4 class="extra-bold">Programa de exámenes de SENASA</h4>
						<p class="text-17">Trabajamos con una base actualizada de exámenes electrónicos de conocimientos teóricos para la obtención de licencias LMA y para el levantamiento de limitaciones y diferencias establecidas por AESA</p>
						<p class="margint-35 blue-text cursor-pointer"><strong>Iniciar Test</strong></p>
					</div>
					<div class="col s12 m6 d-none-sm">
						<img width="100%" src="../assets/img/features-1.png">
					</div>
				</div>				
			</div>
		</div>
	</div>

	<div id="call-to-action" class="all-center white-text paddingtb-25">
		<div class="w-80 max-w-1400 row vertical-center d-block-sm">
			<div class="col s12 m2 d-none-sm">
				<img class="w-80" src="../assets/img/logo.png" alt="">
			</div>
			<div class="col s12 m7">
				<h5 class="extra-bold">Inicia un test gratuitamente y comprueba cuando estás al 100% preparado para ir a realizar tus exámenes oficiales</h5>
				<p class="margint-25 red-text p">Estamos mejorando las funcionalidades que ofrecemos</p>
			</div>
			<div class="col s12 m3 margint-25-sm">
				<button class="paddinglr-40 btn b-radius-25 red">Iniciar Test</button>
			</div>
		</div>
	</div>

	<div id="tariffs" class="all-center">
		<div class="w-80 max-w-1400 white-text">
			<div class="center-align margint-55">
				<h3 class="extra-bold">Nuestras Tarifas</h3>
				<p class="text-19">Mejora tus probabilidades de aprobar tu exámen para piloto privado</p>
			</div>

			<div class="white-text margint-45">
				<vue-glide :breakpoints="breakpoint" :autoplay="4000" :bound="true">
					<vue-glide-slide>
						<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
							<h3>Free</h3>
							<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
							<button @click="subscription()" class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
						</div>
					</vue-glide-slide>
					<vue-glide-slide>
						<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
							<h3>3 Mes</h3>
							<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
							<button @click="subscription()" class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
						</div>
					</vue-glide-slide>
					<vue-glide-slide>
						<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
							<h3>1 Año</h3>
							<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
							<button @click="subscription()" class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
						</div>
					</vue-glide-slide>
					<vue-glide-slide>
						<div class="padding-20 margin-20 grey darken-4 b-radius-10 z-depth-3">
							<h3>3 Años</h3>
							<p>Descubre todos los benficios que brindamos, y accede a miles de exámenes...</p>
							<button @click="subscription()" class="d-block paddinglr-25 w-90 b-radius-25 red btn">Suscribirme</button>
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

	<div id="footer" class="all-center">
		<div class="w-80 max-w-1400 row white-text paddingt-55">
			<div class="col m3 paddinglr-20">
				<div class="vertical-center">
					<img width="30%" src="../assets/img/logo.png">
					<strong class="text-25 grey-text">Pilot<strong class="red-text">Survey</strong></strong>
				</div>
				<div>
					<p>Pilotsurvey te ofrece un banco de preguntas y respuestas correctamente actualizadas</p>
				</div>
			</div>
			<div class="col m3 paddinglr-20">
				<strong>MEMBRESÍAS</strong>
				<hr class="white-text">
				<p> 1 MES</p>
				<p> 2 MESES</p>
				<p> 1 AÑO</p>
				<p> 3 A 6 AÑOS</p>
			</div>
			<div class="col m3 paddinglr-20">
				<strong>AYUDA</strong>
				<hr class="white-text">
				<p> PAGOS</p>
				<p> SUSCRIPCIÓN</p>
				<p> POLÍTICAS DE DE PRIVACIDAD</p>
			</div>
			<div class="col m3 paddinglr-20">
				<strong>NOSOTROS</strong>
				<hr class="white-text">
				<p> ¿QUIÉNES SÓMOS?</p>
				<p> AYÚDANOS A MEJORAR</p>				
			</div>
		</div>
	</div>
  </div>
</template>


<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { mapState } from 'vuex'

export default {
	name: 'Home',
	components: {
		[Glide.name]: Glide,
		[GlideSlide.name]: GlideSlide
	},
	created(){
		this.$store.commit('SET_LAYOUT', 'simple-layout');
		
		console.log("Hola");
	},
	data(){
		return {
			label: "Cargando...",
			userToCreate: {
				email: null,
				emailVerified: true,
				phoneNumber: "",
				password: null,
				displayName: null,
				photoURL: 'http://url-imagen/imagen.png',
				disabled: false,
			},
			userLogin: {
				email: "dilan@mail.com",
				password: "123456"
			},
			userId: null,
			loginResponsive: '',
			sendQuestions: {
			   	name: "",
				description: "",
				score: 0,
				code: "",
				explanation: "",
				owner: "",
				topicId: "",
				fails: 0,
				success: 0,
				percentRight: 0,
				countAnswered: 0,
				answers: [
				  {
				    name: "",
				    description: "",
				    score: 0,
				    right: true,
				    selected: true,
				    id: "",
				  }
				],
				annexed: "",
				statement: "",
				isApproved: true,
				id: ""
			  },
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
		createUser() {
			this.userToCreate.phoneNumber = Math.random().toString().substring(2, 11);
			//console.log(Math.random().toString().substring(2, 11));

			this.$validator.validateAll().then(res => {					
				if (!res) {
					M.toast({html: 'Debes llenar los datos correctamente', classes: 'red white-text'});
				}else{
					let user = {};
					this.$api({
						method: 'post',
						url: 'users',
						data: this.userToCreate
					}).then( response => {
						console.log(response.data);
						user = response.data;
						M.toast({html: 'Usuario Creado'});
					}).catch( error => {
						if (error.response.data.code == "auth/email-already-exists") {
							M.toast({html: 'El email introducido ya se encuentra registrado', classes: 'red white-text'});	
						}else{
							M.toast({html: 'Ha ocurrido un error', classes: 'red white-text'});
							console.log(error.response);
						}
					});
				}
			})
		},
		login(){
			this.$store.dispatch('login', this.userLogin).then(res => {
				if (this.userLogin.email == 'administrador@mail.com') {
					this.$router.push({name: 'managesubjects'});
				}else{
					this.$router.push({name: 'messages'});
				}
			})
		},
		async login2(){
			this.$api({
				method: 'post',
				url: 'users/login',
				data: this.userLogin
			}).then( response => {
				console.log(response.data);
				this.$store.commit('SET_USER', response.data);
				console.log(response.data)
				this.$api.post('user-data', {
					userId: response.data.uid,
					flags: [],
					subscriptionId: "",
					sendQuestions: this.sendQuestions,
					isAdmin: false,
					displayName: response.data.displayName
				}).then( res => {
					M.toast({html: 'El usuario ha sido creado'});
					this.$router.push({name: 'messages'});
				})
				this.userId = response.data.uid;
			}).catch( error => {
				M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
				console.log(error);
			});
		},

		showLogin(){
			if (this.loginResponsive == '') {
				this.loginResponsive = 'block !important';
			}else{
				this.loginResponsive = '';
			}
		},
		formSend(){
			this.createUser();
		},
		subscription(){
			M.toast({html: 'Debes registrarte para tener una suscripción'});
		}
	},
};
</script>


<style scoped>
	header{
		background-color: #262936;
	}
	#call-to-action{
		background-color: #262936;
	}
	#features{
		padding: 50px 20px;
	}
	#footer{
		background-color: #262936;
	}
	#tariffs{
		background-image: url(../assets/img/bg-tariffs.jpg);
		min-height: 400px;
		background-size: cover;
		padding-bottom: 40px;
	}
	#slide{
		min-height: 600px;
		background-image: url(../assets/img/bg-slide.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	#slide > div{
		margin-top: 10%;
		margin-bottom: 5%;
	}
	.box-register{
		background-color: rgba(0,0,0,.5);
	}
	.menu p{
		min-height: 48px;
		padding: 10px 25px;
		cursor: pointer;
		color: white;
	}
	.menu p:hover{
		border-bottom: 3px solid red;
	}
	.p-input{
		font-size: 13px;
		color: grey;
		margin: 3px;
	}
	.txt-header{
		border-radius: 15px;
		padding: 6px 10px;
		border: 0;
		background-color: #191b24;
		color: white;
	}
	.txt-header::placeholder{
		padding: 0 0 8px 0;
		color: white;
	}
	.txt-register{
		border: 0;
		border-radius: 15px;
		color: black;
		padding: 8px;
		width: 100%;
	}
	.txt-register::placeholder{
		color: black;
	}

	@media (max-width: 600px){
		.menu p{
			min-height: 25px;
			padding: 2px 2px;
			cursor: pointer;
			color: white;
		}
	}
</style>


