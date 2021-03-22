<template>
	<div>
		<div class="grey lighten-2 h-85 p-absolute w-95 b-radius-5 content-box all-center">
			<div class="w-60 w-95-sm">
				<div class="white  padding-35 padding-15-sm b-radius-10 center-align">
					<div class="text-20">
						<strong>Resultado del Test</strong>
					</div>
					
					<div class="left-align text-17">
						<p><strong>Record:</strong> {{ test.questions.length }} Preguntas </p>
						<p><strong>Tipo de Test:</strong> Corrección Simultánea</p>
						<p><strong>Total de Preguntas:</strong> {{ test | totalPoints }}</p>
						<p><strong>Respuestas Correctas:</strong> {{ test | points }}</p>
						<p><strong>Puntaje Final:</strong> {{ test | finalScore }}</p>

					</div>
				</div>
				<div class="center-align margint-30">
					<button @click="$router.push({name: 'record'})" class="btn red b-radius-25 paddinglr-50">Aceptar</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		name: "TestResult",
		props: ['testId'],
		created(){
			this.$api.get('tests/'+this.testId).then( res => {
				this.test = res.data[Object.keys(res.data)[0]];
				console.log(this.test);
			})
		},
		data(){
			return {
				test: {},
			}
		},
		filters:{
			finalScore(item){
		  		let total = 0;
		  		item.questions.forEach((elem,index)  => {
		  			let ans = elem.answers.find(elem => elem.selected == true && elem.right == true)
		  			if (ans !== undefined) {
		  				total += elem.score;
		  			}
		  		});
		  		return total
		  	},
		  	totalPoints(item){
		  		let total = 0;
		  		item.questions.forEach((elem,index)  => {
		  			total += elem.score;
		  		});
		  		return total
		  	},
		  	points(item){
		  		let total = 0;
		  		item.questions.forEach((elem,index)  => {
		  			let ans = elem.answers.find(subelem => {
		  				console.log("Respuesta", subelem.selected + " | " + subelem.right)
		  				if (subelem.selected && subelem.right) {
		  					console.log(subelem)
		  				}
		  				return subelem.selected && subelem.right
		  			})
		  			if (ans !== undefined) {
		  				total += 1;
		  			}
		  		});
		  		return total
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

