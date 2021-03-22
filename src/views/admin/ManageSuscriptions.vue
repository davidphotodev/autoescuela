<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 padding-35 b-radius-10">
					<div class="text-17 center-align">
 						<strong>Gestionar Suscripciones</strong>
					</div>
					<div class="margintb-30">
						<p class="text-18">Crear una Suscripción</p>
						<div>
							<label>Precio</label>
							<input v-model="suscription.price" type="text" placeholder="Precio">
						</div>
						<div>
							<label>Tiempo de duaración Desde</label>
							<input v-model="suscription.timeDuration" type="text" placeholder="Precio">
						</div>
						<div class="margintb-15">
							<button @click="createSuscription" class="btn red b-radius-10">Crear</button>
						</div>
					</div>
					<div>
						<p class="text-18">Lista de Suscripciones</p>
						<table>
							<tr>
								<th>Activo</th>
								<th>Precio</th>
								<th>Duración</th>
								<th>Eliminar</th>
							</tr>
							<tr v-for="(sus, index) in suscriptions" :key="index">
								<td>{{ sus.active ? 'Activo' : 'Inactivo' }}</td>
								<td>{{ sus.price }}</td>
								<td>{{ sus.timeDuration }}</td>
								<td>
									<i @click="deleteSus(sus.id)" class="material-icons cursor-pointer">delete</i>
								</td>
							</tr>
						</table>
					</div>

				 </div>
				</div>
			</div>
	</div>
</template>

<script>
export default {

  name: 'ManageSuscriptions',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
  	this.loadData();
  },
  data() {
    return {
    	suscriptions: [],
    	suscription: {
    		  dateActiveFrom: "2020-10-10",
    		  dateActiveUntil: "2020-12-10",
    		  active: true,
			  price: 0,
			  timeDuration: 0,
    	},
    };
  },
  methods: {
  	createSuscription(){
	  	this.$api.post('subscriptions', this.suscription).then( res => {
	  		this.suscriptions = res.data;
	  		console.log(res.data);
	  		M.toast({html: 'Se ha creado la suscripción', classes: 'green white-text'});
	  		this.loadData();
	  		this.suscription = {
	    		  active: true,
				  price: 0,
				  timeDuration: 0,
	    	}
	  	})
	  },
	  loadData(){
	  	this.$api.get('subscriptions').then( res => {
	  		this.suscriptions = res.data;
	  		console.log(res.data);
	  	})
	  },
	  deleteSus(sus){
		if (confirm("¿Desea eliminar a este usuario?")) {
				this.$api.delete('subscriptions/'+sus).then(res => {
	    		M.toast({html: 'Suscripción Eliminada', classes: 'green white-text'});
	    		this.loadData();
	    	}).catch(() => {
	    		M.toast({html: 'Ha ocurrido un error', classes: 'green white-text'});
	    	})
			}
		}
  }
};
</script>

<style lang="css" scoped>
</style>
