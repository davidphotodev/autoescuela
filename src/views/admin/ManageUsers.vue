<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 padding-35 b-radius-10">
					<div class="text-17 center-align">
 						<strong>Gestionar Usuarios</strong>
					</div>
					<div>
						<p class="text-18">Lista de Usuarios</p>
						<div class="paddingtb-25">
							<table>
								<tr>
									<th>Nombre</th>
									<th>Correo</th>
									<th>Suscripción</th>
									<th class="center-align">Ampliar Susc.</th>
									<th>Eliminar</th>
								</tr>
								<tr v-for="(user, index) in usersComplete" :key="index">
									<td>{{ user.user.displayName }}</td>
									<td>{{ user.user.email }}</td>
									<td class="vertical-center">
										<span>{{ (user.suscription == "" || user.suscription == undefined  ) ? 'Sin suscripción' : 'Suscrito'}}</span>

									</td>
									<td class="center-align">
										<span @click="enlargeSubscription(user.user)" class="blue-text c-pointer">Ampliar</span>
									</td>
									<td>
										<i @click="deleteUser(user.user.uid)" class="material-icons cursor-pointer marginl-10">delete</i>
									</td>
								</tr>
							</table>
						</div>
					</div>

				 </div>
				</div>
			</div>
			<div id="modalExplanation" class="modal">
			    <div class="modal-content">
				    <div class="center-align">
				      	<div>
				      		<p class="w-75 d-inline-block">
					      		<span class="text-20"><strong>Aplicar Suscripción</strong></span>
					      	</p>
				      	</div>
				    </div>
			    	<div class="left-align paddinglr-30">
			    		<p class="text-17 center-align">Seleccione la sucripción que desea añadir</p>
			    		<div class="margint-30">

			    			<table>
			    				<tr class="text-17">
			    					<th>Cantidad de días</th>
			    					<th class="center-align">Seleccionar</th>
			    				</tr>
			    				<tr v-for="(item, index) in subscriptions" :key="index">
			    					<td class="text-16">{{item.timeDuration}}</td>
			    					<td class="center-align">
			    						<button @click="applySus(item.id)" class="btn grey darken-4 btn-small">Seleccionar</button>
			    					</td>
			    				</tr>
			    			</table>
			    		</div>
			    	</div>
			    </div>
			    <div class="modal-footer center-align all-center">
			      <a href="#!" class="modal-close waves-effect waves-green btn-flat black white-text w-80 center-align">Entendido</a>
			    </div>
			</div>
	</div>
</template>

<script>
export default {

  name: 'ManageUsers',
  created(){
  	this.$store.commit('SET_LAYOUT', 'admin-layout');
  	this.$store.commit('SET_SHOWPROFILE', false);
  	this.loadData();
  },
  mounted(){
  	var tagModal = document.getElementById('modalExplanation');
	var configModal = M.Modal.init(tagModal)
	this.modalExplanation = M.Modal.getInstance(tagModal);
  },
  data() {
    return {
    	modalExplanation: null,
    	users: [],
    	userData: [],
    	usersComplete: [],
    	subscriptions: [],
    	userSelected: {},
    };
  },
  methods: {
  	loadData(){
  		let arr = [];
  		this.usersComplete = [];
  		this.$api.get('users').then( res => {
	  		this.users = res.data.users;
	  		console.log(this.users)
	  	}).then(() => {
		  	this.$api.get('user-data').then( res => {
		  		let pos = Object.keys(res.data);
		  		pos.forEach( function(element) {
		  			arr.push(res.data[element])
		  		});
		  		console.log("aaraa",arr)
		  		this.userData = arr;

		  		this.users.forEach( (element) => {
		  			let sus = this.userData.find(item => item.userId == element.uid);
		  			let arr = [];
		  			console.log("Tipo",typeof sus != 'undefined' ? sus.subscriptionId : arr)
			  		this.usersComplete.push({
			  			user: element,
			  			suscription: typeof sus == 'object' ? sus.subscriptionId : arr,
			  		})
			  	});
			  	console.log("Completos",this.usersComplete)
		  	})
	  	})

	  	this.$api.get('subscriptions').then(res => {
	  		this.subscriptions = Object.values(res.data);
	  	})
  	},
  	deleteUser(userId){
  		console.log(userId);
  		if (confirm("¿Desea eliminar a este usuario?")) {
  			this.$api.delete(`users/${userId}`).then(res => {
	    		M.toast({html: 'Usuario eliminado'});
	    		this.loadData();
	    	}).catch(() => {
	    		M.toast({html: 'Ha ocurrido un error', classes: 'red white-text'});
	    	})
  		}
  	},
  	applySus(susId){
  		console.log(susId);
  		//console.log(this.userSelected)
  		this.$api.get(`/user-data/search/userId/${this.userSelected.uid}`).then(res => {
  			let result = Object.values(res.data)[0];
  			result.subscriptionId = susId;
  			console.log(result)
  			
  			//result.sendQuestions.statement = "string";
  			//result.sendQuestions.isApproved = false;
  			this.$api.put(`user-data`, result).then(res => {
  				M.toast({html: 'Suscripción Actualizada'});
  				this.modalExplanation.close();
  				this.loadData();
  			})
  		})
  	},
  	enlargeSubscription(user){
  		this.userSelected = user;
  		this.modalExplanation.open();
  	},
  }
};
</script>

<style lang="css" scoped>
</style>
