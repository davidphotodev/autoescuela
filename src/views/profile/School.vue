<template>
	<div>
		<div class="grey lighten-2 h-85 p-absolute w-95 b-radius-5 content-box all-center">
			<div v-if="show" class="w-40 w-70-lg w-90-md">
				<div class="white  padding-35 padding-15-sm b-radius-10 center-align">
					<div class="text-17">
						<strong>Escuela</strong>
					</div>
					<div>
						<p>No estás asignado a ninguna escuela, por favor introduce y envía el nombre o código de tu escuela</p>
					</div>
					<div class="input-field grey lighten-3 w-95 b-radius-10" style="border: 15px solid #eeeeee;">
						<i class="material-icons prefix">school</i>
						<input id="icon_prefix" class="w-95" type="text">
						<label for="icon_prefix">COD. de tu escuela</label>
					</div>
				</div>
				<div class="center-align margint-30">
					<button @click="show = false" class="btn red b-radius-25 paddinglr-50">Enviar</button>
				</div>
			</div>
			<div v-else class="w-40 w-70-lg w-90-md">
				<div class="white  padding-35 padding-15-sm b-radius-10 center-align">
					<div class="text-17">
						<strong>Gracias</strong>
					</div>
					<div>
						<p>Su petición se encuentra en curso...</p>
					</div>
					<div class="input-field grey lighten-3 w-95 b-radius-10" style="border: 15px solid #eeeeee;">
						<i class="material-icons prefix">school</i>
						<input id="icon_prefix" class="w-95" type="password" value="123456789">
					</div>
				</div>
				<div class="center-align margint-30">
					<button @click="show = true" class="btn red b-radius-25 paddinglr-50">Cancelar</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.content-box{
		left: 50%;
		margin-top: 25px;
		margin-left: -47.5%;
		border-bottom: 25px solid white;
	}
</style>

<script>
	export default{
		data(){
			return {
				show: true,
			}
		}
	}
</script>