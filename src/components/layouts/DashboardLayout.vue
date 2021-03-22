<template>
	<div>
		<div>
			<div id="header" class="d-flex d-block-sm reset vertical-center">
				<div class="w-55 w-40-lg w-100-sm center-align-sm paddingl-15 padding-10-sm">
					<h4 class="reset">PilotSurvey</h4>
				</div>
				<div class="w-45 w-60-lg w-100-sm justify-content-around paddingr-25 padding-0-sm menu">
					<p @click="setMenu(test)">Test</p>
					<p @click="$router.push({name: 'tariffs'})">Tarifas</p>
					<p @click="setMenu(profile)">Perfil</p>
					<p @click="$router.push({name: 'home'})">Cerrar Sesión</p>
				</div>
			</div>
			<template v-if="tariffs">
				<template v-if="showProfile">
					<div v-if="false" class="row reset subheader">
						<div class="col s12 m6 row all-center-sm">
							<div class="col m4 right-align">
							</div>
							<div class="col m8">
								<p class="text-17">
									<strong class="d-inline-block">{{ user.displayName }}</strong>
									<i @click="show_header = false" class="material-icons text-17 d-inline-block marginl-25 cursor-pointer">edit</i>
								</p>
								<p>{{ user.email }}</p>
							</div>
						</div>
					</div>
					<transition name="fade">
						<div v-if="show_header == false" class="row reset subheader">
							<div class="col m7 s12 row">
								<div class="col s12 m10">
									<p class="input-field">
										<input class="w-50 marginr-10 white-text h-0" style="height: 1.3rem;" v-model="user.displayName" type="text">
										<i class="prefix">Nombres y Apellidos</i>
									</p>
									<p class="input-field">
										<input class="w-50 marginr-10 white-text h-0" style="height: 1.3rem;" v-model="user.email" type="text">
										<i class="prefix">Correo Electrónico</i>
									</p>
									<p class="input-field">
										<input class="w-50 marginr-10 white-text h-0" style="height: 1.3rem;" v-model="schoolName" type="text">
										<i class="prefix">Nombre de la Escuela</i>
									</p>
								</div>
							</div>
							<div class="col m5 s12 center-align-sm right-align paddinglr-45">
								<div>
									<p>
										<strong>Cuenta Free</strong>
										/ Probar Premiun
									</p>
									<div class="margint-45 margintb-20-sm">
										<button @click="updateUser" class="paddinglr-35 btn red b-radius-25">Guardar</button>
									</div>
								</div>
							</div>
						</div>
					</transition>
				</template>

				<div class="red all-center">
					<div class="white-text sub-menu">
						<div v-for="(url, index) in menu" :key="index" @click="loadView(url.name)" :class="currentUrl == url.name ? 'active-item' : ''" class="d-none-sm option">
							<p>{{ url.text }}</p>
						</div>
						<div class="menu-responsive">
							<div class="padding-10 menu-icon">
								<i @click="showMenuResponsive = true" class="material-icons">menu</i>
							</div>
							<div v-if="showMenuResponsive" class="menu-options">
								<div class="d-block-sm center-align"> 
									<i @click="showMenuResponsive = false" class="material-icons">close</i> 
								</div>
								<div v-for="(url, index) in menu" :key="index" @click="loadView(url.name)" class="d-block-sm center-align-sm">
									<p>{{ url.text }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
		<div class="views">
			<router-view></router-view>
		</div>
		<slot></slot>
	</div>
</template>


<script>
	import { mapState } from 'vuex'
	export default {
		name: 'dashboard-layout',
		created(){
			this.menu = this.profile;
			this.$store.commit('SET_SHOWPROFILE', true);
			this.currentUrl = this.$route.name;			
		},
		data(){
			return {
				tariffs: true,
				showMenuResponsive: false,
				title: 'dashboard-layout',
				currentUrl: '',
				schoolName: 'Nombre de Escuela',
				show_header: true,
				profile: [
					{name: 'messages', text: 'Mis Mensajes'},
					{name: 'school', text: 'Mi Escuela'},
					{name: 'promotionalcode', text: 'Cod. Promocional'},
					{name: 'plan', text: 'Mi Plan'},
					{name: 'password', text: 'Contraseña'},
				],
				test: [
					{name: 'generate', text: 'Generar Test'},	
					{name: 'predefinedtest', text: 'Test Predefinido'},
					{name: 'record', text: 'Test Historial'},
					{name: 'addquestion', text: 'Añadir Pregunta'},

				],
				menu: [],
			}
		},
		methods: {
			updateUser(){
				if (confirm("¿Está seguro de realizar esta acción?")) {
					
					this.$api.put('users', this.user).then(res => {
						M.toast({html: 'Usuario Actualizado'});
						this.$store.commit('SET_USER', this.user);
						this.show_header = true;
					}).catch(err => {
						M.toast({html: 'Usuario Actualizado'});
						this.$store.commit('SET_USER', this.user);
						this.show_header = true;
					})
				}
			},
			setMenu(menu){
				this.menu = menu;
				if (menu == this.profile) {
					this.$store.commit('SET_SHOWPROFILE', true);
				}else{
					this.$store.commit('SET_SHOWPROFILE', false);
				}
				this.loadView(this.menu[0].name);
			},
			loadView(url){
				this.$router.push({name: url});
				this.currentUrl = url;
				this.showMenuResponsive = false;
			},
		},
		computed:{
			...mapState(['showProfile', 'user']),
		},
		watch: {
			'$route.name'(value){
				if (value == "tariffs") {
					this.tariffs = false
				}else{
					this.tariffs = true
				}
			},
			'$route.fullPath'(value){
				let path = value.split("/")[1];
				if (path == 'test') {
					this.menu = this.test;
				}
				if (path == 'profile') {
					this.menu = this.profile;
				}
			}
		}

	};
</script>

<style scoped>
	@media (max-width: 600px){
		.menu-responsive{
			display: block !important;
		}
		.menu-responsive > .menu-icon{
			text-align: center;
		}
		.menu-responsive > .menu-options{
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			left: 0;
			background-color: #F44336;
			padding-top: 25px;
			z-index: 1000;
		}
		.menu p{
			padding: 10px 15px;
		}
	}
	.menu-responsive{
		display: none;
	}
	.fade-leave-active{
		transition: 0;
	}
	.fade-enter-active{
		transition: opacity .1s;
	}
	.fade-enter, .fade-leave-to{
	  opacity: .5;
	}
	p{
		line-height: 1;
	}
	#header h4{
		margin: 20px 40px;
	}
	#header{
		background-color: #262936;
		color: white;
		border-bottom: 6px solid #1b879b;
	}
	.subheader{
		background-color: #262936;
		color: white;
		padding-top: 18px !important;
	}
	.menu{
		min-height: 72px;
	}
	.menu p{
		padding: 10px 25px;
		cursor: pointer;
	}
	.menu p:hover{
		border-bottom: 3px solid red;
	}
	.sub-menu p{
		padding: 10px 25px 10px 25px;
		cursor: pointer;	
		font-size: 16px;
	}
	.sub-menu .option{
		display: inline-block;
		cursor: pointer;
	}
	.sub-menu .option:hover, .active-item{
		background-color: white;
		color: #262936;
	}
	.w-50{
		width: 50% !important;
	}
	.input-field .prefix{
		width:auto;
		font-size:15px;
		top: 0.7rem;
	}
	



</style>
