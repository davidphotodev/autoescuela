<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
      <div class="w-95">
        <div class="white margintb-30 padding-35 b-radius-10 center-align">
          <div class="text-17">
            <strong>Gestionar Preguntas</strong>
          </div>
          <div class="margint-45 text-17 left-align">
            <p>
              <strong>Selecciona una Asignatura</strong>
            </p>
          </div>
          <form @submit.prevent="createQuestions">
            <div class="left-align subjects-list">
                <select required v-model="subject" class="browser-default selectg" name="" id="">
                  <option :value="{id:null}" selected disabled>Selecciona una asignatura</option>
                  <option v-for="(item, index) in subjects" :key="index" :value="item">{{ item.name }}</option>
                </select>
            </div>
            <div class="margint-45 text-17 left-align">
              <p>
                <strong>Selecciona el Tema al que pertenecerá la pregunta</strong>
              </p>
            </div>
            <div class="left-align subjects-list">
                <select required v-model="topic" class="browser-default selectg">
                  <option :value="null" selected disabled>Selecciona un tema</option>
                  <option v-for="(item, index) in filterBy(topics, subject.id, 'subjectId')" :key="index" :value="item.$value">{{ item.$value.name }}</option>
                </select>
            </div>

            <div class="margint-45 text-17 left-align">
              <p>
                <strong>Crear Pregunta</strong>
              </p>
            </div>
            <div class="left-align">
             
                <div v-for="(item, index) in questions" :key="index">
                  <div class="jc-between">
                    <div class="w-75">
                      <label for="name">Pregunta</label>
                      <textarea required v-model="item.name" class="materialize-textarea" cols="30" rows="10"></textarea>
                    </div>
                    <div class="w-10">
                      <label for="name">Código</label>
                      <input required v-model="item.code" type="number">
                    </div>
                    <div class="w-10">
                      <label for="name">Valor</label>
                      <input required v-model="item.score" type="number">
                    </div>
                  </div>
                  <div>
                    <div class="margint-30 marginb-20">
                      <strong>Respuestas</strong>
                    </div>
                    <div v-for="(answer, indexa) in item.answers" :key="indexa" class="jc-between all-center">
                      <div class="w-80">
                        <label for="description">Respuesta</label>
                        <input required v-model="answer.name" type="text">
                      </div>
                      <div @click="rightAnswer(index, indexa)" class="w-10 center-align cursor-pointer">
                        <i :class="{'b padding-10': answer.right}" class="material-icons">done</i>
                      </div>
                      <div @click="item.answers.splice(indexa, 1)" class="w-10 center-align cursor-pointer">
                        <i class="material-icons">delete</i>
                      </div>
                    </div>
                    <div>
                      <a @click="addAnswer(index)" href="#!">Agregar Respuesta</a>
                    </div>
                  </div>
                  <div>
                    <p>
                      <strong>Explicación de la Pregunta</strong>
                    </p>
                    <div class="w-80">
                      <label for="description">Explicación</label>
                      <textarea v-model="explanation" class="materialize-textarea" cols="30" rows="10"></textarea>
                    </div>
                  </div>
                  <div>
                    <p>
                      <strong>Anexo</strong>
                    </p>
                    <div class="w-80">
                      <label for="description">Anexo</label>
                      <input type="text" v-model="item.annexed">
                    </div>
                  </div>
                </div>
                <div class="margintb-30">
                  <button type="submit" class="btn red b-radius-25 paddinglr-50">Crear</button>
                </div>
            </div>
          </form>
        </div>
        <br>
      </div>
    </div>
	</div>
</template>

<script>
import Vue2Filters from 'vue2-filters'
export default {
  mixins: [Vue2Filters.mixin],
  name: 'ManageQuestions',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
    this.loadData();
  },
  data() {
    return {
      typeQuestion: true,
      topics: [],
      topic: null,
      subject: {id: null},
      subjects: [],
      explanation: null,
      annexed: "",
      getSearch: null,
      topicFiltered: [],
      questions: [
        {
          name: null,
          description: "Descripción",
          score: 1,
          topicId: null,
          subjectId: null,
          code: "string",
          explanation: "",
          owner: "1",
          fails: 0,
          success: 0,
          percentRight: 0,
          countAnswered: 0,
          isApproved: true,
          statement: "string",          
          annexed: "",
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
      ],
      questionsApi: [],
    };
  },
  methods: {
    createQuestions(){
      console.log(this.questions[0]);
      //return false
      this.questions[0].topicId = this.topic.id;
      this.questions[0].subjectId = this.subject.id;
      this.questions[0].explanation = this.explanation;
      this.questions[0].annexed = this.annexed;
      this.$api({
        method: 'post',
        url: 'questions',
        data: this.questions[0]
      }).then( response => {
        this.loadQuestions()
        this.restartQuestion()
        M.toast({html: 'Creado Exitosamente', classes: 'blue-grey lighten-5 black-text'});
      }).catch( error => {
        M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
        console.log(error);
      });
    },
    showAnwser(index){      
      this.$refs.showAnwser[index].classList.toggle('d-block');
    },
    loadData(){
      this.$api.get('subjects').then(response => {
        this.subjects = response.data;
      }).catch( error => {
        M.toast({html: 'Error de Conexión', classes: 'blue-grey lighten-5 black-text'});
      })
      this.$api.get('topics').then(response => {
        this.topics = response.data
      }).catch( error => {
        M.toast({html: 'Error de Conexión', classes: 'blue-grey lighten-5 black-text'});
      })
      this.loadQuestions();

    },
    loadQuestions(){},
    rightAnswer(index, indexa){
      this.questions[index].answers.forEach( item => item.right = false);
      this.questions[index].answers[indexa].right = true;
    },
    addAnswer(index){
      this.questions[index].answers.push({
        name: null,
        right: false
      })
    },
    deleteQuestions(questionId){
      if (confirm("¿Seguro desea eliminar esta Pregunta?")) {
        this.$api({
          method: 'delete',
          url: 'questions/'+questionId,
        }).then( response => {
          console.log(response.data);
        }).catch( error => {
          console.log(error);
          M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
        }).then(() => this.loadQuestions())
      }
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
          isApproved: true,
          statement: "string",
          annexed: "",
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
  watch: {
    subject(value){
      console.log(value)

    }
  }
};
</script>

<style lang="css" scoped>
  .d-none{
    display: none !important; 
  }
  .d-block{
    display: block !important; 
  }
  .subjects-list{
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid #f1f1f1;
    padding: 8px;
  }
  .subjects-list p{
    cursor: default;
    padding: 5px;
    font-size: 16px;
    margin: 0;
  }
  .subjects-list p:hover{
    background-color: #f1f1f1 !important;
  }
</style>
