<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
      <div class="w-95">
        <div class="white margintb-30 padding-35 b-radius-10 center-align">
          <div class="text-17">
            <strong>Gestionar Asignaturas</strong>
          </div>
          <div class="left-align">
           <form @submit.prevent="createSubject">
              <div class="margint-45 text-17 left-align">
                <p>
                  <strong>Selecciona el Curso al que pertecene la Asignatura</strong>
                </p>
              </div>
              <div class="left-align subjects-list">
                  <select required v-model="course" class="browser-default selectg">
                    <option :value="null" selected disabled>Seleccione un Curso</option>
                    <option v-for="(item, index) in courses" :key="index" :value="item">{{ item.name }}</option>
                  </select>
              </div>

              <div class="margint-45 text-17 left-align">
                <p>
                  <strong>Crear Asignatura</strong>
                </p>
              </div>
              <div>
                <label for="name">Nombre de la Asignatura</label>
                <input required v-model="subject.name" type="text">
              </div>
              <div>
                <button type="submit" class="btn red b-radius-25 paddinglr-50">Crear</button>
              </div>
           </form>
          </div>


          <div class="margint-45 text-17 left-align">
            <p>
              <strong>Lista de Asignaturas</strong>
            </p>
          </div>
          <div class="left-align subjects-list">
              <p v-for="(item, index) in subjects" :key="index" class="jc-between">
                {{ item.name }}
                <span class="blue-text c-pointer" @click="goToOfficialTest(item.id)">Exámen Oficial</span>
                <i @click="deleteSubject(item.id)" class="cursor-pointer material-icons grey-text text-darken-2">delete</i>
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

  name: 'ManageSubjects',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
    this.loadData();
  },
  data() {
    return {
      courses: [],
      course: null,
      subjects: [],
      subject: {
        name: null,
      }
    };
  },
  methods: {
    goToOfficialTest(id){
      console.log(id)
      this.$api.get(`tests/search/description/officialTest`).then(res => {
        let result = Object.values(res.data).find(elem => elem.subjectId == id);
        console.log(typeof result)
        //return false
        if (typeof result != 'undefined') {
          if (confirm("Ya existe un exámen oficial ¿Desea eliminarlo?")) {
            this.$api.delete(`tests/${result.id}`).then(res => {
              M.toast({html: 'Test Oficial Eliminado'});
            })
          }
        }else{
          this.$router.push({name: 'officialtest', params: {'subjectId': id}})
        }
      })
    },
    loadData(){
        this.$api({
        method: 'get',
        url: 'subjects',
      }).then( response => {
        this.subjects = response.data;
      });
      this.$api({
        method: 'get',
        url: 'courses',
      }).then( response => {
        this.courses = response.data;
      });
    },
    createSubject(){
      console.log(this.subject);
      this.subject.courseId = this.course.id;
      this.$api({
        method: 'post',
        url: 'subjects',
        data: this.subject
      }).then( response => {
        console.log(response.data);
        this.subject = {
          name: null,
          description: null
        }
        this.loadData();
        M.toast({html: 'Creado Exitosamente'});

      }).catch( error => {
        console.log(error);
        M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
      });
    },
    deleteSubject(id){
      if (confirm("¿Seguro desea eliminar esta Asignatura?")) {
        this.$api({
          method: 'delete',
          url: 'subjects/'+id,
          withCredentials: true,
          params: {
            access_token: this.user.stsTokenManager.accessToken
          }
        }).then( response => {
          this.loadData();
          M.toast({html: 'Borrado Exitosamente', classes: 'blue-grey lighten-5 black-text'});
        }).catch( error => {
          M.toast({html: 'Hubo un Error', classes: 'blue-grey lighten-5 black-text'});
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
