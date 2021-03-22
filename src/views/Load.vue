<template>
	<div class="h-100 w-100 all-center">
		<div class="json center-align all-center b">
			<button class="btn btn-large" @click="deleteTests">Cargar</button>
		</div>
	</div>
</template>
<style>
	.json{
		height: 300px;
		width: 70%;
	}
</style>
<script>
export default {

  name: 'Load',
  created(){
  	this.$store.commit('SET_LAYOUT', 'simple-layout');
  },
  data() {
    return {
    	questionsApi: [],
    	tests: [],
    };
  },
  methods: {
	getQuestions(){
		this.$api.get(`questions`).then(res => {
			console.log(res.data);
		})
	},
	getTest(){
		this.$api.get(`tests/tYMizMqhzBouZ3q8dW5H`).then(res => {
			console.log(res.data);
		})
	},
  	deleteQuestions(){
  		this.$api.get('questions').then(res => {
	        Object.values(res.data).forEach(elem => {
				this.$api.delete(`questions/${elem.id}`).then(res => {
					console.log("Borrado!!", elem.id)
				})
			});
	        
	      }).catch( error => {
	        M.toast({html: 'Error de Conexión', classes: 'blue-grey lighten-5 black-text'});
	      })
  	},
  	deleteTests(){
    	//return false
  		this.$api.get('tests').then( res => {
  			this.tests = Object.values(res.data);
	        this.tests.forEach((element, index) => {
	        	console.log()
	        	this.$api.delete(`tests/${element.id}`).then(res => {
		    		console.log("Borrado!!", res)
		    		M.toast({html: 'Borradoo!!'});
		    	})
		    })
  		})
    	
  	},
  	loadData(){

	    /*
	  		this.$api({
				method: 'delete',
				url: 'tests/ZTJnkMriRF8OSfGQPLS8',
			}).then( response => {
				console.log(response.data);
			}).catch( error => {
				console.log(error);
				M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
			});
	    */
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
