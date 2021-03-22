<template>
	<div>
		<div>
			<div id="header" class="d-flex d-block-sm reset vertical-center">
				<div class="w-20 w-40-lg w-100-sm center-align-sm paddingl-15 padding-10-sm">
					<h4 class="reset">PilotSurvey</h4>
				</div>
				<div class="w-80 w-80-lg w-100-sm vertical-center justify-content-around paddingr-25 padding-0-sm menu">
					<p @click="$router.push({name: 'managesubjects'})">Asignaturas</p>
					<p @click="$router.push({name: 'managetopics'})">Temas</p>
					<p class="dropdown-trigger vertical-center" data-target="questions">
						Preguntas
						<i class="material-icons right">arrow_drop_down</i>
					</p>
					<p @click="$router.push({name: 'managecodes'})">Códigos Prom.</p>
					<p @click="$router.push({name: 'managetests'})">Test</p>
					<p @click="$router.push({name: 'managesusers'})">Usuarios</p>
					<p @click="$router.push({name: 'managesuscriptions'})">Suscripciones</p>
					<p @click="$router.push({name: 'managemessages'})">Notificación</p>
					<p @click="$router.push({name: 'home'})">
						<i class="material-icons">exit_to_app</i>
					</p>

					<ul id="questions" class="dropdown-content">
					  <li><a @click="$router.push({name: 'questionslist'})" href="#!">Preguntas</a></li>
					  <li><a @click="$router.push({name: 'managequestions'})" href="#!">Crear Preguntas</a></li>
					</ul>
				</div>
			</div>
			
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
		</div>
		<div class="views">
			<router-view></router-view>
		</div>
		<slot></slot>
	</div>
</template>

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

<script>
	import { mapState } from 'vuex'
	export default {
		name: 'admin-layout',
		created(){
			this.menu = this.profile;
			this.$store.commit('SET_SHOWPROFILE', true);
			this.currentUrl = this.$route.name;
		},
		mounted(){
			$(".dropdown-trigger").dropdown();
		},
		data(){
			return {
				showMenuResponsive: false,
				title: 'dashboard-layout',
				currentUrl: '',
				schoolName: 'Nombre de Escuela',
				show_header: true,
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

		},
		computed:{
			...mapState(['showProfile', 'user']),
		},		

	}

</script>