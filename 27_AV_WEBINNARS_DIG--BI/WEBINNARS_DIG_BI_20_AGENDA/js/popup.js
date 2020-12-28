var eventCalendar={
	months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
	popupBtn: '',
	eventPopup: '',
	open: function(ev){
		let prop=ev.extendedProps;
		$( '.ev-agenda-detail img').attr( 'src', 'data:image/jpeg;base64,' + prop.img_veeva_b64 );
		let date={
			start: {
				day: ev.start.getDate(),
				month: ev.start.getMonth()
			}
		};
		if(ev.end){
			date.end={
				day: ev.end.getDate(),
				month: ev.end.getMonth()
			};
		}
		let time={
			start: {
				hour: ev.start.getHours(),
				minute: ev.start.getMinutes()
			}
		};
		if(time.start.hour<10) time.start.hour=`0${time.start.hour}`;
		if(time.start.minute<10) time.start.minute=`0${time.start.minute}`;
		if(ev.end){
			time.end={
				hour: ev.end.getHours(),
				minute: ev.end.getMinutes()
			};
			if(time.end.hour<10) time.end.hour=`0${time.end.hour}`;
			if(time.end.minute<10) time.end.minute=`0${time.end.minute}`;
		};
		// EVENTO
		this.eventPopup.child('div').child('div').addClass('not-use');
		this.eventPopup.removeClass().addClass(`cat-${prop.catNormalized}`);
		// title
		this.eventPopup.find('.ev-title').html(ev.title);
		// date
		this.eventPopup.find('.ev-date').html(`${date.start.day}${!date.end || date.start.month!=date.end.month || date.start.day==date.end.day?` de ${eventCalendar.months[date.start.month]}`:''}${date.end && !(date.start.day==date.end.day && date.start.month==date.end.month)?` - ${date.end.day} de ${eventCalendar.months[date.end.month]}`:''}`);
		// time
		if(ev.allDay) this.eventPopup.find('.ev-time').html('Todo el día');
		else this.eventPopup.find('.ev-time').html(`${time.start.hour}:${time.start.minute} ${time.end?` - ${time.end.hour}:${time.end.minute}`:''} horas`);
		// location
		if(prop.location) this.eventPopup.find('.ev-location').html(prop.location).removeClass('not-use');
		// ponente
		if(typeof prop.speakers=='object' && prop.speakers.constructor.name=='Array'){
			let ponentListHTML='';
			for(let i=0; i<prop.speakers.length; i++){
				let ponente=prop.speakers[i];
				if(!ponente.name) continue;
				ponentListHTML+=`<div><b>${ponente.name}</b><div>${ponente.description}</div></div>`;
			}
			this.eventPopup.find('.ev-speaker').removeClass('not-use')
			.find('.ev-speaker-list').html(ponentListHTML);
		}
		// fue
		if(prop.fue) this.eventPopup.find('#ev-actions>.img-btn.fue').removeClass('not-use').attr('go-email', prop.fue);
		// MOSTRAR
		this.popupBtn.trigger('click');
	}
};
document.addEventListener('DOMContentLoaded', function() {
	// calendar elements
	eventCalendar.popupBtn=$$_('<a do-toggle="o /event" class="img-btn event"></a>').newBind('[do-toggle]');
	eventCalendar.eventPopup=$$_('#event>*>*');
});
let popupMap=BIND.prototype.bind.get('[do-toggle]');
popupMap.event.click.push((args) => {
	if(args.ele.hasClass('img-btn ver_agenda')){
		$$_('#agenda>*')[0].scrollTop=0;
		$$_('#agenda .ev-agenda-detail')[0].scrollTop=0;

	}
	else if(args.ele.hasClass('img-btn event')){
		$$_('#event>*')[0].scrollTop=0;
		$$_('#event #ev-metadata')[0].scrollTop=0;
	}
});
