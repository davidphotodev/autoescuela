<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
      <div class="w-95">
        <div class="white margintb-30 padding-35 b-radius-10 center-align">
          <div class="margint-45 text-17 left-align">
            <p>
              <strong>Lista de Preguntas</strong>
            </p>
          </div>
          <div class="margint-45 text-17 left-align jc-between v-center">
              <div class="w-40">
                  <p class="text-12">Consultar Pregunta</p>
                  <input placeholder="Buscar Pregunta" type="text" v-model="getSearch">
              </div>
              <div class="w-30">
                <select v-model="getSearch" id="" class="browser-default">
                  <option :value="''">Preguntas aprobadas</option>
                  <option :value="false">Preguntas no aprobadas</option>
                </select>
              </div>
          </div>
          <div class="left-align">
              <paginate name="questions" :list="questions" :per="10">
                <div v-for="(item, index) in paginated('questions')" :key="index">
                  <hr>
                  <div class="jc-between all-center">
                    <div class="w-75">
                      <p><strong>ID: </strong><span v-text="item.code"></span></p>
                      <p><strong>Pregunta: </strong><span v-html="item.name"></span></p>
                      <p @click="showAnwser(index)" class="cursor-pointer">Ver respuestas</p>
                    </div>
                    <div class="w-15 center-align cursor-pointer">
                      <p><strong>Puntuación: </strong> {{ item.score }}</p>
                    </div>
                    <div @click="deleteQuestions(item.id)" class="w-10 center-align cursor-pointer">
                      <i class="material-icons">delete</i>
                    </div>
                  </div>
                  <div class="d-none" ref="showAnwser">
                    <div class="margint-30 marginb-20">
                      <strong>Respuestas</strong>
                    </div>
                    <div v-for="(answer, indexa) in item.answers" :key="indexa" class="jc-between all-center">
                      <div class="w-80">
                        <p>{{ answer.name }}</p>
                      </div>
                      <div class="w-10 center-align cursor-pointer">
                        <i :class="{'b padding-10': answer.right}" class="material-icons">done</i>
                      </div>
                    </div>
                  </div>
                </div>
              </paginate>
              <paginate-links for="questions" :classes="{'ul': 'pagination', 'li': 'waves-effect'}" :show-step-links="true"></paginate-links>
          </div>

        </div>
        <br>
      </div>
    </div>
	</div>
</template>

<script>
import VuePaginate from 'vue-paginate'
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
      questions: [],
      questionsApi: [],
      paginate: ['questions']
    };
  },
  methods: {
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
    loadQuestions(){
      this.$api.get('questions').then(response => {
        this.questions = this.filterBy(Object.values(response.data), '', 'name');
        this.questionsApi = Object.values(response.data);
      }).catch( error => {
        M.toast({html: 'Error de Conexión', classes: 'blue-grey lighten-5 black-text'});
      })
    },
    rightAnswer(index, indexa){
      this.questions[index].answers.forEach( item => item.right = false);
      this.questions[index].answers[indexa].right = true;
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
  },
  watch: {
    getSearch(value){
      this.questions = this.filterBy(this.questionsApi, this.getSearch, 'name', 'isApproved','code')
    },
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
