<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 padding-35 b-radius-10 center-align">
					<form @submit.prevent="createTest">
						<div class="text-18">
				        	<strong>Exámen Oficial</strong>
				        </div>
				        <div>
							<p>Aquí puedes crear o editar el exámen oficial de la asignatura elegida</p>
						</div>
						<div class="margintb-30 left-align">
							<p class="text-17"><strong>Asignatura: </strong> {{ subject.name }}</p>
						</div>
						<div class="margintb-30 left-align">
							<p class="text-17"><strong>Tipo de Test:</strong> Corregir al finalizar</p>
						</div>
						<div class="col s12 m10 left-align">
							<p class="text-17"><strong>Temas</strong></p>							
								<table>
									<tr>
										<th>Tema</th>
										<th>Cantidad de preguntas</th>
									</tr>
									<tr v-for="(item, index) in topics" :key="index">
										<td>{{item.name}}</td>
										<td>
											<input @change="loadQuestionsForTopic(item, index, $event)" v-model.number="item.cantQuestion" type="text" required>
											<span class="helper-text">{{ item.questionsLength }}</span>
										</td>
									</tr>
								</table>
						</div>
						<div class="col s12 m10 left-align margintb-30">
							<p class="text-17"><strong>Duración</strong> en segundos</p>
							<select required v-model="test.limitTime" class="browser-default selectg" id="">
								<option selected disabled>Selecciona un tema</option>
								<option v-for="item in 60" :value="item*60" :key="60*item">{{ item*60 }}</option>
							</select>
						</div>
						<div class="margingtb-30">
							<button type="submit" class="red btn b-radius-25">Crear Test</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  name: 'OfficialTest',
  props: ['subjectId'],
  created(){
  	console.log(this.subjectId)

  	this.$api.get(`subjects/${this.subjectId}`).then(response => {
		this.subject = Object.values(response.data)[0];
		console.log("As",this.subject)
	}).catch( error => {
		M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
	})

	this.$api.get('topics').then(response => {
		this.topics = Object.values(response.data).filter(elem => {
			elem.questionsLength = "";
			if (elem.subjectId == this.subjectId) {
				elem.cantQuestion = 0;
			}
			return elem.subjectId == this.subjectId
		});
	}).catch( error => {
		M.toast({html: 'Error', classes: 'red white-text'});
	})
  },
  data() {
    return {
    	topics: [],
    	subject: {},
    	cantQuestionTopic: [],
    	test: {
			createdAt: new Date().toISOString(),
			totalScore: 0,
			name: "Test",
			description: "officialTest",
			userId: "",
			questionNum: 10,
			toCorrect: false,
			limitTime: 0,
			numQuestionRightToSuccess: 0,
			questions: [],
			simultaneousCorrection: false,
			allowedOnlySubscribers: true,
			testType: 1,
			subjectId:{},
			code: "string",
		},
		allQuestionsLength: [],
    };
  },
  methods: {
  	createTest(){
  	  let validate = true;
  	  this.topics.forEach( elem => {
  	  	if (elem.questionsLength.length > 0 || elem.cantQuestion == 0) {
  	  		validate = false
  	  	}
  	  });
  	  if (validate) {
		  this.loadQuestions().then(() => {
		  	this.test.subjectId = this.subjectId;
		  	this.test.userId = this.user.uid;
		  	this.test.questionNum = this.test.questions.length;
			console.log(this.test);
			
		  	this.$api.post('tests', this.test).then(res => {
		  		M.toast({html: 'Test Creado con éxito'})
		  		this.$router.push({name: 'managesubjects'});
		  	})
		  })
  	  }else{
  	  	M.toast({html: 'Verifica la cantidad de preguntas por test', classes: 'red white-text'})
  	  }
	},
	loadQuestionsForTopic(item, index, e){
		let result = this.allQuestionsLength.find(elem => elem.topicId == item.id);
		if (result == undefined) {
			this.$api2.get(`/questions/search/topicId/${item.id}`).then(res => {			
				let questionsLength = Object.values(res.data).length
				this.allQuestionsLength.push({
					topicId: item.id,
					length: questionsLength
				})

				if (item.cantQuestion > questionsLength) {
					item.questionsLength = `No hay preguntas suficientes. Total: ${questionsLength}`;
				}else{
					item.questionsLength = ""				
				}
			})
		}else{
			if (item.cantQuestion > result.length) {
				item.questionsLength = `No hay preguntas suficientes. Total: ${result.length}`;
			}else{
				item.questionsLength = "";			
			}
		}
	},
	async loadQuestions(){
		const questions = [];
		await Promise.all(this.topics.map( async elem => {
			await this.$api.get(`questions/search/topicId/${elem.id}`).then(async res => {
				await Object.values(res.data).slice(0, elem.cantQuestion).forEach(item => {
					questions.push(item)
				})
			})
		}))
		this.test.questions = questions;
	}
  },
  computed:{
  	...mapState(['user']),
  },
};
</script>

<style lang="css" scoped>
	.selectg{
		border: 0 !important;
		border-bottom: 1px solid #b3b2b2 !important;
		background-color: transparent !important;
	}
</style>
