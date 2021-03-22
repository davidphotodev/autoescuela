<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 padding-35 b-radius-10">
					<div class="text-17 center-align">
 						<strong>Gestionar Códigos Promocionales</strong>
					</div>
					<div>
						<form @submit.prevent="create">
							<p class="text-18"><strong>Crear Código </strong></p>
							<div class="input-field w-20">
								<p>Tiempo Extra</p>
								<input v-model="extraTime" required type="text">
								<p>Cantidad</p>
								<input v-model="quantity" required type="text">
								<button type="submit" class="margint-25 btn grey darken-4">Crear</button>
							</div>
						</form>
					</div>
					<div class="margint-55">
						<p class="text-18"><strong>Lista de Códigos</strong></p>
						<div class="paddingtb-25">
							<table>
			    				<tr class="text-17">
			    					<th>Estatus</th>
			    					<th>Tiempo Extra</th>
			    					<th>Código</th>
			    					<th class="center-align">Borrar</th>
			    				</tr>
			    				<tr v-for="(item, index) in codes" :key="index">
			    					<td class="text-16">{{item.active ? 'Activo' : 'Inactivo'}}</td>
			    					<td class="text-16">{{item.extraTime}}</td>
			    					<td class="text-16">{{item.value}}</td>
			    					<td class="center-align">
			    						<i @click="deleteCode(item.id)" class="material-icons c-pointer">delete</i>
			    					</td>
			    				</tr>
			    			</table>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'ManageCodes',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
  	this.loadData();
  },
  data() {
    return {
    	modalExplanation: null,
    	codes: [],
    	extraTime: "",
    	quantity: 0,
    };
  },
  methods: {
  	loadData(){
  		this.$api2.get('promotion-codes').then(res => {
  			this.codes = Object.values(res.data);
  		})
  	},
  	create(){
  		this.$api.post('promotion-codes', {
  			extraTime:this.extraTime,
  			quantity: this.quantity,
  		}).then(res => {
  			M.toast({html: 'Código Creado'});
  			this.loadData();
  		})
  	},
  	deleteCode(id){
  		this.$api.delete(`promotion-codes/${id}`).then(res => {
  			this.$api2.get('promotion-codes').then(res => {
	  			this.codes = Object.values(res.data);
	  		})
  			M.toast({html: 'Código Eliminado'});
  		})
  	}
  }
};
</script>

<style lang="css" scoped>
</style>
