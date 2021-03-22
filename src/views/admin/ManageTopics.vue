<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
      <div class="w-95">
        <div class="white margintb-30 padding-35 b-radius-10 center-align">
          <div class="text-17">
            <strong>Gestionar Temas</strong>
          </div>
          <div class="left-align">
           <form @submit.prevent="createTopic">
              <div class="margint-45 text-17 left-align">
                <p>
                  <strong>Selecciona la Asignatura a la que pertenecerá el Tema</strong>
                </p>
              </div>
              <div class="left-align subjects-list">
                  <select required v-model="subject" class="browser-default selectg" name="" id="">
                    <option value="null" selected disabled>Selecciona una asignatura</option>
                    <option v-for="(item, index) in subjects" :key="index" :value="item">{{ item.name }}</option>
                  </select>
              </div>

              <div class="margint-45 text-17 left-align">
                <p>
                  <strong>Crear Tema</strong>
                </p>
              </div>
              <div>
                <label for="name">Nombre de la Asignatura</label>
                <input required v-model="topic.name" type="text">
              </div>
              <div>
                <button type="submit" class="btn red b-radius-25 paddinglr-50">Crear</button>
              </div>
           </form>
          </div>

          <div class="margint-45 text-17 left-align">
            <p>
              <strong>Lista de temas</strong>
            </p>
          </div>
          <div class="left-align subjects-list">
              <p v-for="(item, index) in topics" :key="index" class="jc-between">
                {{ item.name }}
                <i @click="deleteTopic(item.id)" class="cursor-pointer material-icons grey-text text-darken-2">delete</i>
              </p>            
          </div>
        </div>
        <br>
      </div>
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  name: 'ManageTopics',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
    this.loadData();
  },
  data() {
    return {
      subjects: [],
      subject: null,
      topics: [],
      topic: {
        name: null,
      }
    };
  },
  methods: {
    loadData(){
      this.$api({
        method: 'get',
        url: 'topics',
      }).then( response => {
        this.topics = response.data;
      }).catch( error => {
        M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
        console.log(error);
      });
      this.$api({
        method: 'get',
        url: 'subjects',
      }).then( response => {
        this.subjects = response.data;
      }).catch( error => {
        M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
        console.log(error);
      });
    },
    createTopic(){
      if (this.subject != 'Selecciona una asignatura') {
        console.log(this.subject);
        this.topic.subjectId = this.subject.id;
        this.$api({
          method: 'post',
          url: 'topics',
          data: this.topic
        }).then( response => {
          console.log(response.data);
          this.topic = {
            name: null,
            description: null
          }
          this.subject = null;
          this.loadData();
          M.toast({html: 'Creado Exitosamente', classes: 'blue-grey lighten-5 black-text'});
        }).catch( error => {
          console.log(error);
          M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
        });
      }else{
        M.toast({html: 'Debe seleccionar una asignatura', classes: 'blue-grey lighten-5 black-text'});
      }
      
    },
    deleteTopic(id){
      if (confirm("¿Seguro desea eliminar este Tema?")) {
        var url = toString('topics');
        console.log(id);
        this.$api({
          method: 'delete',
          url: 'topics/'+id,
          params: {
            access_token: String(this.user.stsTokenManager.accessToken)
          },
        }).then( response => {
          this.loadData();
          M.toast({html: 'Borrado Exitosamente', classes: 'blue-grey lighten-5 black-text'});
        }).catch( error => {
          M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
          console.log(error);
        });
      }
    }
  },
  computed:{
    ...mapState(['user']),
  },
};
</script>

<style lang="css" scoped>
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
