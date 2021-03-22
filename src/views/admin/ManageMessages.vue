<template>
	<div>
		<div class="grey lighten-2 p-absolute w-100 b-radius-5 content-box all-center">
			<div class="w-95">
				<div class="white margintb-30 paddingt-35 b-radius-10">
					<div class="text-17 center-align">
 						<strong>Enviar Notificación</strong>
					</div>
					<div class="message-container margint-40 w-100 z-depth-2 jc-between">
						<div class="w-30 h-100 side-left list-users" id="side-left">
							<div v-for="(item, index) in users" :key="index" @click="loadMessage(item)" class=" paddingtb-20 cursor-pointer user-list padding-20">
								<p>{{item.displayName }}</p>
							</div>
						</div>
						<div class="w-70 h-100" :class="{opacity: !showMessages}" id="container-messages">
							<div class="padding-10 vertical-align grey lighten-4" id="header-message" style="border-bottom: 2px solid #999">
								<p class="text-25">{{ userSelected.displayName }}</p>
							</div>
							<div class="side-right" id="body-message" style="border-left: 2px solid #999" >
								<div v-for="(msg, index) in messages" class="message">
									<p v-html="msg.body"></p>
								</div>
							</div>
							<div class="jc-between padding-10 grey lighten-4" id="footer-message" style="border-top: 2px solid #999">
								<div class="w-80">
									<textarea v-model="txtMessage" placeholder="Escriba su mensaje" class="materialize-textarea"></textarea>
								</div>
								<div class="w-20 center-align">
									<button @click="sendMessage" class="btn black white-text margin-10 w-70">
										<i class="material-icons">send</i>
									</button>
								</div>
							</div>
						</div>
					</div>						
				 </div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as firebase from "firebase/app";
	import { mapState } from 'vuex'
	export default {

	  name: 'ManageUsers',
	  created(){
	  	this.$store.commit('SET_LAYOUT', 'admin-layout');
	  	this.$store.commit('SET_SHOWPROFILE', false);
	  	this.updateMessage();
	  	this.loadData();

	  },
	  data() {
	    return {
	    	ref: firebase.firestore().collection('messages'),
	    	users: [],
	    	userData: [],
	    	usersComplete: [],
	    	userSelected: {},
	    	txtMessage: '',
	    	messages: [],
	    	showMessages: false
	    };
	  },
	  methods: {
	  	setHeights(){
			let header = document.getElementById('header-message');
			let body = document.getElementById('body-message');
			let footer = document.getElementById('footer-message');
			let container = document.getElementById('side-left');
			console.log("Container",container.clientHeight);
			let height = (container.clientHeight - footer.clientHeight - header.clientHeight);
			body.style.height = height < 751 ? height + 'px' : 750 + 'px';
		},
	  	loadData(){
	  		let arr = [];
	  		this.$api.get('users').then( res => {
		  		this.users = res.data.users;
		  	}).then(() => {
			  	this.$api.get('user-data').then( res => {
			  		let pos = Object.keys(res.data);
			  		pos.forEach( function(element) {
			  			arr.push(res.data[element])
			  		});
			  		console.log(arr)
			  		this.userData = arr;

			  		this.users.forEach( (element) => {
			  			let sus = this.userData.find(item => item.userId == element.uid);
				  		this.usersComplete.push({
				  			user: element,
				  			suscription: sus.subscriptionId,
				  		})
				  	});
				  	console.log("Completos",this.usersComplete)
			  	})
		  	})
	  	},
	  	async updateMessage(){
			let localMessagesUpdate = [];
			this.ref.orderBy("dateTime")
			.onSnapshot(snapshot => {
				localMessagesUpdate = [];
				snapshot.docChanges().forEach(change => {
		            if (change.type === "added") {
		            	if (change.doc.data().type == 'MESSAGE') {
							localMessagesUpdate.push(change.doc.data());
		            	}
		            }
		        })

		        if (this.messages.length > 0) {
	        		localMessagesUpdate.forEach(item => {
	        			this.messages.push(item)
	        		})
	        	}
			})
		},
	  	loadMessage(user){
	  		this.userSelected = user;
	  		this.showMessages = true;
	  		this.messages = [];
	  		console.log("usuario!", user.uid)
	  		this.setHeights();
	  		this.ref.where("receiverId", "==", user.uid)
	                .get()
	                .then(querySnapshot => {
	                    let localMessages = [];
	                    querySnapshot.forEach(doc => {
	                        console.log(doc.data())
	                        this.messages.push(doc.data())
	                        
	                    });
	                })

	  	},
	  	sendMessage(){
	  		this.ref.add({
				body: this.txtMessage,
				dateTime: firebase.firestore.FieldValue.serverTimestamp(),
				receiverId: this.userSelected.uid,
				senderId: this.user.uid,
				subject: "Mensaje de Prueba",
				status: false,
				type: "MESSAGE"
			});
			this.txtMessage = "";
			this.loadMessage(this.userSelected);
	  	},
	  },
	  computed:{
		...mapState(['user']),
	  },
	};
</script>

<style lang="css" scoped>
	textarea::placeholder{
		color: black;
	}
	.message-container, .list-users{
		max-height: 750px;
		overflow: scroll;
	}
	.opacity{
		opacity: 0;
	}
	.h-100{
		height: 100% !important;
	}
	.message{
		margin: 15px 10px;
		padding: 5px 7px;
		background-color: #f1f1f1;
	}
	.right-box{
		background-color: #333;
		height: 100%;
	}
	.side-left, .side-right{
		overflow-y: scroll;
	}
	.user-list{
		border-top: 1px solid grey;
	}
	.user-list:hover{
		background-color: #f1f1f1;
	}
	.user-list:last-child{
		border-bottom: 1px solid grey;
	}
	.user-list:first-child{
		border-top: 1px solid transparent;
	}
</style>
