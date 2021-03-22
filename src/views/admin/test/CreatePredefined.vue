<template>
	<div>
		<div class="grey lighten-2 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 padding-35 b-radius-10 center-align">
					<div class="text-17">
						<strong>Código Promocional</strong>
					</div>
					<div>
						<p>Busca la asignatura que deseas aprender y personaliza <br> tu examen oficial, nuestra plataforma cuenta con las últimos exámenes oficiales de SENASA</p>
					</div>
					<div class="margint-45 text-17 left-align grey-text">
						<p>
							<strong>Seleccionar asignatura, tema y tipo de examen</strong>
						</p>
					</div>
					<div class="grey lighten-4 padding-25 left-align b-radius-10">
						<div class="row">
							<div class="col s12 m2 vertical-center">
								<p>
									<strong>Asignatura</strong>
								</p>
							</div>
							<div class="col s12 m10">
								<select v-model="test.subject" class="browser-default selectg" name="" id="">
									<option :value="{id:null}" selected disabled>Selecciona una asignatura</option>
									<option v-for="(item, index) in subjects" :key="index" :value="item">{{ item.name }}</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col s12 m2 vertical-center">
								<p>
									<strong>Tema</strong>
								</p>
							</div>
							<div class="col s12 m10">
								<select class="browser-default selectg" id="">
									<option selected disabled>Selecciona un tema</option>
									<option v-for="(item, index) in filterBy(topics, test.subject.id, 'subjectId')" :value="item.$value" :key="index">{{ item.$value.name }}</option>
								</select>
							</div>
						</div>
						<div class="row">
							<div class="col s12 m2 vertical-center">
								<p>
									<strong>Tipo</strong>
								</p>
							</div>
							<div class="col s12 m10">
								<select class="browser-default selectg" name="" id="">
									<option selected disabled>Selcciona el tipo de exámen</option>
									<option>Preguntas no realizadas</option>
									<option>Repetir preguntas</option>
									<option>Aleatorio</option>
								</select>
							</div>
						</div>
					</div>


					<div class="margint-45 text-17 left-align grey-text">
						<p>
							<strong>Simular exámen oficial 4</strong>
						</p>
					</div>

					<div class="row justify-content-between d-block-sm">
						<div class="col s12 m5 padding-25 marginlr-0 grey-text text-darken-2 grey lighten-4 b-radius-10 margintb-15-sm">
							<div class="row">
								<div class="col s12 m5 left-align">
									<p>
										<strong>N° de Preguntas</strong>
									</p>
								</div>
								<div class="col s11 m6 input-field margin-0">
									<input v-model="test.questionNum" placeholder="Introduce un número" type="text">
									<i class="material-icons prefix">edit</i>
								</div>
							</div>
							<div class="row">
								<div class="col s12 m5 left-align">
									<p>
										<strong>ID de Preguntas</strong>
									</p>
								</div>
								<div class="col s11 m6 input-field margin-0">
									<input placeholder="Introduce un número" type="text">
									<i class="material-icons prefix">edit</i>
								</div>
							</div>
						</div>
						<div class="col s12 m5 padding-25 marginlr-0 grey-text text-darken-2 grey lighten-4 b-radius-10 margintb-15-sm">
							<div class="row vertical-center">
								<div class="col s10 left-align vertical-center">
									<p class="reset">
										<strong>Desea Corregir al finalizar</strong>
									</p>
								</div>
								<div class="col s2 input-field">
									<p class="reset">
										<label>
										  <input v-model="toCorrect" value="toFilanized" class="with-gap" name="group3" type="radio" checked />
										  <span></span>
										</label>
									</p>
								</div>
							</div>
							<div class="row vertical-center">
								<div class="col s10 left-align vertical-center">
									<p class="reset">
										<strong>Desea Corrección simultánea</strong>
									</p>
								</div>
								<div class="col s2 input-field">
									<p class="reset">
										<label>
										  <input v-model="toCorrect" value="simultaneous" class="with-gap" name="group3" type="radio" checked />
										  <span></span>
										</label>
									</p>
								</div>
							</div>
						</div>
					</div>

				</div>

				<div class="center-align margint-30">
					<button @click="createTest" class="btn red b-radius-25 paddinglr-50">Generar Test</button>
				</div>
				<br>
			</div>
		</div>
		<div v-if="modal" class="modal-window all-center">
			<div class="content-modal white w-45 b-radius-10 paddinglr-40 paddingb-40">
				<p class="right-align">
					<strong @click="modal = false" class="cursor-pointer">X</strong>
				</p>
				<div class="center-align">
					<h5>
						<strong>Advertencia</strong>
					</h5>
					<p class="text-20">No hay preguntas suficientes <br> para generar un Test</p>
				</div>
				<div class="justify-content-between margin-auto w-90 margint-45">
					<div><button class="paddinglr-25 btn b-radius-25 red">Incluir preguntas</button></div>
					<div><button @click="createTest" class="paddinglr-40 btn b-radius-25 red">Generar test</button></div>
				</div>
				<pre>{{ error }}</pre>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue2Filters from 'vue2-filters'
	export default {
		mixins: [Vue2Filters.mixin],
		name: 'CreatePredefined',
		created(){
			this.$store.commit('SET_LAYOUT', 'dashboard-layout');
			this.$store.commit('SET_SHOWPROFILE', false);
			
			this.$api.get('subjects').then(response => {
				this.subjects = response.data;
			}).catch( error => {
				M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
			})

			this.$api.get('topics').then(response => {
				this.topics = response.data
			}).catch( error => {
				M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
			})
		},
		mounted(){
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems);
		},
		data(){
			return {
				modal: false,
				subjects: [],
				topics: [],
				code: "",
				toCorrect: '',
				test: {
					createdAt: new Date(),
					name: "Test",
					description: "string",
					userId: "",
					questionNum: null,
					toCorrect: null,
					limitTime: 0,
					numQuestionRightToSuccess: 0,
					questions: [],
					simultaneousCorrection: null,
					testType: null,
					totalScore: 0,
					code: "string",
					subjectId:null
				},
				questions: [],
				error: {}
			}
		},
		methods: {
			createTest(){

				let keys = Object.keys(this.test)	;
				let validate =  true;
				keys.forEach((item, index) => {					
					if (item == 'subject' && this.test[item] == null) {
						M.toast({html: 'Ingrese una asignatura'});
						validate = false;
					}
					if (item == 'questionNum'  && this.test[item] == null) {
						M.toast({html: 'Ingrese la cantidad de preguntas'});
						validate = false;
					}
					if ((item == 'toCorrect' && this.test[item] == null)
						|| (item == 'simultaneousCorrection' && this.test[item] == null)) {
						M.toast({html: 'Elija el método a Corregir'});
						validate = false;
					}
				})
				console.log(validate)
				if (validate) {
					this.$api.get('questions').then(response => {
						this.questions = Object.values(response.data);
					}).catch( error => {
						M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
					}).then(() => {						
						this.test.questions = this.questions.slice(0,this.test.questionNum);
						//this.test.subject = {id: this.test.subject.id};
						this.$api.post('tests', this.test).then(response => {
							M.toast({html: 'Test Creado con Éxito', classes: 'blue-grey lighten-5 black-text'});
							console.log(response.data)
							this.$router.push({name: 'predefinedtest'})
						}).catch( error => {
							this.error = this.test;
						})
						console.log(this.test);
					})
				}
			}
		},
		watch: {
			toCorrect(value){
				if (value == 'toFilanized') {
					this.test.toCorrect = true;
					this.test.simultaneousCorrection = false;
				}else{
					this.test.toCorrect = false;
					this.test.simultaneousCorrection = true;
				}
			}
		}
	};
</script>

<style>
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
		min-height: 80%;
		height: auto;
	}
	.modal-window{
		position: fixed;
		width: 100%;
		background-color: rgba(0,0,0,0.5);
		top: 0;
		bottom: 0;
	}
	.selectg{
		border: 0 !important;
		border-bottom: 1px solid #f1f1f1 !important;
		background-color: transparent !important;
	}
</style>