<template>
	<div>
		<div class="grey lighten-2 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-95 margintb-20 white b-radius-7-5 padding-25 padding-15-sm">
				<div class="d-flex d-block-md">
					<div class="w-60 w-100-md paddingl-20">
						<p class="text-18 vertical-center">
							<i class="material-icons arrow_left">keyboard_arrow_left</i><strong>Realización del Test</strong>
						</p>
						<p><strong>Alumno:</strong> {{user.displayName}} | <strong>Licencia:</strong> ATPL V33</p>
						<p><strong>Examen:</strong> Simulación de exámen oficial de SENASA</p>
						<p><strong>Record:</strong> {{ questions.length }} Preguntas </p>
						<p><strong>Tipo de Test:</strong> Corrección Simultánea</p>
						<p v-show="textScore" class="text-20"><strong>Puntuación Final: </strong> {{ finalScore }}</p>
					</div>
					<div class="w-40 w-100-md all-center d-block-md margint-35-md">
						<div class="w-50 w-85-sm">
							<p>
								<button @click="modal = true" ref="btnFinish" class="w-100 btn b-radius-25 grey darken-4">Finalizar</button>
							</p>
						</div>
					</div>
				</div>
				<hr class="margintb-25 white-text">
				
				<div v-if="isMobile" class="vertical-center jc-between">					
					<i class="material-icons">chevron_left</i>
					<div class="d-none d-inline-block-sm w-85">
						<vue-glide :perView="4" :bound="true">
							<vue-glide-slide v-for="(item, index) in questions" :key="index">
								<div class="center-align">
									<span @click="fillQuestion(index)" class="chip-nro-question cursor-pointer" ref="chipList" >{{ index+1 }}</span>
								</div>
							</vue-glide-slide>
					    </vue-glide>
					</div>
					<i class="material-icons">chevron_right</i>
				</div>

				<div>
					<p><strong>Respuestas</strong></p>
					<div class="d-flex">
						<div v-if="!isMobile" class="w-30 paddingr-60 padding-5-md d-none-sm">
							<div class="w-90 grey lighten-4 h-100 d-flex b-radius-10">
								<div class="w-50 borderr-1 padding-10 padding-5-md">
									<span v-for="(item, index) in questions" :key="index" @click="fillQuestion(index)" ref="chipList" class="chip-nro-question cursor-pointer">{{ index+1 }} | </span>
								</div>
							</div>
						</div>
						<div class="w-70 w-100-sm">
							<template>
								<div class="d-flex jc-between">
									<p>
										<strong v-html="question.name"></strong>
									</p>
									<p>
										<i @click="addFlag" class="material-icons padding-5 grey darken-4 white-text b-radius-total c-pointer">flag</i>
									</p>
								</div>
								<div>
									<div v-for="(item, index) in question.answers" :key="index" @click="answerSelection(index)" ref="answerSelection" class="selectAnswer paddingtb-15 paddinglr-25 b-radius-25 margintb-15 grey lighten-4">
										<p class="p vertical-center">
											<strong class="text-25 marginr-10">{{letters[index]}}</strong>
											<span class="text-16" v-html="item.name"></span>
										</p>
									</div>
								</div>
							</template>
							<div class="d-flex d-block-sm paddingl-10 margint-30">
								<div  class="w-50 w-100-sm margintb-15-sm center-align-sm">
									<strong v-if="question.annexed != ''" class="btn grey darken-4">
										<a target="_blank" class="white-text" :href="question.annexed">Ver Anexo</a>
									</strong>

									<button v-if="showExplanation" @click="modalExplanation.open()" class="btn grey darken-4 marginl-10 pulse-local">Explicación</button>
								</div>
								<div class="w-50 w-100-sm jc-end margint-20-sm">
									<div class="w-100 w-80-lg w-100-md right-align all-center-sm">
										<button v-if="!finishTest" @click="skipQuestion" class="w-50 btn b-radius-25 grey darken-4">Omitir</button>
										<button @click="nextQuestion" class="w-50 btn b-radius-25 grey darken-4">
											{{ showExplanation ? 'Siguiente' : 'Corregir' }}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="modal" class="modal-window all-center">
					<div class="content-modal white w-80 b-radius-10 paddinglr-40 paddingb-40">
						<p class="right-align">
							<strong @click="modal = false" class="cursor-pointer">X</strong>
						</p>
						<div class="center-align">
							<h4>¿Desea corregir el Test?</h4>
						</div>
						<div class="center-align margin-auto margint-45">
							<div>
								<button @click="processTest" class="paddinglr-25 marginlr-10 btn b-radius-25 red">Si</button>
								<button @click="modal = false" class="paddinglr-25 marginlr-10 btn b-radius-25 red">No</button>
							</div>
						</div>
					
					</div>
				</div>
				<div id="modalExplanation" class="modal bottom-sheet">
				    <div class="modal-content">
					    <div class="center-align">
					      	<div>
					      		<p class="w-75 d-inline-block">
						      		<span class="text-20"><strong>Explicación de la Pregunta</strong></span>
						      	</p>
					      	</div>
					    </div>
				    	<div class="left-align paddinglr-30">
				    		<p class="text-18 d-inline-block" style="white-space: pre-line;" v-html="question.explanation"></p>
				    	</div>
				    </div>
				    <div class="modal-footer center-align">
				      <a href="#!" class="modal-close waves-effect waves-green btn-flat black white-text w-80 center-align">Entendido</a>
				    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Glide, GlideSlide } from 'vue-glide-js'
export default {

  name: 'SimultaneousCorrection',
  props: ['response'],
  components: {
	[Glide.name]: Glide,
	[GlideSlide.name]: GlideSlide
  },
  created(){
  	this.test = this.response.data[Object.keys(this.response.data)[0]];
	this.questions = this.response.data[Object.keys(this.response.data)[0]].questions.slice();
	this.questions.forEach( elem => {
		elem.answers.forEach( elem => {
			elem.selected = false
		});
	});
	this.question = this.questions[0];
	this.question.answers = this.shuffle(this.question.answers);
  },
  mounted(){
  		var elems = document.querySelectorAll('select');
    	var instances = M.FormSelect.init(elems);
		this.updateChip(false);
		
		var tagModal = document.getElementById('modalExplanation');
		var configModal = M.Modal.init(tagModal)
		this.modalExplanation = M.Modal.getInstance(tagModal);
		if (screen.width < 600) {
			this.isMobile = true
		}
  },
  data() {
    return {
    	isMobile: false,
    	modal: false,
    	modalExplanation: null,
    	currentAnswer: 17,
    	answerPosition: 15,
    	questions: [],
    	question: {},
    	answerSelected: {},
    	indexQuestions: 0,
    	finalScore: 0,
    	textScore: false,
    	letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    	indexLetter: 0,
    	nextQuestionBoolean: false,
    	showExplanation: false,
    	finishTest: false,
    	test: {},
    };
  },
  methods: {
  	addFlag(){

  		let result = this.user.userData.flags.findIndex(elem => elem == this.question.id);
  		let userData = JSON.parse(JSON.stringify(this.user.userData));

  		console.log(result)
  		if (result != -1) {  			
			this.user.userData.flags.splice(result, 1);
			this.user.userData.sendQuestions.subjectId = "";
			this.$api2.put('user-data', this.user.userData).then(res => {
				this.$store.commit('SET_USER', this.user);
				M.toast({html: 'Pregunta removida'});
			})

			console.log(this.question)
  		}else{
			userData.flags.push(this.question.id);
			userData.sendQuestions.statement = "";
			userData.sendQuestions.isApproved = true;
			userData.sendQuestions.subjectId = "";
			this.$api2.put('user-data', userData).then(res => {
				this.user.userData.flags.push(this.question.id);
				this.$store.commit('SET_USER', this.user);
				M.toast({html: 'Pregunta añadida'});
			})
			console.log(this.question)
  		}
  	},
  	updateChip(filled){
  		this.$refs.chipList.forEach((item) => item.classList.remove('b-chip'));
  		this.$refs.chipList[this.indexQuestions].classList.add('b-chip')
  		if (filled) {
  			let text = this.indexQuestions +" | "+ this.letters[this.indexLetter];  			
  			this.$refs.chipList[this.indexQuestions-1].textContent = text;
  		}else if (filled == null) {
  			let text = this.indexQuestions+1 +" | "+ this.letters[this.indexLetter];
  			console.log("Texto",text)
  			this.$refs.chipList[this.indexQuestions].textContent = text;
  		}
  	},
  	fillQuestion(index){
  		return false
  		this.question = this.questions[index];
  		this.indexQuestions = index;
  		this.updateChip(false);
  	},
  	answerSelection(index){
  		let validate = true;
  		if (this.showExplanation) {
  			validate = false;
  			M.toast({html: 'No se puede editar la respuesta', classes: 'red white-text'});
  		}
  		if (validate) {
  			this.$refs.answerSelection.forEach((item) => item.classList.remove('b'));
	  		this.$refs.answerSelection[index].classList.add('b');
	  		this.answerSelected = this.question.answers[index];
	  		this.answerSelected.selected = true;
	  		this.indexLetter = index;
  		}
  	},
  	skipQuestion(){
  		let validate = true;
  		if(this.finishTest){
  			M.toast({html: 'Debe corregir el Test'});
  			this.$refs.btnFinish.classList.add('pulse-local');
  			this.$refs.btnFinish.classList.add('z-depth-2');
  			this.$refs.chipList.forEach((item) => item.classList.remove('b-chip'));
  			this.$refs.chipList[this.$refs.chipList.length-1].classList.add('grey-darken2')
  			validate = false
  		}
  		if (this.showExplanation) {
  			M.toast({html: 'Ya se ha corregido la respuesta', classes: 'red white-text'});
  			validate = false;
  		} 
		if (validate) {
			this.answerSelected = {};
		  	this.$refs.answerSelection.forEach((item) => item.classList.remove('b'));
		  	if (this.indexQuestions <= this.questions.length-1) this.indexQuestions++;
		  	console.log("True or False",this.indexQuestions <= this.$refs.chipList.length-1)
		  	if (this.indexQuestions <= this.$refs.chipList.length-1) {
		  		this.$refs.chipList[this.indexQuestions-1].classList.add('grey-darken2')
		  		this.updateChip(false);
		  	}
		  	if (this.questions[this.indexQuestions] !== undefined) {
				this.question = this.questions[this.indexQuestions];
				this.question.answers = this.shuffle(this.question.answers);
		  	}
		}
		if (this.indexQuestions-1 == this.questions.length-1) {
			console.log("Entra y desabilita")
  			this.finishTest = true;
  			this.indexQuestions--;
  		}
  	},
  	nextQuestion(){
  		let validate = true;
  		if (this.finishTest) {
  			M.toast({html: 'Debe finalizar el Test'});
  			this.$refs.btnFinish.classList.add('pulse-local');
  			this.$refs.btnFinish.classList.add('z-depth-2');
  			this.$refs.chipList.forEach((item) => item.classList.remove('b-chip'));
  			validate = false
  		}else if(Object.keys(this.answerSelected).length === 0){
  			M.toast({html: 'Debe seleccionar una respuesta', classes: 'blue white-text'});
  			validate = false
  		}else if (!this.nextQuestionBoolean) {
  			console.log(this.nextQuestionBoolean);
  			if (this.question.explanation != null) {
	  			this.showExplanation = !this.showExplanation;
	  			if (this.showExplanation) {
	  				validate = false;
	  				this.updateChip(null);
	  				if (this.answerSelected.right){
	  					this.$refs.chipList[this.indexQuestions].classList.add('green')
	  				}else{
	  					this.$refs.chipList[this.indexQuestions].classList.add('red')
	  				}
	  			}else{
	  				validate = true
	  			}
  			}
  		}
  		if (validate) {
  			if (this.questions[this.indexQuestions+1] !== undefined) {
  				this.question = this.questions[this.indexQuestions+1];
  				this.question.answers = this.shuffle(this.question.answers);
		  	}
	  		//console.log("Cierto o False", this.answerSelected.right)
	  		this.questions[this.indexQuestions].countAnswered += 1;
	  		if (this.answerSelected.right) {
		  		this.$refs.chipList[this.indexQuestions].classList.add('green')
	  			this.finalScore += this.questions[this.indexQuestions].score;
	  			this.questions[this.indexQuestions].success += 1;
		  		this.questions[this.indexQuestions].percentRight += 
		  			this.questions[this.indexQuestions].success * 100 /
		  			this.questions[this.indexQuestions].countAnswered;
	  		}else{
	  			this.$refs.chipList[this.indexQuestions].classList.add('red')
	  			this.questions[this.indexQuestions].fails += 1;
	  		}

	  		console.log(this.questions[this.indexQuestions]);
	  		this.answerSelected = {};
	  		this.$refs.answerSelection.forEach((item) => item.classList.remove('b'));
	  		if (this.questions.length-1 == this.indexQuestions) {
	  			console.log("Entró")
	  			this.finishTest = true;
	  			M.toast({html: 'Debe finalizar el Test'});
	  			this.indexQuestions--;
	  			this.$refs.btnFinish.classList.add('pulse-local');
	  			this.$refs.btnFinish.classList.add('z-depth-2');
	  			this.$refs.chipList.forEach((item) => item.classList.remove('b-chip'));
	  		}
	  		this.indexQuestions++;
	  		this.updateChip(true);
  		}

  		// Comprobar si ya está en la última posición del Test
  	},
  	processTest(){
  		let testId = "";
  		this.test.userId = this.user.uid;
  		this.test.questions = this.questions;
  		this.test.createdAt = new Date().toISOString();
  		this.test.totalScore = this.finalScore;
  		if (this.test.description != 'fromGenerator') {
  			this.test.description = this.test.id;
  		}else{
	  		this.$api.get(`tests/${this.test.id}`).then( res => {
	  			
	  			if (Object.values(res.data).length > 0) {
	  				this.$api2.delete(`tests/${this.test.id}`).then( res => {
			  			console.log("Success Delete")
			  		})
	  			}
	  		})  		
  		}
  		console.log("test-enviado",this.test);
  		  		
  		this.$api.post('tests', this.test).then( res => {
  			testId = res.data;
  			console.log("Test Guardado")
  		}).then(() => {
  			this.questions.forEach( (item, index) =>  {
  				console.log(item.id)
  				this.$api2.put('questions', item).then( res => {
  					console.log("Question Updated")
  				})
  			})
  		}).then(() => {

			this.$router.push({name: 'testresult', params: {testId: testId}})
		})

  	},
  	shuffle(arr){
  		return arr.sort(() => Math.random() - 0.5);
  	}
  },
  computed:{
  	...mapState(['user']),
  },
};
</script>

<style lang="css" scoped>
	.modal.bottom-sheet{
		max-height: 80% !important;
	}
 	.modal-window{
 		max-height: 800%;
 		overflow: auto;
		position: fixed;
		width: 100%;
		background-color: rgba(0,0,0,0.5);
		left: 0;
		top: 0;
		bottom: 0;
	}
	.arrow_left{
		margin-left: -25px;
		cursor: pointer;
	}
	.b{
		border: 1px solid grey;
	}
	.b-chip{
		border: 2.5px solid #4f4e4e;
	}
	.center-align{
		text-align: center !important;
	}
	.chip-nro-question{
		display: inline-block;
		width: 90%;
		border-radius: 10px;
		padding: 0 0 0 15px;
		background-color: #aaa;
		color: white;
		margin: 2.5px 0;
	}
	.chip-selected{
		background-color: #464646;
	}
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
		min-height: 80%;
		height: auto;
	}
	.grey-darken2{
		background-color: #827f7f;
	}
	.selectAnswer:hover{
		background-color: #ececec !important;
		cursor: pointer;
	}
	.pulse-local{
		animation: shadow-pulse 1s infinite;
	}
	@keyframes shadow-pulse
	{
	  0% {
	    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
	  }
	  100% {
	    box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
	  }
	}
</style>
