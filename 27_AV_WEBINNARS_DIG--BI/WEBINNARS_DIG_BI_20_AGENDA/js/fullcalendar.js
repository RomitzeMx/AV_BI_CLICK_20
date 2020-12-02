function fullcalendarInit(jsonEvents){
	let calendarEl = document.getElementById('calendar');
	// date
	let currentDate=new Date();
	let currentDate_hour=currentDate.getHours();
	if(currentDate_hour<10) currentDate_hour=`0${currentDate_hour}`;
	let currentDate_minute=currentDate.getMinutes();
	if(currentDate_minute<10) currentDate_minute=`0${currentDate_minute}`;
	// fullcalendar
	var calendar = new FullCalendar.Calendar(calendarEl, {
		locale: 'es', // Español
		initialDate: currentDate, // Enfocar en la fecha actual
		headerToolbar: {
			start: 'title prev,today,next dayGridMonth,timeGridWeek',
			center: '',
			end: ''
		},
		buttonText: {
			dayGridMonth: 'Eventos por mes',
			timeGridWeek: 'Eventos por semana'
		},
		buttonIcons: {
			today: 'x'
		},
		// day
		firstDay: 1, // Inicio de semana: Lunes
		navLinks: false, // can click day/week names to navigate views
		hiddenDays: [0],
		// week
		weekNumbers: false,
		weekNumberCalculation: 'ISO',
		// view
		editable: false,
		selectable: false,
		dayMaxEvents: true, // allow "more" link when too many events
		views: {
			dayGridMonth: {
				titleFormat: { month: 'short', year: 'numeric' },
				dayHeaderFormat: {
					weekday: 'short'
				},
				showNonCurrentDates: false,
				fixedWeekCount: false
			},
			timeGridWeek: {
				titleFormat: { month: 'short', year: 'numeric' },
				nowIndicator: true,
				scrollTime: `${currentDate_hour}:00`
			}
		},
		// content
		dayHeaderContent: function(info){
			let text=info.text;
			text=text.substr(0, 1).toUpperCase()+text.slice(1);
			if(info.view.type=='dayGridMonth') text=text.substr(0, text.length-1);
			return text;
		},
		allDayContent: function(info){
			return 'Todo el día';
		},
		// event
		events: jsonEvents,
		eventClick: function(info){
			eventCalendar.open(info.event);
			// info.jsEvent.preventDefault();
		},
		eventClassNames: function(info){
			let classList=[];
			let prop=info.event.extendedProps;
			if(prop.category){
				classList.push('cat-'+prop.catNormalized);
			}
			return classList;
		},
		eventContent: function(info){
			let div=document.createElement('div');
			div.classList.add('fc-event-title');
			div.innerHTML=info.event.title;
			return { domNodes: [div] };
		}
	});
    calendar.render();
	// lista de categorias
	let eventList=calendar.getEvents(),
	eventCategoryNormalized={},
	eventCategory=[];
	for(let i=0; i<eventList.length; i++){
		let ev=eventList[i];
		let prop=ev.extendedProps;
		let catNormalized;
		if(prop.category){
			if(eventCategory.indexOf(prop.category)<0){
				catNormalized=prop.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s\W]/g, '_');
				eventCategoryNormalized[prop.category]=catNormalized;
				eventCategory.push(prop.category);
			}
			else{
				catNormalized=eventCategoryNormalized[prop.category];
			}
		}
		ev.setExtendedProp('catNormalized', catNormalized);
	}
	eventCategory.sort();
	// categorías en HTML - botones / columnas
	let ondemandHeaderHTML='',
	ondemandContainerHTML='',
	fullCalendarButtonHTML='';
	for(let i=0; i<eventCategory.length; i++){
		let catNormalized=eventCategoryNormalized[eventCategory[i]];
		ondemandHeaderHTML+=`<td class="cat-${catNormalized}">${eventCategory[i]}</td>`;
		ondemandContainerHTML+=`<td class="cat-${catNormalized} overflow-auto"><ul></ul></td>`;
		fullCalendarButtonHTML+=`<label class="fc-button fc-label cat-${catNormalized}"><input type="checkbox" /> ${eventCategory[i]}</label>`;
	}
	// botones de categoría
	$$_('#fullcalendar #cat-button').html(fullCalendarButtonHTML);
	// header on Demand
	$$_('#ondemand #cat-header').html(ondemandHeaderHTML);
	// columnas on Demand
	$$_(`#ondemand #cat-content`).html(ondemandContainerHTML);
	// contenido on Demand
	for(let i=0; i<eventList.length; i++){
		let ev=eventList[i];
		let prop=ev.extendedProps;
		let cat=prop.category;
		let catNormalized=eventCategoryNormalized[cat];
		$$_(`#ondemand #cat-content>.cat-${catNormalized}>ul`).append(`<li>${ev.title}</li>`).bind('click', function(){
			eventCalendar.open(ev);
		});
	}
	// render
};