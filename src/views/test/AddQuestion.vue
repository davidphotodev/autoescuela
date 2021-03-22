<template>
	<div>
		<div class="grey lighten-2 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-95 margintb-20 white b-radius-7-5 padding-25">
				<div class="center-align">
					<div class="text-17">
						<strong>Añadir Pregunta</strong>
					</div>
					<p>Selecciones su asignatura, tema y luego edite y envíe sus preguntas</p>
					<hr class="margintb-25 white-text">
				</div>

				<form @submit.prevent="createQuestions">
					<div class="jc-between d-block-md vertical-center margint-25">
						<div class="w-50 w-100-md">
							<div class="row paddinglr-20 paddingtb-10 grey lighten-4 b-radius-7-5 vertical-center d-block-sm">
								<div class="col s12 m4 center-align-sm">
									<strong>Asignatura</strong>
								</div>
								<div class="col s12 m8 center-align-sm margint-15-sm">
									<select v-model="subject" required class="browser-default selectg" name="" id="">
										<option :value="{id:null}" selected disabled>Selecciona una asignatura</option>
										<option v-for="(item, index) in subjects" :key="index" :value="item">{{ item.name }}</option>
									</select>
								</div>
							</div>
						</div>

					</div>
		            <div class="margint-45 text-17 left-align">
		              <p>
		                <strong>Crear Pregunta</strong>
		              </p>
		            </div>
		            <div class="left-align">
		             
		                <div v-for="(item, index) in questions" :key="index">
		                  <div class="jc-between">
		                    <div class="w-100">
		                      <label for="name">Pregunta</label>
		                      <textarea required v-model="item.name" class="materialize-textarea" cols="30" rows="10"></textarea>
		                    </div>
		                  </div>
		                  <div>
		                    <div class="margint-30 marginb-20">
		                      <strong>Respuestas</strong>
		                    </div>
		                    <div v-for="(answer, indexa) in item.answers" :key="indexa" class="jc-between v-center">
		                      <div class="w-95">
		                        <label for="description">Respuesta</label>
		                        <input required v-model="answer.name" type="text">
		                      </div>
		                      <div @click="rightAnswer(index, indexa)" class="w-5 center-align cursor-pointer">
		                        <i :class="{'b': answer.right}" class="material-icons">done</i>
		                      </div>
		                      
		                    </div>
		                  </div>
		                  <div>
		                    <p>
		                      <strong>Comentario</strong>
		                    </p>
		                    <div class="w-100">
		                      <textarea v-model="explanation" class="materialize-textarea" cols="30" rows="10"></textarea>
		                    </div>
		                  </div>
		                </div>
		            </div>
					<div class="right-align margintb-25">
						<button ype="submit" class="paddinglr-55 btn b-radius-25 red">Enviar</button>
					</div>
		        </form>


			</div>
		</div>
	</div>
</template>


<script>
import { mapState } from 'vuex'
import Vue2Filters from 'vue2-filters'

export default {
  mixins: [Vue2Filters.mixin],
  name: 'AddQuestion',
  created(){
  	this.$store.commit('SET_LAYOUT', 'dashboard-layout');
	this.$store.commit('SET_SHOWPROFILE', false);
	this.$api.get('subjects').then(response => {
		this.subjects = response.data;
	}).catch( error => {
		M.toast({html: 'Datos inválidos'});
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
  data() {
    return {
    	question: {},
    	subjects: [],
    	subject: {id: null},
    	topics: [],
    	topic: {id: null},
    	answers: [],
    	annexed: "",
    	explanation: null,
    	questions: [
        {
          name: null,
          description: "Descripción",
          score: 1,
          topicId: null,
          code: "string",
          explanation: "",
          owner: "1",
          fails: 0,
          success: 0,
          percentRight: 0,
          countAnswered: 0,
          annexed: "https://www.jumotech.com/web/image/res.company/1/logo?unique=7812d50",
          isApproved: false,
          statement: "",
          answers: [
            {
              name: "Respuesta",
              description: "Descripción",
              score: 0,
              right: false,
              selected: false,
              id: "0"
            },
            {
              name: "Respuesta",
              description: "Descripción",
              score: 0,
              right: true,
              selected: false,
              id: "0"
            },
            {
              name: "Respuesta",
              description: "Descripción",
              score: 0,
              right: false,
              selected: false,
              id: "0"
            },
            {
              name: "Respuesta",
              description: "Descripción",
              score: 0,
              right: false,
              selected: false,
              id: "0"
            }
          ]
        }
      ],
    };
  },
  methods: {
  	createQuestions(){
		//return false
		this.questions[0].topicId = "0";
		this.questions[0].subjectId = this.subject.id;
		this.questions[0].explanation = this.explanation;
		this.questions[0].annexed = this.annexed;
		this.$api({
		method: 'post',
			url: 'questions',
			data: this.questions[0]
		}).then( response => {
			M.toast({html: 'Creado Exitosamente'});
			this.restartQuestion();
		}).catch( error => {
			M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
		console.log(error);
		});
    },
    rightAnswer(index, indexa){
      this.questions[index].answers.forEach( item => item.right = false);
      this.questions[index].answers[indexa].right = true;
    },
    restartQuestion(){
      this.explanation = null;
      this.questions = [
        {
          name: null,
          description: "Descripción",
          score: 1,
          topicId: null,
          code: "string",
          explanation: "",
          owner: "1",
          fails: 0,
          success: 0,
          percentRight: 0,
          countAnswered: 0,
          annexed: "https://www.jumotech.com/web/image/res.company/1/logo?unique=7812d50",
          statement: "",
          answers: [
            {
              name: "",
              description: "Descripción",
              score: 0,
              right: false,
              selected: false,
              id: "0"
            },
            {
              name: "",
              description: "Descripción",
              score: 0,
              right: true,
              selected: false,
              id: "0"
            },
            {
              name: "",
              description: "Descripción",
              score: 0,
              right: false,
              selected: false,
              id: "0"
            },
            {
              name: "",
              description: "Descripción",
              score: 0,
              right: false,
              selected: false,
              id: "0"
            }
          ]
        }
      ]
    }
  },
  computed:{
	...mapState(['user']),
  },
};
</script>



<style lang="css" scoped>
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
		min-height: 80%;
		height: auto;
	}
	.txt-answer{
		border: 0;
	}
	.txt-answer::placeholder{
		color: #000;
	}
	textarea::placeholder{
		color: #000;
	}
	textarea{
		padding: 20px;
		height: 100px;
		border: 0;
		background-color: #f5f5f5;
		border-radius: 10px;
	}
</style>

