var indexPage = (function(){
	'use strict';

	var buttonPress = {
		left: false,
		center: false,
		right: false
	};

	var lastCoords = {
		top: null,
		left: null
	}

	return {
		actionBtnFirst: function ( e ) {
			console.log('First button use');
		},

		enterBtnSecond: function ( e ) {
			this.classList.add('hover');
		},

		leaveBtnSecond: function ( e ) {
			this.classList.remove('hover');
		},

		actionBtnThird: function ( e ) {
			console.log('First button use');
		},

		mousemoveBody: function ( e ) {
			if ( buttonPress.left ) {
				var pixel = document.createElement('DIV');
				pixel.classList.add('node');
				pixel.style.left = e.offsetX + 'px';
				pixel.style.top = e.offsetY + 'px';
				document.body.appendChild(pixel);

				// if ( null !== lastCoords.top && null !== lastCoords.left ) {
				// 	var width = lastCoords.left - e.offsetX;
				// 	var height = lastCoords.top - e.offsetY;
				// 	pixel.style.width = width + 'px';
				// 	pixel.style.transform = 'rotate(' + ( -Math.sin( height / width ) * 180 / 3.14 ) + 'deg)';
				// }
				lastCoords.top = e.offsetX;
				lastCoords.left = e.offsetY;
			}
		},

		mousedownBody: function ( e ) {
			buttonPress.left = true;

		},

		mouseupBody: function ( e ) {
			buttonPress.left = false;
			lastCoords.top = null;
			lastCoords.left = null;
		}
	};
}());

$('body').on('click', '#first_button', indexPage.actionBtnFirst);
$('body').on('mouseenter', '#second_button', indexPage.enterBtnSecond);
$('body').on('mouseleave', '#second_button', indexPage.leaveBtnSecond);
$('body').on('click', '#third_button', indexPage.actionBtnThird);

$('body').on('mousemove', indexPage.mousemoveBody);
$('body').on('mouseup', indexPage.mouseupBody);
$('body').on('mousedown', indexPage.mousedownBody);