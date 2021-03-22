<template>
	<div>
		<h2>hola</h2>
	</div>
</template>

<script>
export default {

  name: 'ManageTest',
  created(){
	this.$store.commit('SET_LAYOUT', 'admin-layout');
	this.$store.commit('SET_SHOWPROFILE', false);

  },
  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
</style>
