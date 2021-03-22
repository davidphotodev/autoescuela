<template>
	<div id="messages" class="d-flex reset">
		<div :class="listMessages" class="w-30 w-35-lg w-100-md message-left reset">
			<ul class="messages-ul reset">
                <li v-for="(msg, index) in messages" :key="index" @click="showContentMessage(msg, index)" :class="{'grey lighten-3':!msg.status}" class="d-none-md row message-li padding-15 cursor-pointer v-center">
                    <div class="col s2">
                        <i class="material-icons orange-text text-darken-2">mail</i>
                    </div>
                    <div class="col s8 left-align">
                        <p class="margint-0">
                        	<strong>Administrador </strong>
                        	<strong v-if="!msg.status" class="chip-red">nuevo</strong>
                        </p>
                        <p class="ellipsis reset">{{ msg.subject }}</p>
                    </div>
                    <div class="col s2  delete-icon" >
                        <div class="center-align">
                            <i @click="deleteMessage(msg.id)" class="material-icons grey-text text-darken-1">delete</i>
                            <!-- <p class="reset" style="font-size: 12px;">31 Oct</p> -->
                        </div>
                    </div>
                </li>
                <li v-for="(msg, index) in messages" :key="index+1*.01" @click="showContentMessage(msg, index)" :class="{'grey lighten-3':!msg.status}" class="d-block-md d-block-sm d-none row message-li padding-15 cursor-pointer">
                    <div class="col s2">
                        <i class="material-icons orange-text text-darken-2">mail</i>
                    </div>
                    <div class="col s8 left-align">
                        <p class="margint-0">
                        	<strong>Administrador </strong>
                        	<strong v-if="!msg.status" class="chip-red">nuevo</strong>
                        </p>
                        <p class="ellipsis reset">{{ msg.subject }}</p>
                    </div>
                    <div class="col s2  delete-icon" >
                        <div class="center-align">
                            <i @click="deleteMessage(msg.id)" class="material-icons grey-text text-darken-1">delete</i>
                        </div>
                    </div>
                </li>
            </ul>		
		</div>
		<div v-if="!contentMessage" class="w-70 w-75-lg w-100-md messages-content padding-20">
			<div class="row all-center d-block-sm message-title">
				<div class="col m2 s12 d-none d-block-sm paddingtb-10">
                    <div class="center-align jc-between">
                    	<div>
                    		<i @click="showMessageList()" class="material-icons grey-text text-darken-1">keyboard_backspace</i>
                    	</div>
                        <div>
                        	<i class="c-pointer material-icons grey-text text-darken-1">delete</i>
                        </div>
                    </div>
				</div>
				<div class="col m3 s12">
					<p class="reset-sm">
						<strong>Administrador</strong>
					</p>
				</div>
				<div class="col m8 s12">
					<p class="ellipsis reset-sm">{{ message.subject }}</p>
				</div>
				<div class="col m1 s12 d-none-sm">
					<div class="vertical-center">
                        <div class="center-align cursor-pointer">
                            <i @click="deleteMessage(message.id)" class="material-icons grey-text text-darken-1">delete</i>
                        </div>
                    </div>
				</div>
			</div>
			<div class="message-content grey lighten-2 scroll-y" >
				<div class="w-85 padding-25 margintb-20 margin-auto white">
					<p>
						<strong>{{ message.subject }}</strong>
					</p>

					<p v-html="message.body"></p>
					
				</div>
			</div>
		</div>
		<div v-else class="all-center w-70 w-75-lg w-100-md d-none-md center-align paddinglr-50">
			<h4 class="grey-text">Aquí se mostrarán las notificaciones que recibas del Administrador</h4>
		</div>
	</div>
	
</template>

<script>
import * as firebase from "firebase/app";
import { mapState } from 'vuex'
export default {
	name: 'Messages',
	created(){
		this.$store.commit('SET_LAYOUT', 'dashboard-layout');
		this.loadData();
	},
	data(){
		return {
			showMessage: false,
			ref: firebase.firestore().collection('messages'),
			contentMessage: true,
			listMessages: '',
			messages: [],
			message: {},
			indexMessage: null,
		}
	},
	methods: {
		loadData(){
			this.messages = [];
			this.message = {};
			this.ref.where("receiverId", "==", this.user.uid)
				.orderBy("dateTime", "asc")
                .get()
                .then(querySnapshot => {

					let localMessages = [];
			        querySnapshot.forEach(doc => {
			        	if (doc.data().receiverId == this.user.uid){
			        		let obj = doc.data();
			        		obj.id = doc.id;
			            	localMessages.push(obj);
			        	}
			        });
			    	if (this.messages.length === 0) {
			    		this.messages = localMessages.reverse();
			    	}
			    })
			    
		},
		showContentMessage(message, index){
			this.indexMessage = index;
			this.contentMessage = false;
			if (this.listMessages == 'd-none-md') {
				this.listMessages = 'd-block';	
			}else{
				this.listMessages = 'd-none-md';
			}
			this.message = message

			if (!message.status) {
				this.ref.doc(message.id).set({
					status: true,
				}, { merge: true }).then(() => {
					this.messages[index].status = true
				}).catch(error => {
					console.log(error)
				})
			}

		},
		showMessageList(){
			this.contentMessage = true;
			this.listMessages = 'd-block';
		},
		deleteMessage(id){
			if (confirm("¿Eliminar notificación?")) {
				this.ref.doc(id).delete().then(res => {
					M.toast({html: 'Notificación eliminada'});
					this.contentMessage = true;
					this.loadData();
					this.showMessageList();
				})
			}
		}
	},
	computed:{
		...mapState(['showProfile', 'user']),
	},
};
</script>

<style scoped>
	.chip-red{
		background-color: #F44336;
		padding: 0 5px;
		color: white;
		border-radius: 4px;
	}
	.display-none{
		display: none !important;
	}
	#messages{
		height: 600px;
	}
	#messages > div{
		height: 100%;
	}
    .ellipsis{
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
    }
    .message-title{
    	height: 10%;
    }
    .message-content{
    	min-height: 500px;
    }
	.messages-ul{
        background-color: white;
        
    }
    .message-li{
        border-bottom: 1px solid #979797;
        width: 100%;
        margin: 0 !important;
        min-height: 114px;
    }
    .message-li:hover{
        background-color: #eaeaea;
    }
	.message-left{
		height: 100%;
		overflow-y: scroll;
	}
	.b{
		border: 1px solid black;
	}
	@media (max-width: 600px){
		.message-title{
    		height: auto;
    	}
	}
	
</style>