document.addEventListener('DOMContentLoaded', function() {
	/**
	 * category (String)
	 * Categoría del evento
	 *
	 * location (String)
	 * URL o lugar del evento
	 *
	 * fue (String)
	 * ID del template y/o fragmento(s)
	 *
	 * speakers
	 * Lista de objetos que contienen el nombre y la descripción del ponente
	 *  */

	 let eventos = [];



	 $( document ).ready( function(){
		 //localStorage.clear();
		 $( ".actualizar-eventos" ).on( 'click', function(){
			 fetchEvents();
		});//on click actualizar-eventos

		if( localStorage.getItem( "eventosLocal" ) == null || localStorage.getItem( "eventosLocal" ) == 'undefined' ){
			fetchEvents();
		}else{
			eventos = JSON.parse( localStorage.getItem( "eventosLocal" ) );
 		 console.log( eventos );
 		 $( '.overlay' ).hide();
 		 fullcalendarInit( eventos );
		}

	});//document ready

	function fetchEvents(){
		$( '.overlay' ).show();
		$.get( "https://immense-plains-88233.herokuapp.com/getevents", function( data ) {
		 localStorage.setItem( "eventosLocal", JSON.stringify( data ) );
		 eventos = JSON.parse( localStorage.getItem( "eventosLocal" ) );
		 console.log( eventos );
		 $( '.overlay' ).hide();
		 fullcalendarInit( eventos );
	 })
	 .done(function( data ) {

	 })
	 .fail(function() {
		 console.log( "Couldn't obtain" );
		 eventos = JSON.parse( localStorage.getItem( "eventosLocal" ) );
		 console.log( eventos );
		 $( '.overlay' ).hide();
		 fullcalendarInit( eventos );
	 })
	 .always(function() {

	 });
	}





	/*fullcalendarInit([
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet",
			"start": "2020-12-01T16:10:00-05:00",
			"end": "2020-12-01T23:10:00-05:00",
			"category": "Alta especialidad",
			"location": "CDMX",
			"fue": "123 | 456, 789",
			"speakers": [
				{
					"name": "Dra. Tania Colin Martínez",
					"description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
				},
				{
					"name": "Dr. José Luis Briseño de la Cruz",
					"description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."
				}
			]
		},
		{
			"title": "Lorem ipsum dolor sit amet",
			"start": "2020-12-07",
			"end": "2020-12-10",
			"category": "Alta especialidad",
			"location": "https://boehringerclick.mx/hipertension01",
			"fue": "11 | 22, 33",
			"speakers": [
				{
					"name": "Nombre del speaker 1",
					"description": "Descripción del speaker 1"
				},
				{
					"name": "Nombre del speaker 2",
					"description": "Descripción del speaker 2"
				},
				{
					"name": "Nombre del speaker 3",
					"description": "Descripción del speaker 3"
				},
				{
					"name": "Nombre del speaker 4",
					"description": "Descripción del speaker 4"
				},
				{
					"name": "Nombre del speaker 5",
					"description": "Descripción del speaker 5"
				}
			]
		},
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			"start": "2020-12-09",
			"category": "Cardiometabólico",
			"fue": "987 | 22, 33"
		},
		{
			"title": "Evento prueba 1",
			"start": "2021-01-19T16:00:00.000",
			"end": "2021-01-19T18:00:00.000",
			"category": "Respiratorio",
			"fue": "987 | 22, 33"
		},
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet",
			"start": "2020-12-16T16:00:00-05:00",
			"category": "Cardiometabólico"
		},
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			"start": "2020-12-25T23:10:00-05:00",
			"end": "2020-12-31T00:59:59-05:00",
			"category": "Ginecología/Urología"
		},
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh",
			"start": "2020-12-12T10:30:00-05:00",
			"end": "2020-12-12T12:30:00-05:00",
			"category": "Ginecología/Urología"
		},
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
			"start": "2020-12-12T12:00:00-05:00",
			"category": "Oncología"
		},
		{
			"title": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie",
			"start": "2020-12-12T12:00:00-05:00",
			"category": "Respiratorio"
		}
	]);*/
});
