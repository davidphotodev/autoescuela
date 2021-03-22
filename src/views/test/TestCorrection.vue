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
						<p>
							<strong>Tipo de Test: </strong>
							{{ test.simultaneousCorrection  ? "Corrección Simultánea" : "Corregir al finalizar"}}
						</p>
						<p v-show="textScore" class="text-20"><strong>Puntuación Final: </strong> {{ finalScore }}</p>
					</div>
					<div class="w-40 w-100-md all-center d-block-md margint-35-md">
						<div class="w-50 w-85-sm">
							<p>
								<button @click="$router.push({name: 'record'})" ref="btnFinish" class="w-100 btn b-radius-25 grey darken-3">Finalizar Corrección</button>
							</p>
							<div>
								<span class="text-13">{{ points(test) }}%</span>
								<meter class="ph_meter" min="0" max="100" :value="points(test)" />
								<p class="reset right-align">
									<span class="text-13">100% </span>
								</p>
							</div>
						</div>
					</div>
				</div>
				<hr class="margintb-25 white-text">
				
				<div>
					<p><strong>Respuestas</strong></p>
					<div class="d-flex">
						<div class="w-30 paddingr-60 padding-5-md d-none-sm">
							<div class="w-90 grey lighten-4 h-100 d-flex b-radius-10">
								<div class="w-50 borderr-1 padding-10 padding-5-md">
									<span v-for="(item, index) in questions" :key="index" @click="fillQuestion(index)" ref="chipList" class="chip-nro-question cursor-pointer" :class="[typeSelectionChip(item.answers)]">
										{{ index+1 }} | 
										{{ item.answers | letterSelected }}
									</span>
								</div>
								<!-- 
								<div class="w-50 padding-10 padding-5-md">
									<span v-for="index in questions.length" @click="fillQuestion(index-1)" v-if="(index % 2 == 0)" ref="chipList" class="chip-nro-question cursor-pointer">{{ index }} | </span>
								</div>
								-->
							</div>
						</div>
						<div class="w-70 w-100-sm">
							<template>
								<div class="d-flex jc-between">
									<p>
										<strong v-html="question.name"></strong>
									</p>
									<p>
										<i @click="addFlag" :class="[question.flag ? 'red' : 'grey']" class="material-icons padding-5 darken-4 white-text b-radius-total c-pointer">flag</i>
									</p>
								</div>
								<div>
									<div v-for="(item, index) in question.answers" :class="[ typeSelection(item), (item.right && item.selected) ? 'border-green grey lighten-4' : 'grey lighten-4' ]" ref="answerSelection" class="selectAnswer paddingtb-15 paddinglr-25 b-radius-25 margintb-15 ">
										<div class="p jc-between v-center">
											<strong class="d-inline-block text-25 marginr-10 w-5">{{letters[index]}}</strong>
											<p class="jc-between d-inline-block w-95">
												<span class="text-16" v-html="item.name"></span>
												<i v-if="item.right == true && item.selected == true" class="
												material-icons">check</i>

												<i v-if="item.right == true && item.selected == false" class="
												material-icons">check</i>

												<i v-if="item.right == false && item.selected" class="material-icons">close</i>
											</p>
										</div>
									</div>
								</div>
							</template>
							<div class="d-flex d-block-sm paddingl-10 margint-30">
								<div  class="w-50 w-100-sm center-align-sm">
									<strong v-if="question.annexed != ''" class="btn grey darken-4">
										<a target="_blank" class="white-text" :href="question.annexed">Ver Anexo</a>
									</strong>

									<button @click="modalExplanation.open()" class="btn grey darken-4 marginl-10 pulse-local">Explicación</button>
								</div>
								<div class="w-50 w-100-sm jc-end margint-20-sm">
									<div class="w-100 w-80-lg w-100-md right-align all-center-sm">
										<button @click="nextQuestion" class="w-50 btn b-radius-25 grey darken-4">
											Siguiente
										</button>
									</div>
								</div>
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
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { Glide, GlideSlide } from 'vue-glide-js'
export default {

  name: 'TestCorrection',
  props: ['testId'],
  components: {
	[Glide.name]: Glide,
	[GlideSlide.name]: GlideSlide
  },
  created(){
  	this.$api.get(`tests/${this.testId}`).then(res => {
  		this.test = Object.values(res.data)[0];
  		this.questions = Object.values(res.data)[0].questions.slice();
		this.question = this.questions[0];
		this.question.answers = this.shuffle(this.question.answers);		
		this.flagStatus();
		
  	}).then(() => {
  		this.updateChip(false);
  	})
  },
  mounted(){
		var tagModal = document.getElementById('modalExplanation');
		var configModal = M.Modal.init(tagModal);
		this.modalExplanation = M.Modal.getInstance(tagModal);	
  },
  data() {
    return {
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
    	test: {
    		questions: []
    	},
    }
  },
  methods: {
  	addFlag(){

  		let result = this.user.userData.flags.findIndex(elem => elem == this.question.id);
  		let userData = JSON.parse(JSON.stringify(this.user.userData));

  		console.log(result)
  		if (result != -1) {
			this.user.userData.flags.splice(result, 1);
			this.$api2.put('user-data', this.user.userData).then(res => {
				this.$store.commit('SET_USER', this.user);
  				M.toast({html: 'Pregunta removida'});
  				this.flagStatus();
	  		})

	  		console.log(this.question)
  		}else{
  			userData.flags.push(this.question.id);
  			userData.sendQuestions.statement = "";
  			userData.sendQuestions.isApproved = true;
  			this.$api2.put('user-data', userData).then(res => {
  				this.user.userData.flags.push(this.question.id);
  				this.$store.commit('SET_USER', this.user);
	  			M.toast({html: 'Pregunta añadida'});
	  			this.flagStatus();
	  		})
	  		console.log(this.question)	  		
  		}
  		
  	},
  	flagStatus(){
  		
  		let questionCopy = this.questions.slice();
  		questionCopy.forEach( elem => {
	  		let result = this.user.userData.flags.find(item => item == elem.id);
	  		if (typeof result == "string") {
	  			elem.flag = true
	  		}else{
	  			elem.flag = false
	  		}
	  	});

	  	this.questions = questionCopy;
  	},
  	typeSelectionChip(answers){
  		let index = 0;
  		let result = answers.findIndex(elem => elem.right && elem.selected);

  		if (result != -1) {
  			return 'green lighten-1'
  		}else{
  			let result2 = answers.find(elem => elem.selected);

  			if (typeof result2 != 'undefined') {
  				return 'red lighten-1'	
  			}else{
  				return 'grey lighten-1'
  			}
  			
  		}
  	},
  	typeSelection(item){
  		if (item.selected && item.right) {
  			return 'border-green'
  		}else if(item.selected && item.right == false){
  			return 'border-red'
  		}else{
  			return 'grey lighten-4'
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
  		
  		this.question = this.questions[index];
  		this.indexQuestions = index;
  		this.updateChip(false);
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
  		if (this.questions[this.indexQuestions+1] !== undefined) {
			this.question = this.questions[this.indexQuestions+1];
			this.question.answers = this.shuffle(this.question.answers);
			this.indexQuestions++;
			this.updateChip(false);
	  	}
  		return false
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
  		this.test.userId = this.user.uid;
  		this.test.questions = this.questions;
  		this.test.createdAt = new Date().toISOString();
  		this.test.totalScore = this.finalScore;
  		if (this.test.description != 'fromGenerator') {
  			this.test.description = this.test.id;
  		}else{
	  		this.$api.get(`tests/${this.test.id}`).then( res => {
	  			
	  			if (Object.values(res.data).length > 0) {
	  				this.$api.delete(`tests/${this.test.id}`).then( res => {
			  			console.log("Success Delete")
			  		})
	  			}
	  		})  		
  		}
  		console.log("test-enviado",this.test);
  		  		
  		this.$api.post('tests', this.test).then( res => {
  			console.log("Test Guardado")
  			this.questions.forEach( (item, index) =>  {
  				console.log(item.id)
  				this.$api.put('questions', item).then( res => {
  					console.log("Question Updated")
  				}).then(() => {
	  				this.$router.push({name: 'testresult', params: {testId: res.data}})
	  			})
  			})
  		})

  	},
  	shuffle(arr){
  		return arr;
  	},
  	points(item){
  		if (typeof item.question != 'undefined') {
  		}
	  		//console.log("iteeem", item)
	  		let total = 0;
	  		let fullTotal = 0;
		  		item.questions.forEach((elem,index)  => {
		  			total += elem.score;
		  		});
	  		return ((item.totalScore * 100) / total).toFixed(0)
  	},
  },
  computed:{
  	...mapState(['user']),
  },
  filters:{
  	letterSelected(item){
  		let letters = ['A', 'B', 'C', 'D', 'E'];
  		let index = item.findIndex(elem => elem.selected == true);
  		return typeof letters[index] != 'undefined' ? letters[index] : " N/S"
  	},
  	totalPoints(item){
  		//console.log(item)
  		let total = 0;
  		item.questions.forEach((elem,index)  => {
  			total += elem.score;
  		});
  		return total
  	},
  	
  	approved(item){
  		let total = 0;
  		let fullTotal = 0;
  		item.questions.forEach((elem,index)  => {
  			fullTotal++;
  			let ans = elem.answers.find(elem => elem.selected == true && elem.right == true)
  				total += elem.score;
  			//if (ans !== undefined) {}
  		});
  		return (((item.totalScore * 100) / total).toFixed(0)) > 74 ? 'Aprobado' : 'Suspendido'
  	}
  },
};
</script>

<style lang="css" scoped>
	.border-green{
		border: 5px solid #4CAF50 !important;
	}
	.border-red{
		border: 5px solid #f44336 !important;
	}
	.b{
		border: 5px solid grey !important;
	}
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

	.ph_meter {
	    background: lightgrey;
	    width: 100%;
	}
	.ph_meter:-moz-meter-optimum::-moz-meter-bar {
	    background:#F44336;
	}
	.ph_meter:-moz-meter-sub-optimum::-moz-meter-bar {
	    background: antiquewhite;
	}
	.ph_meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
	    background: steelblue;
	}

</style>
