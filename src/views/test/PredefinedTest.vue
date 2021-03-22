<template>
	<div>
		<div class="grey lighten-2 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-95 margintb-20 white b-radius-7-5 padding-25">
				<div class="center-align">
					<div class="text-17">
						<strong>Test predefinidos</strong>
					</div>
					<p>Muestra cuantas veces se ha realizado ese test, cuantas veces lo ha aprobado o cuantas lo ha suspendido</p>
					<hr class="margintb-25 white-text">
					<p><strong class="grey-text">Seleccionar Asignatura, tema y tipo de exámen</strong></p>
				</div>
				<div class="jc-between vertical-center margint-25 d-block-sm">
						<div class="w-50 w-100-sm margintb-25-sm">
							<div class="row paddinglr-20 paddingtb-10 grey lighten-4 b-radius-7-5 vertical-center float-l">
								<div class="col m6">
									<strong>Asignatura</strong>
								</div>
								<div class="col m6">
									<select id="subjects" v-model="subjectSelected">
										<option :value="''">Mostrar Todos</option>
										<option v-for="(item, index) in subjects" :value="item.id">{{ item.name }}</option>
									</select>
								</div>
							</div>
						</div>

					<div class="w-50 w-100-sm margintb-25-sm">
						<div class="vertical-center floatr float-none-sm d-block-sm center-align-sm">
							<div class="marginr-15 d-inline-block-sm">
								<p class="reset">
									<strong>Mostrar los no realizados</strong>
								</p>
							</div>
							<div class="input-field d-inline-block-sm">
								<p class="reset-sm">
							      <label>
							        <input v-model="unrealized" type="checkbox" class="filled-in" checked="checked" />
							        <span></span>
							      </label>
							    </p>
							</div>
						</div>
					</div>					
				</div>
				<div>
					<div v-for="(item, index) in filterBy(tests, subjectSelected, 'subjectId')" class="justify-content-between vertical-center b-radius-7-5 grey lighten-4 paddinglr-20 padding-10 margintb-15 d-block-sm center-align-sm">
						<div>
							<strong>ID51351</strong>
						</div>
						<!--
						<div>
							<p>{{item.subjectId}}</p>
						</div>
						<div class="w-15 w-70-sm margin-auto-sm">
							<span class="text-12">33pts</span>
							<meter class="ph_meter" min="0" max="100" high="20" value="50" />
							<p class="reset right-align"><span class="text-12">70pts</span></p>
						</div>
						-->
						<div class="w-10 w-100-sm margin-auto-sm">
							<span class="text-12">{{ item | points }} pts</span>
							<meter class="ph_meter" min="0" :max="item | totalPoints" :value="item | points" />
							<p class="reset right-align">
								<span class="text-12">{{ item | totalPoints }} pts</span>
							</p>
						</div>
						<div class="w-40 w-100-sm center-align-sm right-align">
							<div>
								<button @click="$router.push({name: 'test', params: {id: item.id }})" class="paddinglr-55 btn b-radius-25 red">{{item.points != null ? "Repetir" : "Comenzar"}}</button>
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
  name: 'PredefinedTest',
  created(){
  	this.$store.commit('SET_LAYOUT', 'dashboard-layout');
	this.$store.commit('SET_SHOWPROFILE', false);
	

	this.$api.get('tests').then(response => {
		this.tests = Object.values(response.data);

		if (this.user.isSubscription) {
			this.tests = this.tests.filter( (item) => item.userId == "" && item.testType != 1);
		}else{
			this.tests = this.tests.filter( (item) => item.userId == "" && item.testType != 1 && item.allowedOnlySubscribers == false);
		}

		console.log("Test",this.tests);
	}).then(() => {
		this.$api.get('tests/search/userId/'+this.user.uid).then(res => {
			console.log("Record",Object.values(res.data));
			this.recordTests = Object.values(res.data).filter(item => item.testType != 1);
			this.recordTests.forEach( elem => {
				let result = this.tests.findIndex(item => item.id == elem.description);
				let obj = JSON.parse(JSON.stringify(elem));
				if (result != -1){
					obj.points = elem.questions;
				}else{
					obj.points = null
				}
				this.$set(this.tests, result, obj)
				this.originalTest = JSON.parse(JSON.stringify(this.tests));
			});
		})
	})
	.catch( error => {
		M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
	})

  },
  mounted(){
	  	var elems = document.getElementById('subjects');
	  	this.$api.get('subjects').then(res => {
			this.subjects = Object.values(res.data);
		}).then(() => {			
	    	var instances = M.FormSelect.init(elems);
		})
  },
  data() {
    return {
    	originalTest: [],
    	tests : [],
    	recordTests: [],
    	subjectSelected: '',
    	subjects: [],
    	unrealized: false,
    };
  },
  computed:{
	...mapState(['user']),
  },
  watch: {
  	unrealized(val){
  		if (val) this.tests = this.originalTest.filter(item => item.points == null);
  		if (!val) this.tests = this.originalTest;
  	}
  },
  filters: {
  	totalPoints(item){
  		//console.log(item)
	  	let total = 0;
  		if (item.points != null) {
	  		item.points.forEach((elem,index)  => {
	  			total += elem.score;
	  		});
  		}
  		return total == 0 ? "" : total
  	},
  	points(item){
  		let total = 0;
  		if (item.points != null) {
  			item.points.forEach((elem,index)  => {
	  			let ans = elem.answers.find(elem => elem.selected == true && elem.right == true)
	  			if (ans !== undefined) {
	  				total += elem.score;
	  			}
	  		});
  		}
  		return total == 0 ? 0 : total
  	}
  }
  	
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




