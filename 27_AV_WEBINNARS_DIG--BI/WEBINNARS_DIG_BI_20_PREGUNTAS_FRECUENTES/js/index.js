{
	let scroll;
	let paddingTop=0;
	let openTimeout;
	let open=function(ele){
		// close();
		ele.parent().addClass('toggle-active');
		let content=ele.next();
		if(content && content.child('div').length){
			content.css('height', content.child('div')[0].__height()+'px');
			clearTimeout(openTimeout);
			openTimeout=setTimeout(() => {
				content.css('height', content.child('div')[0].__height()+'px');
				ele.parent().parent().scrollTop=ele.parent().offsetTop-paddingTop;
				openTimeout=setTimeout(() => {
					ele.parent().parent().scrollTop=ele.parent().offsetTop-paddingTop;
				}, 350);
			}, 350);
		}
	};
	let close=function(ele){
		clearTimeout(openTimeout);
		if(!ele) ele=$$_('#body .body h1');
		ele.parent().removeClass('toggle-active');
		let content=ele.next();
		if(content) content.css('height', '0px');
	};
	window.isready.then(() => {
		scroll=BIND.prototype.bind.get('[smoothscroll]');
		paddingTop=parseInt($_('#body .body').css('padding-top'));
		// icon
		$$_('#body .body h1').append('<i class="icon-message"></i>', true);
		// click
		$$_('#body .body h1').bind('click', function(e){
			if(this.parent().hasClass('toggle-active')) close(this);
			else open(this);
		});
	});
	window.isload.then(() => {
		if(scroll) scroll=scroll.wrapper.get($_('#body .body'));
	});
}