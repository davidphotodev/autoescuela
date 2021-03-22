<div class="vertical-center jc-between">					
	<i class="material-icons">chevron_left</i>
	<div class="d-none d-inline-block-sm w-85">
		<vue-glide :perView="4" :startAt="answerPosition+2" :focusAt="'center'">
			<vue-glide-slide v-for="index in questions.length" :key="index">
				<div class="center-align">
					<span :class="currentAnswer == index ? 'chip-selected' : ''" class="chip-nro-question paddinglr-15-sm margin-0">{{ index }}</span>
				</div>
			</vue-glide-slide>
	    </vue-glide>
	</div>
	<i class="material-icons">chevron_right</i>
	
</div>