<template>
	<div class="h-100">
		<slot></slot>
		<router-view></router-view>
	</div>
</template>

<script>
export default {

  name: 'simple-layout',

  data() {
    return {

    };
  },
};
</script>

<style lang="css" scoped>
</style>
