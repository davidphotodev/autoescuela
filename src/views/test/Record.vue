<template>
	<div>
		<div class="grey lighten-2 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-95 margintb-20 white b-radius-7-5 padding-25">
				<div class="center-align">
					<div class="text-17">
						<strong>Historial</strong>
					</div>
					<p>Aquí solo se mostrarán los test realizados por el 'Generador de Test' (Aleatorio)</p>
					<hr class="margintb-25 white-text">
					<p><strong class="grey-text">Seleccionar Asignatura, tema y tipo de exámen</strong></p>
				</div>
			
				<div>
					<div v-for="(item, index) in orderBy(tests, 'createdAt._seconds', -1)" class="justify-content-between vertical-center b-radius-7-5 grey lighten-4 paddinglr-20 padding-10 margintb-15 d-block-sm center-align-sm">
						<div>
							<strong>{{item.id}}</strong>
						</div>
						<div>
							<p>{{ item.createdAt._seconds | dateTime }}</p>
						</div>
						<div>
							<p :class="classApproved(item)">{{ item | approved }}</p>
						</div>
						<div class="w-10 w-100-sm margin-auto-sm">
							<span class="text-13">{{ item | points }}%</span>
							<meter class="ph_meter" min="0" max="100" :value="item | points" />
							<p class="reset right-align">
								<span class="text-13">100% </span>
							</p>
						</div>
						<div>
							<div>
								<button @click="$router.push({name: 'test', params: {id: item.id }})" class="paddinglr-50 btn b-radius-25 red w-75-sm">Repetir</button>
							</div>
						</div>
						<div class="margintb-20-sm">
							<div>
								<button @click="testResume(item)" class="paddinglr-55 btn b-radius-25 red w-75-sm">Ver</button>
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
import Vue2Filters from 'vue2-filters'
export default {
  mixins: [Vue2Filters.mixin],
  name: 'Record',
  created(){
  	this.$store.commit('SET_LAYOUT', 'dashboard-layout');
	this.$store.commit('SET_SHOWPROFILE', false);
	this.$api.get('tests/search/userId/'+this.user.uid).then(res => {
		this.tests = Object.values(res.data).filter(item => item.testType != 1 && item.description == 'fromGenerator');
		console.log(this.tests)
	})
  },
  mounted(){
  		var elems = document.querySelectorAll('select');
    	var instances = M.FormSelect.init(elems);
  },
  data() {
    return {
    	tests: [],
    	subjects: [],
    	subjectSelected: {},
    }
  },
  methods: {
  	testResume(item){
  		this.$router.push({name: 'testcorrection', params: {testId: item.id}})
  		//if (item.toCorrect) 
  		//if (item.simultaneousCorrection) this.$router.push({name: 'testresult', params: {testId: item.id}})
  		console.log(item)
  	},
  	classApproved(item){
  		let total = 0;
  		let fullTotal = 0;
  		item.questions.forEach((elem,index)  => {
  			fullTotal++;
  			let ans = elem.answers.find(elem => elem.selected == true && elem.right == true)
  				total += elem.score;
  		});

  		console.log("Porcentaje",total)
  		return (((item.totalScore * 100) / total).toFixed(0)) > 74 ? 'approved' : 'reprobate'
  	},
  },
  computed:{
  	...mapState(['user']),
  },
  filters: {
  	dateTime(value){
  		let dateObj = new Date(value * 1000);
  		let month = dateObj.getMonth()+1;
	    let day = String(dateObj.getDate()).padStart(2, '0');
	    let year = dateObj.getFullYear();
	    let hour = dateObj.getHours().toString().length == 1 ? "0"+dateObj.getHours() : dateObj.getHours()
	    let minutes = dateObj.getMinutes().toString().length == 1 ? "0"+dateObj.getMinutes() :dateObj.getMinutes()
  		return day + '-' + month + '-' + year + ' : ' + hour + ':' + minutes
  	},
  	totalPoints(item){
  		//console.log(item)
  		let total = 0;
  		item.questions.forEach((elem,index)  => {
  			total += elem.score;
  		});
  		return total
  	},
  	points(item){
  		//console.log("iteeem", item)
  		let total = 0;
  		let fullTotal = 0;
  		item.questions.forEach((elem,index)  => {
  			total += elem.score;
  		});
  		return ((item.totalScore * 100) / total).toFixed(0)
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
  }
};
</script>

<style lang="css" scoped>
	.approved{
		background-color: #3ab33a;
		padding: 4px;
		border-radius: 5px;
		color: white;
	}
	.reprobate{
		background-color: #ce3434;;
		padding: 4px;
		border-radius: 5px;
		color: white;
	}
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
		min-height: 80%;
		height: auto;
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