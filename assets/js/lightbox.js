$('document').ready(function(){
	var album = $('.photo-album');

	// Create new lightbox attached to <body>
	var lightbox = new lightBox($('body'));

	album.on('click','.photo', function(e){
		lightbox.setModal(e).renderModal(400);
	});

	lightbox.getListener().on('click', function(e){
		if ($(event.srcElement).data('close')) {
			lightbox.closeModal();
		}
	});

});

function lightBox(parent) {
	// Properties include:
	// where to append html template
	// animation times?
	// jquery object that will be listened to
	var _lightbox,
		_aTimes = 300,
		_parent,
		_modal = "<div class='lightbox' data-close='true'><div class='image'><img src='#'/><h4 class='title'></h4><div class='description'><p></p><a class='close' data-close='true'>Close &times;</a></div></div></div>";

	// When creating a new lightbox:
	// Create empty html on page
	// when asked, take in event information and render lightbox image
	// When asked, destroy lightbox modal and reset html to to empty.

	var _prepHtml = function(parent) {
		// Be warned if you are trying to use this with any other lightbox, it will break.
		if ($('document').find('.lightbox').length == 0) {
			$(_modal).appendTo(parent);
			return $('.lightbox');
		}
	};

	var _resetHtml = function() {
		_lightbox.html($(_modal).html());
	};

	var __construct = function(parent) {
		_parent = parent;
		_lightbox = _prepHtml(parent);
	};

	__construct(parent);

	// Publics
	this.setModal = function(e) {
		var _target = $(e.currentTarget);
		_lightbox.find('img').attr('src', _target.data('href'));
		_lightbox.find('.description > p').text(_target.find('#description').text());
		_lightbox.find('.title').text(_target.find('#title').text());
		
		return this;
	};

	this.renderModal = function(speed) {
		var _animationTime = (!speed) ? _aTimes : speed;
		
		// _parent.addClass('noscroll');
		_lightbox.fadeIn(_animationTime, function(){
			_lightbox.children('.image').fadeIn(_animationTime);
		});
	};

	this.closeModal = function(speed) {
		var _animationTime = (!speed) ? _aTimes : speed;
		
		_lightbox.children('.image').fadeOut(_animationTime, function(){
			_lightbox.fadeOut(_animationTime);
			_resetHtml();
		});

		// _parent.removeClass('noscroll');
	};

	this.getListener = function() {
		return _lightbox;
	};

	this.debug = function() {
		console.log(this);
	};

}