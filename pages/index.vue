<script lang="ts" setup>
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const month = ref(0)
const year = ref(0)
const eventDate = ref('')

const {openModal, closeModal} = useModal()

function initDate() {
	let today = new Date();
	month.value = today.getMonth()
	year.value = today.getFullYear()
}

function isToday(date: number) {
	const today = new Date();
	const d = new Date(year.value, month.value, date)

	return today.toDateString() === d.toDateString()
}

function showEventModal(date: number) {
	// open the modal
	openModal()
	eventDate.value = new Date(year.value, month.value, date).toDateString();
}


const pastBlanks = ref(0)
const monthDays: number[] = ref([])
const futureBlanks = ref(0)
function getNoOfDays() {
	let daysInMonth = new Date(year.value, month.value + 1, 0).getDate();
	
	let firstDay = new Date(year.value, month.value).getDay();
	let lastDay = new Date(year.value, month.value, daysInMonth).getDay();
	
	// Дни прошлого месяца
	pastBlanks.value = firstDay === 0 ? 0 : firstDay-1
	// Дни будущего месяца
	futureBlanks.value = lastDay === 0 ? 0 : 7-lastDay

	let daysArray: number[] = []
	for ( var i=1; i <= daysInMonth; i++) {
		daysArray.push(i);
	}
	monthDays.value = daysArray
}

onMounted(() => {
	initDate()
	getNoOfDays()	
})

</script>


<template>
<div class="antialiased sans-serif bg-gray-100 h-screen w-screen">
	<div class="">
		<div class="container xl:mx-auto">
			<div class="bg-white rounded-lg shadow overflow-hidden">

				<div class="flex items-center justify-between py-2 px-6">
					<div>
						<span class="text-lg font-bold text-gray-800">{{ MONTHS[month] }}</span>
						<span class="ml-1 text-lg text-gray-600 font-normal">{{ year }}</span>
					</div>
					<div class="border rounded-lg px-1" style="padding-top: 2px;">
						<button class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center"
							:class="{'cursor-not-allowed opacity-25': month == 0 }"	
							type="button"
							:disabled="month === 0"
							@click="month--; getNoOfDays()">
							<svg class="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
							</svg>  
						</button>
						<div class="border-r inline-flex h-6"></div>		
						<button class="leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1" 
							:class="{'cursor-not-allowed opacity-25': month == 11 }"
							type="button"
							:disabled="month === 11"
							@click="month++; getNoOfDays()">
							<svg class="h-6 w-6 text-gray-500 inline-flex leading-none"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
							</svg>									  
						</button>
					</div>
				</div>	

				<div class="-mx-1 -mb-1">
					<div class="flex flex-wrap">
						<template v-for="(day, index) in DAYS" :key="index">	
							<div style="width: 14.26%" class="px-2 py-2">
								<div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
									{{ day }}
								</div>
							</div>
						</template>
					</div>

					<div class="flex flex-wrap border-t border-l">
						<template v-if="pastBlanks" v-for="blankday in pastBlanks">
							<div class="text-center border-r border-b px-4 pt-2"	
								style="width: 14.28%; height: 120px"
							></div>
						</template>	
						<template v-if="monthDays" v-for="(date, dateIndex) in monthDays" :key="dateIndex">	
							<div style="width: 14.28%; height: 120px" class="group px-4 pt-2 border-r border-b cursor-pointer text-center leading-none transition ease-in-out duration-100"
								@click="showEventModal(date)">
								<div class="inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100"
									:class="{'bg-blue-500 text-white': isToday(date) == true, 'text-gray-700 group-hover:bg-blue-200': isToday(date) == false }"	
								>
									{{ date }}	
								</div>
								<div style="height: 80px;" class="overflow-y-auto mt-1">
									<!-- <div 
										class="absolute top-0 right-0 mt-2 mr-2 inline-flex items-center justify-center rounded-full text-sm w-6 h-6 bg-gray-700 text-white leading-none"
										x-show="events.filter(e => e.event_date === new Date(year, month, date).toDateString()).length"
										x-text="events.filter(e => e.event_date === new Date(year, month, date).toDateString()).length"></div> -->

									<!-- <template v-for="event in events.filter(e => new Date(e.event_date).toDateString() ===  new Date(year, month, date).toDateString() )">	
										<div
											class="px-2 py-1 rounded-lg mt-1 overflow-hidden border"
											:class="{
												'border-blue-200 text-blue-800 bg-blue-100': event.event_theme === 'blue',
												'border-red-200 text-red-800 bg-red-100': event.event_theme === 'red',
												'border-yellow-200 text-yellow-800 bg-yellow-100': event.event_theme === 'yellow',
												'border-green-200 text-green-800 bg-green-100': event.event_theme === 'green',
												'border-purple-200 text-purple-800 bg-purple-100': event.event_theme === 'purple'
											}"
										>
											<p x-text="event.event_title" class="text-sm truncate leading-tight"></p>
										</div>
									</template> -->
								</div>
							</div>
						</template>
						<template v-if="futureBlanks" v-for="blankday in futureBlanks">
							<div class="text-center border-r border-b px-4 pt-2"
								style="width: 14.28%; height: 120px"
							></div>
						</template>	
					</div>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<EventModal :date="eventDate"></EventModal>
		<!-- /Modal -->
	</div>
  </div>
</template>


<style>

</style>