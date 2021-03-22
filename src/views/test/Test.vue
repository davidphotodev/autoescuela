<template>
	<div>
		<component :response="response" :is="componentSelected"></component>
	</div>
</template>

<script>
import CorrectionCompletion from '../../components/test/CorrectionCompletion'
import SimultaneousCorrection from '../../components/test/SimultaneousCorrection'
import OfficialTest from '../../components/test/OfficialTest'
import { mapState } from 'vuex'
import { Glide, GlideSlide } from 'vue-glide-js'
export default {

  name: 'Test',
  components: {
	[Glide.name]: Glide,
	[GlideSlide.name]: GlideSlide,
	CorrectionCompletion,
	SimultaneousCorrection,
	OfficialTest,
  },
  created(){
  	this.$store.commit('SET_LAYOUT', 'dashboard-layout');
	this.$store.commit('SET_SHOWPROFILE', false);
	this.$api.get('tests/'+this.$route.params.id).then(response => {
		console.log(response.data[Object.keys(response.data)[0]])
		this.response = response;
		this.test = response.data[Object.keys(response.data)[0]];
		if (this.test.toCorrect) this.componentSelected = 'CorrectionCompletion';
		if (this.test.simultaneousCorrection && this.test.testType !== 1) this.componentSelected = 'SimultaneousCorrection';
		if (this.test.testType == 1) this.componentSelected = 'OfficialTest';
	}).catch( error => {
		M.toast({html: 'Error', classes: 'blue-grey lighten-5 black-text'});
	})
  },
  
  data() {
    return {
    	test: {},
    	componentSelected: '',
    	response: {}
    };
  },
  methods: {

  },
  computed:{
  	...mapState(['user']),
  },
};
</script>


<style lang="css" scoped>

 .modal-window{
 		max-height: 800%;
 		overflow: auto;
		position: fixed;
		width: 100%;
		background-color: rgba(0,0,0,0.5);
		left: 0;
		top: 0;
		bottom: 0;
	}
	.arrow_left{
		margin-left: -25px;
		cursor: pointer;
	}
	.chip-nro-question{
		display: inline-block;
		width: 90%;
		border-radius: 10px;
		padding: 0 0 0 15px;
		background-color: #aaa;
		color: white;
		margin: 2.5px 0;
	}
	.chip-selected{
		background-color: #464646;
	}
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
		min-height: 80%;
		height: auto;
	}
	.selectAnswer:hover{
		background-color: #ececec !important;
		cursor: pointer;
	}
</style>

