(function(){

	var modal = $('.tile--content');
	var modalPopup = $('#myModal').find('img');

	modal.each(function(){
		var modalEl = $(this);
		var contentId = modalEl.find('.modal-tile');

		modalEl.click(function(){

			var attr = $(contentId).attr('data-src');
			var modalId = modalEl.attr('data-id')

			if(attr){
				var url = 'assets/images/' + attr + '.jpg'; 
			}
			
			console.log(modalId + ' option has been clicked')
			$(modalPopup).attr('src', url)

		})

	})

	var tl = new TimelineLite();

	tl.staggerFrom($(".tile"), 1 , {opacity: 0, left: '+=50'}, 0.2 )


})()