<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
      <div class="w-95">
        <div class="white margintb-30 padding-35 b-radius-10 center-align">
          <div class="text-17">
            <strong>Gestionar Cursos</strong>
          </div>

          <div class="margint-45 text-17 left-align">
            <p>
              <strong>Crear Asignatura</strong>
            </p>
          </div>
          <div class="left-align">
           <form @submit.prevent="createCourse">
              <div>
                <label for="name">Nombre de la Asignatura</label>
                <input required v-model="course.name" type="text">
              </div>
              <div>
                <button type="submit" class="btn red b-radius-25 paddinglr-50">Crear</button>
              </div>
           </form>
          </div>

          <div class="margint-45 text-17 left-align">
            <p>
              <strong>Lista de Cursos</strong>
            </p>
          </div>
          <div class="left-align subjects-list">
              <p v-for="(item, index) in courses" :key="index" class="jc-between">
                {{ item.name }}
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
export default {

  name: 'ManageCourses',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
    this.loadData();
  },
  data() {
    return {
      courses: [],
      course: {
        name: null,
        description: null
      }
    };
  },
  methods: {
    loadData(){
        this.$api({
        method: 'get',
        url: 'courses',
        data: this.userLogin
      }).then( response => {
        this.courses = response.data;
      }).catch( error => {
        M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
        console.log(error);
      });
    },
    createCourse(){
      this.course.school = {id:0};
      console.log(this.course)
      this.$api({
        method: 'post',
        url: 'courses',
        data: this.course
      }).then( response => {
        console.log(response.data);
        this.course = {
          name: null,
          description: null
        }
        this.loadData();
        M.toast({html: 'Creado Exitosamente', classes: 'blue-grey lighten-5 black-text'});

      }).catch( error => {
        console.log(error);
        M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
      });
    },
    deleteSubject(id){
      if (confirm("¿Seguro desea eliminar esta Asignatura?")) {
        this.$api({
          method: 'delete',
          url: 'courses/'+id,
        }).then( response => {
          this.loadData();
          M.toast({html: 'Borrado Exitosamente', classes: 'blue-grey lighten-5 black-text'});
        }).catch( error => {
          M.toast({html: 'Hubo un Error', classes: 'blue-grey lighten-5 black-text'});
          console.log(error);
        });
      }
    }
  }
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
