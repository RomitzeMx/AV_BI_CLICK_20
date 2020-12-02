window.isready.then(() => {
	$$_('body').append(`
		<menu class="framework" id="top" do-toggle-id="menu-top" font="MyriadPro/Condensed">
			<content class="display-flex">
				<ul>
					<li go-to="WEBINNARS_DIG_BI_20_INICIO" class="icon-home">
						<span>INICIO</span>
					</li>
					<li go-to="WEBINNARS_DIG_BI_20_BOHERINGER_CLICK">
						<span>BOEHRINGER CLICK</span>
					</li>
					<li go-to="WEBINNARS_DIG_BI_20_COMO_REGISTRARSE">
						<span>¿CÓMO REGISTRARSE A UN <br /> EVENTO DIGITAL?</span>
					</li>
					<li do-toggle="* como_ingresar menu-top" go-to="do-toggle">
						<span>¿CÓMO INGRESAR <br /> A UN EVENTO DIGITAL? </span>
						<menu do-toggle-id="como_ingresar">
							<content>
								<ul>
									<li go-to="WEBINNARS_DIG_BI_20_COMO_INGRESAR"><div>Paso a paso</div></li>
									<li go-to="WEBINNARS_DIG_BI_20_COMO_INGRESAR-VIDEO"><div>Video tutorial</div></li>
								</ul>
							</content>
						</menu>
					</li>
					<li go-to="WEBINNARS_DIG_BI_20_RECOMENDACIONES">
						<span>RECOMENDACIONES</span>
					</li>
					<li go-to="WEBINNARS_DIG_BI_20_AGENDA">
						<span>AGENDA DE EVENTOS</span>
					</li>
					<li go-to="WEBINNARS_DIG_BI_20_PREGUNTAS_FRECUENTES">
						<span>PREGUNTAS <br /> FRECUENTES</span>
					</li>
				</ul>
			</content>
		</menu>
	`);
});