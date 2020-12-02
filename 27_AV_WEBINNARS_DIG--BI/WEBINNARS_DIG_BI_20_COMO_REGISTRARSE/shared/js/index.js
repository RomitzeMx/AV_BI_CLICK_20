new FONT({
	family: 'icon',
	single: true
}, {
	family: 'MyriadPro',
	style: ['rg', 'sb', 'b'],
	default: true
}, {
	family: 'MyriadPro/Condensed',
	style: ['rg']
}, {
	family: 'Roboto',
	style: ['rg', 'md', 'b']
}, {
	family: 'Nexa',
	style: ['b'],
	type: 'otf'
}, {
	family: 'HelveticaNeue',
	style: ['regular']
});
new COLOR({
	name: 'default',
	code: '#4D4D4D'
}, {
	name: 'darkblue',
	code: '#1E3F77'
}, {
	name: 'blue',
	code: '#22A6DF'
}, {
	name: 'blue-2',
	code: '#3A7BC8'
});
window.isready.then(() => {
	platform.VaultURL='https://bi.veevavault.com';
	// header
	$$_('header:not([font])').attr('font', 'Nexa').addClass('text-uppercase');
	$$_('header .title').addClass('f-bold');
	// header - agregar logo
	if($_('header .title')) $$_(`<div class="logo-bi-click"><img src="${PATH.DIR.shared}media/images/logo-bi-click.png" /></div>`).insertBefore('header .title');
	// bottom bar
	$$_('body').append(`
		<div id="bottom-bar">
			<content>
				<div>
					<div class="disclaimer">
						<p>Material exclusivo para el representante médico.</p>
						<p>La información contenida en este material está destinada únicamente al profesional de la salud al cual va dirigida. Queda prohibida su divulgación, edición, <br />
						copia o distribución. Cualquier uso no autorizado será responsabilidad del profesional de la salud o cualquier tercero que tenga acceso a la misma.</p>
					</div>
					<div class="boehringer">
						<div class="logo"><img src="${PATH.DIR.shared}media/images/logo-bi.png" /></div>
						<div class="info">
							<b>Boehringer Ingelheim Promeco, S.A. de C.V.</b> <br />
							Maíz #49 Col. Barrio Xaltocan, <br />
							C.P. 16090, Xochimilco, CDMX, México <br />
							Fecha de producción: Octubre 2020
						</div>
					</div>
				</div>
			</content>
		</div>
	`);
});
// menu active
window.isload.then(function(){
	platform.isload.then(function(){
		platform.request.await().then(() => {
			$$_('menu.framework menu li.goto-active').parent().parent().parent().parent().addClass('goto-active');
		});
	});
});