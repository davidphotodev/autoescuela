<template>
  	<component :is="layout">
  		<loading :show="show" :label="'Cargando...'"></loading>
  	</component>
</template>

<script>
  import DashboardLayout from './components/layouts/DashboardLayout.vue'
  import AdminLayout from './components/layouts/AdminLayout.vue'
  import SimpleLayout from './components/layouts/SimpleLayout.vue'
  import loading from 'vue-full-loading'
  import { mapState } from 'vuex'

  export default {
    components: { SimpleLayout, DashboardLayout, AdminLayout, loading },
    computed: mapState(['layout', 'show']),
  };

</script>
