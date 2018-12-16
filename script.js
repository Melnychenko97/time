class Watch {

	constructor(counters, values, container) {
		this.values = values;
		this.counters = counters;
		this.container = container;
		this.secondsCount;
		this.minutesCount;
		this.hoursCount;
	}

	get timeValue() { // set the time from inputs in the timer
		this.counters.forEach((item, index) => item.innerText = values[index].value ? values[index].value : '00' ); 
		this.secondsCount = +values[2].value;
		this.minutesCount = +values[1].value;
		this.hoursCount = +values[0].value;
		this.values.forEach(item => item.value = '');
	}

	get enableTimer() { // started the timer
		this.container.classList.remove('alert');

		const container = this.container;

		const [hours, minutes, seconds] = this.counters;

		let totalTime = this.hoursCount*3600 + this.minutesCount*60 + this.secondsCount;
		let secondsCount = this.secondsCount;
		let minutesCount = this.minutesCount;
		let hoursCount = this.hoursCount;

		const countDown = setInterval( function() { // makes count down
			
			if (secondsCount === 0 ) {

				if (minutesCount === 0) {

					if(hoursCount === 0) {
						secondsCount = 0;
					} else {
						hoursCount--;
						minutesCount = 59;
						secondsCount = 59;
						hours.innerText =  hoursCount < 10 ? `0${hoursCount}` : hoursCount;
						minutes.innerText = minutesCount;
						seconds.innerText = secondsCount;
					}
				} else {
					minutesCount--;
					secondsCount = 59;
					minutes.innerText = minutesCount < 10 ? `0${minutesCount}` : minutesCount;
					seconds.innerText = secondsCount;
				}

			} else {
				secondsCount--;
				totalTime--;
				seconds.innerText = secondsCount < 10 ? `0${secondsCount}` : secondsCount;
			}

			if (totalTime === 5) {
				container.classList.add('alert');
			}
			if (totalTime === 0) {
				clearInterval(countDown);
			}
		}, 1000);

		
	}

	get clock()  { // makes clock with a current time

		const date = new Date();

		let hoursCount = date.getHours();
		let minutesCount = date.getMinutes();
		let secondsCount = date.getSeconds();
		this.counters[0].innerText = hoursCount < 10 ? `0${hoursCount}` : hoursCount;
		this.counters[1].innerText = minutesCount < 10 ? `0${minutesCount}` : minutesCount;
		this.counters[2].innerText = secondsCount < 10 ? `0${secondsCount}` : secondsCount;

		setInterval( () => {
			if (secondsCount === 59) {
				secondsCount = 0;
				this.counters[2].innerText = '00';
				minutesCount++;
				this.counters[1].innerText = minutesCount < 10 ? `0${minutesCount}` : minutesCount;
			} else {
				secondsCount++;
				this.counters[2].innerText = secondsCount < 10 ? `0${secondsCount}` : secondsCount;
			}

			if (minutesCount === 59) {
				minutesCount = 0;
				hoursCount++;
				this.counters[0].innerText = hoursCount < 10 ? `0${hoursCount}` : hoursCount;
			}

			if (hoursCount === 23) {
				hoursCount= 0;
				this.counters[0].innerText = 0;
			}
		}, 1000);
	}
}

const form = document.querySelector('form');
const formContainer = form.parentElement;
const values = document.querySelectorAll('input');
const counters = document.querySelectorAll('.counter');


form.addEventListener('submit', (event) => { // initialize the timer
	event.preventDefault();
	const timer = new Watch(counters, values, formContainer);
	timer.timeValue;
	timer.enableTimer;
});

const tabloids = document.querySelectorAll('.time__watch'); // initialization of clock
const newClock = new Watch(tabloids);
newClock.clock;



