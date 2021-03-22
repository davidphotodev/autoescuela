<template>
	<div>
		<div class="grey lighten-2 h-85 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-40 w-95-sm">
				<div v-if="show" class="white padding-35 padding-15-sm b-radius-10 center-align">
					<div class="text-17">
						<strong>Código Promocional</strong>
					</div>
					<div>
						<p>Si cuentas con un código promocional introdúcelo en el siguiente campo de texto, y descubre sus beneficios</p>
					</div>
					<div class="input-field grey lighten-3 w-95 b-radius-10" style="border: 15px solid #eeeeee;">
						<i class="material-icons prefix">border_color</i>
						<input v-model="promotionalCode" id="icon_prefix" class="w-95" type="text">
						<label for="icon_prefix">Introduce el COD promocional</label>
					</div>
				</div>
				<div v-else class="white  padding-35 padding-15-sm b-radius-10 center-align">
					<div class="text-17">
						<strong>Felicidades</strong>
					</div>
					<div>
						<p>Se ha aplicado el código correctamente</p>
					</div>
				</div>
				<div class="center-align margint-30">
					<button v-if="show" @click="applyCode" class="btn red b-radius-25 paddinglr-50">Enviar</button>
					<button v-if="!show" @click="show = !show" class="btn red b-radius-25 paddinglr-50">Aplicar otro código</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{		
		data(){
			return {
				show: true,
				promotionalCode: "",
			}
		},
		methods: {
			applyCode(){
				this.$api.get(`promotion-codes/search/value/${this.promotionalCode}`).then(res => {

					if (Object.values(res.data).length > 0) {
						let data = {
							promotionCodeId: Object.values(res.data)[0].id,
							subscriptionId: this.$store.state.user.subscriptionId,
						}
						this.$api.post('subscriptions/apply-code', data).then(res => {
							console.log("resss",res.data)
							//PROMOTION_CODE_NO_VALID
							if (res.data == 'PROMOTION_CODE_NO_VALID') {
								M.toast({html: 'El código es inválido', classes: 'red white-text'});
								this.promotionalCode = "";
							}else{
								this.promotionalCode = "";
								M.toast({html: 'Se ha aplicado el código promocional'});
								this.show = false
							}
						})
					}else{
						M.toast({html: 'El código es inválido', classes: 'red white-text'});
					}
					
				})
			}
		}
	};
</script>

<style scoped>
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
	}
</style>