<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
      		<div class="w-95">
        		<div class="white margintb-30 padding-35 b-radius-10 center-align">
					<template>
						<div>
							<p>
								<strong v-html="question.name"></strong>
							</p>
						</div>
						<div>
							<div v-for="(item, index) in question.answers" @click="answerSelection(index)" ref="answerSelection" class="selectAnswer paddingtb-15 paddinglr-25 b-radius-25 margintb-15 grey lighten-4">
								<p class="p vertical-center">
									<strong class="text-25 marginr-10">{{letters[index]}}</strong>
									<span class="text-16" v-html="item.name"></span>
								</p>
							</div>
						</div>
					</template>
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>
export default {

  name: 'QuestionClients',
  props: ['userId'],
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
  	let user = {uid: 123456};

  	this.$api.get(`user-data/${this.userId}`).then(res => {
  		console.log("Dataa",res.data)
  	})
  },
  data() {
    return {
    	question: {},
    };
  },
};
</script>

<style lang="css" scoped>
</style>
