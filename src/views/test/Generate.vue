<template>
	<div>
		<div class="grey lighten-2 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 padding-35 b-radius-10 center-align">
					<div class="text-17">
						<strong>Generar Test</strong>
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
								<select :disabled="officialTest" v-model="topicSelected" class="browser-default selectg" id="">
									<option selected disabled>Selecciona un tema</option>
									<option value="allTopics">Todos los temas</option>
									<option v-for="(item, index) in filterBy(topics, test.subject.id, 'subjectId')" :value="item.$value.id" :key="index">{{ item.$value.name }}</option>
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
								<select v-model.number="test.testType" class="browser-default selectg" name="" id="">
									<option selected disabled>Selcciona el tipo de exámen</option>
									<option :value="1">Oficial</option>
									<option :value="2">Todas las preguntas</option>
									<option :value="0">Preguntas más falladas</option>
									<option :value="3">Preguntas marcadas con Flag</option>
									<option :value="4">Preguntas no realizadas</option>
									<option :value="5">De un ratio de aciertos de menor a mayor</option>
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
									<input v-model="test.questionNum" :disabled="showQuestionsId || officialTest" placeholder="Introduce un número" type="text">
									<i class="material-icons prefix">edit</i>
								</div>
							</div>
							<div class="row">
								<div class="col s12 m5 left-align">
									<p>
										<strong>Ingresar ID de preguntas</strong>
									</p>
								</div>
								<div class="col s11 m6 input-field margin-0 switch">
									<label>
								      No
								      <input :disabled="officialTest" v-model="showQuestionsId" type="checkbox">
								      <span class="lever"></span>
								      Si
								    </label>
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
										  <input :disabled="officialTest" v-model="toCorrect" value="simultaneous" class="with-gap" name="group3" type="radio" checked />
										  <span></span>
										</label>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div v-show="showQuestionsId" class="w-90 left-align text-darken-2 grey lighten-4 b-radius-10 margintb-15-sm padding-25 input-field grey-text">
						<p><strong>Ingresa los ID's de las preguntas separados por coma ","</strong></p>
						<!--
							<textarea placeholder="Ingresa los ID's" class="materialize-textarea"></textarea>
						-->
					    <input v-model="questionsIds" class="custom-class">
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
	import { mapState } from 'vuex'
	import Vue2Filters from 'vue2-filters'
	export default {
		mixins: [Vue2Filters.mixin],
		name: 'generate',
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
			this.test.toCorrect = true;
			this.test.simultaneousCorrection = false;
			this.getFlagsQuestions();
		},
		mounted(){
			var elems = document.querySelectorAll('select');
			var instances = M.FormSelect.init(elems);

			let elems2 = document.querySelectorAll('.chips');
			let options = {
				limit: 20,
				placeholder: "Ingresa los ID's"
			}
    		let instances2 = M.Chips.init(elems2, options);
		},
		data(){
			return {
				officialTest: false,
				showQuestionsId: false,
				modal: false,
				questionsIds: [],
				subjects: [],
				topics: [],
				topicSelected: {},
				toCorrect: 'toFilanized',
				test: {
					createdAt: new Date().toISOString(),
					totalScore: 0,
					name: "Test",
					description: "fromGenerator",
					userId: "",
					questionNum: 10,
					toCorrect: null,
					limitTime: 0,
					numQuestionRightToSuccess: 0,
					questions: [],
					simultaneousCorrection: null,
					allowedOnlySubscribers: true,
					testType: null,
					subjectId: null,
					topicId: null,
					subject:{id: null},
					code: "string",
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
					if (item == 'subjectId' && this.test[item] == null) {
						M.toast({html: 'Seleccione una asignatura'});
						validate = false;
					}
					if (item == 'topicId' && this.test[item] == null) {
						M.toast({html: 'Seleccione un tema'});
						validate = false;
					}
					if (item == 'questionNum' && this.test[item] == 0) {		
						if (!this.showQuestionsId) {
							M.toast({html: 'Ingrese la cantidad de preguntas'});
							validate = false;
						}
					}
					if (item == 'testType'  && this.test[item] == null) {
						M.toast({html: 'Seleccione un tipo de Test'});
						validate = false;
					}
					if ((item == 'toCorrect' && this.test[item] == null)
						|| (item == 'simultaneousCorrection' && this.test[item] == null)) {
						M.toast({html: 'Elija el método a Corregir'});
						validate = false;
					}
				})
				if (validate) {

					let url = '';
					url = this.topicSelected == "allTopics" ? 'questions' : `questions/search/topicId/${this.topicSelected}`;
					
					let type = this.test.testType;

					if (type != 3 && type != 1 && this.showQuestionsId == false) {
						if (type == 0) url = 'questions?orderBy=fails&order=desc'; // MostFailed
						if (type == 2) url = 'questions'; // AllQuestions
						if (type == 4) url = 'questions/search/countAnswered/0'; // NoPerformed
						if (type == 5) url = 'questions?orderBy=countAnswered&order=asc'; // HitRatio
						this.getQuestionOrdered(url)
					}else if (type == 3) {
						this.postTest(this.questions) // Get Flag Questions
					}else if (type == 1) {
						this.createOfficialTest() // Official
					}else if (this.showQuestionsId){
						this.getQuestionsForIds();
					}
				}
			},
			getFlagsQuestions(){
				let questions = [];
				this.user.userData.flags.forEach( async elem => {
					this.$api.get(`questions/${elem}`).then(res => {
						this.questions.push(res.data);
					})
				})
			},
			getQuestionsForIds(){
				if (this.questionsIds.length > 2) {
					console.log(this.questionsIds)
				}else{
					M.toast({html: "Debes ingresar mínimo 5 preguntas"})
				}
			},
			async getQuestionOrdered(url){
				await this.$api.get(url).then(res => {
					let arr = Object.values(res.data);
					let topics = "";
					if (this.topicSelected == 'allTopics') {
						topics = this.filterBy(Object.values(this.topics), this.test.subject.id, 'subjectId')
						let result = [];
						topics.forEach( elem => {
							let found = arr.filter(item => item.topicId === elem.id)	
							if (typeof found != 'undefined') {
								found.forEach( elem => {
									result.push(elem)
								});
							}
						})
						console.log("Heey",result);
						if (result.length < this.test.questionNum) {
							M.toast({html: 'No hay preguntas suficientes'});
						}else{
							this.postTest(result)
						}
					}else{
						topics = this.topicSelected
						let result = [];
						result = arr.filter(elem => elem.topicId == this.topicSelected);
						console.log("Heey",result);
						if (result.length < this.test.questionNum) {
							M.toast({html: 'No hay preguntas suficientes'});
						}else{
							this.postTest(result)
						}
					}
				})
			},
			createOfficialTest(){
				this.$api.get(`tests/search/subjectId/${this.test.subject.id}`).then(res => {
					let result = Object.values(res.data);
					//M.toast({html: 'Esta función está en revisión'});
					if (result.length > 0) {
						result[0].createdAt = new Date().toISOString();
						console.log(result[0]);
						this.$api.post('tests', result[0]).then(response => {
							M.toast({html: 'Test Creado con Éxito'});
							this.$router.push({name: 'test', params: {id: response.data }})
						}).catch( error => {
							this.error = this.test;
						})
					}else{
						M.toast({html: 'No existe un exámen oficial para esta asignatura'});
					}
				})
			},
			postTest(questions){
				this.test.questions = questions.slice(0,this.test.questionNum);
				this.$api.post('tests', this.test).then(response => {
					M.toast({html: 'Test Creado con Éxito'});
					console.log(response.data)

					this.$router.push({name: 'test', params: {id: response.data }})
				}).catch( error => {
					this.error = this.test;
				})
			}
		},		
		computed:{
		  	...mapState(['user']),
		},
		watch: {
			'test.subject'(value){
				this.test.subjectId = value.id;
			},
			questionsIds(){
				this.questionsIds = this.questionsIds.split(",")
			},
			showQuestionsId(value){
				value ? this.test.questionNum = 0 : this.test.questionNum = 10;
			},
			'test.testType'(value){
				//
				this.test.toCorrect = false;
				this.test.simultaneousCorrection = true;
				if(value == 1){
					this.toCorrect = "toFilanized";
					this.test.toCorrect = true; 
					this.test.simultaneousCorrection = false;
					this.officialTest = true;
					this.topicSelected = "allTopics";
				}else{
					this.officialTest = false
					this.toCorrect = "simultaneous";
				}
			},
			topicSelected(value){
				this.test.topicId = value
			},
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
		border-bottom: 1px solid #b3b2b2 !important;
		background-color: transparent !important;
	}
</style>