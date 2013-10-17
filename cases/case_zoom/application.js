

		var body_width;
		var body_height;

		var maxZoom = 4;

		// First, let's get refernces to the elements we will
		// be using.
		var view = $( "#view" );
		var image = $( "#image" );

		// Create the ZOOM element - this will be added with
		// Javascript since it's more of an "effect".
		var zoom = $( "<a id='zoom'><span><br /></span></a>" );


		
		var hotspots_setup = [
			{'_top':'308','_left':'460','_zoom':'2','_title':'Career','_content':'Here hotspot 1'},
			{'_top':'375','_left':'870','_zoom':'4','_title':'Nike','_content':'Here hotspot 2'},
		];

		$(document).ready(function(){
			body_width = $(window).width();
			body_height = $(window).height();
//alert('DOC-READY width:'+body_width+' height:'+body_height);
		});

		// When the WINDOW is ready, initialize. We are going with
		// the window load rather than the document so that we
		// know our image will be ready as well (complete with
		// gettable dimentions).

		$( window ).load(function(){


			function Hotspot(element) {
			this._top = element._top;
			this._left = element._left;
			this._zoomLevel = element._zoom;
			this._title = element._title;
			this._content = element._content;
			this._template = $('<div class="hotspot"></div>');
			
			
			this._template.css('position','absolute');
			this._template.css("top",this._top+'px');
			this._template.css("left",this._left+'px');
			this._template.css("z-index",this._top+1000);
			this._template.data('HotObject',this);
			
			this._template.click(function(event){
				event.preventDefault();
				event.stopPropagation();
				
				var theObject = $(this).data("HotObject");

				if($(this).data('zommedIn')) {
					
					theObject.scrollOut();

					$(this).data('zommedIn',false);
					
				} else {
					//alert('this');
					
					theObject.scrollHere();
					console.log('hotspot triggert'+theObject._title);

					$(this).data('zommedIn',true);
				}
				return false;
				//this.scrollHere();	

			});

			this._instance = view.append(this._template);
			
		
			this.echoContent = function() {
				alert(this._instance.css("top")+':'+this._title);
			
			}
			this.scrollOut = function() {
				// Let's pass the position of the zoom box
				// off to the function that is responsible
				// for zooming the image.
				resetZoom();
			}
			this.scrollHere = function() {
				// Let's pass the position of the zoom box
				// off to the function that is responsible
				// for zooming the image.
				zoomImage(
					this._left,
					this._top,
					this._zoomLevel
				);
			}	
		}

 			
			//first set the width of the view to the viewport
/*			var body_width = $(window).width();
			var body_height = $(window).height();
			*/
			console.log('WIN LOAD width:'+body_width+' height:'+body_height);


			view = $( "#view" );
			image = $( "#image" );

			// Create the ZOOM element - this will be added with
			// Javascript since it's more of an "effect".
			zoom = $( "<a id='zoom'><span><br /></span></a>" );

			//set up hotspots 
			var hotty;
			$.each(hotspots_setup,function() {
				hotty = new Hotspot(this);
				//el.echoContent();

				//view.append(el._template);
			});
			
			// Before we start messing with the scripts, let's
			// update the display to allow for the absolute
			// positioning of the image and zoomer.
 
			// Set an explicit height / width on the view based
			// on the initial size of the image.
			//view.width( image.width() );
			//view.height( image.height() );

			//make the container fullscreen
			image.width( body_width );
			view.width( body_width );
			view.height( body_height );			

 
			// Now that the view has an explicit width and height,
			// we can change the displays for positioning.
			image.css( "position", "absolute" );
 
			// Set an exlicit height on the image (to make sure
			// that some of the later calcualtions don't get
			// messed up - I saw some irradic caculated-height
			// behavior).
			image.height( image.height() );
 
			// Before we add the zoom square, we need it to match
			// the aspect ratio of the image.
			zoom.width( Math.floor( view.width() / 3 ) );
			zoom.height( Math.floor( view.height() / 2 ) );
 
			// Now, add the zoom square to the view.
			view.append( zoom );
 
 
			// ---------------------------------------------- //
			// ---------------------------------------------- //
 
 
			// Now that we have our UI set up physically, we need
			// to bind the event handlers.
 
			// We want to show and hide the zoom only when the
			// user hovers over the view.
			view.hover(
				function( event ){
					// Show the soom.
					zoom.show();
				},
				function( event ){
					// Hide the zoom.
					zoom.hide();
				}
			);
 
 
			// As the user mouses over the view, we can get the
			// mouse coordinates in terms of the page; we need
			// to be able to translate those into VIEW-based
			// X and Y cooridates. As such, let's get the offset
			// of the view as our base 0x0 coordinate.
			//
			// NOTE: We are doing this here so that we do it once,
			// rather than every time the mouse moves.
			viewOffset = view.offset();
 
			// Get the jQuery-ed version of the window as we will
			// need to access it's scroll offsets every time the
			// mouse moves over the div.
			//
			// NOTE: This will change the change the refernce to
			// "window" for all of the code in this closure.
			var window = $( window );
 
 
			// As the user moves across the view, we want to move
			// the zoom square with them.
			view.mousemove(
				function( event ){
					// Get the window scroll top; the mouse
					// position is relative to the window, NOT
					// the document.
					var windowScrollTop = window.scrollTop();
					var windowScrollLeft = window.scrollLeft();
 
					// Translate the mouse X / Y into view-local
					// coordinates that can be used to position
					// the zoom box.
					setZoomPosition(
						Math.floor(
							event.clientX - viewOffset.left + windowScrollLeft
						),
						Math.floor(
							event.clientY - viewOffset.top + windowScrollTop
						)
					);
				}
			);
 
 
			// I position the zoom box within the view based on
			// the given view-local mouse coordinates.
			var setZoomPosition = function( mouseLeft, mouseTop ){
				// Ideally, we want to keep the zoom box centered
				// on the mouse. As such, we want the given mouse
				// left and mouse top coordiantes to be in the
				// middle of the zoom box.
				var zoomLeft = (mouseLeft - (zoom.width() / 2));
				var zoomTop = (mouseTop - (zoom.height() / 2))
 
				// As we move the zoom box around, however, we
				// never want it to go out of bounds of the view.
 
				// Protect the top-left bounds.
				zoomLeft = Math.max( zoomLeft, 0 );
				zoomTop = Math.max( zoomTop, 0 );
 
				// Protect the bottom-right bounds. Because the
				// bottom and right need to take the dimensions
				// of the zoom box into account, be sure to use
				// the outer width to include the border.
				zoomLeft = Math.min(
					zoomLeft,
					(view.width() - zoom.outerWidth())
					);
				zoomTop = Math.min(
					zoomTop,
					(view.height() - zoom.outerHeight())
					);
 
				// Position the zoom box in the bounds of the
				// image view box.
				zoom.css({
					left: (zoomLeft + "px"),
					top: (zoomTop + "px")
				});
			};
 
 
			// Now that we have the mouse movements being tracked
			// properly, we need to track the click on the zoom to
			// zoom in the image on demand. To do that, however,
			// we need to start storing some information with the
			// image so we can manipulate it as needed.
			image.data({
				zoomFactor: (view.width() / zoom.width()),
				zoom: 1,
				top: 0,
				left: 0,
				width: image.width(),
				height: image.height(),
				originalWidth: image.width(),
				originalHeight: image.height()
			});
 
 
			// Now, let's attach the click event handler to the
			// zoom box.
			/*
			zoom.click(
				function( event ){
					// First, prevent the default since this is
					// not a navigational link.
					event.preventDefault();
 
					// Let's pass the position of the zoom box
					// off to the function that is responsible
					// for zooming the image.
					zoomImage(
						zoom.position().left,
						zoom.position().top
					);
				}
			);
*/
 
 
			// I take the zoom box coordinates and translate them
			// into an actual image zoom based on the existing
			// zoom and offset of the image.
			//
			// NOTE: We don't care about the dimensions of the
			// zoom box itself as those should have already been
			// properly translated into the zoom *factor*.
			var zoomImage = function( zoomLeft, zoomTop, zoomFactor ){
				// Get a reference to the image data object so we
				// don't need to keep retreiving it.
				var imageData = image.data();
				imageData.zoomFactor = zoomFactor;
 
 				console.log('zoomImage: left:'+zoomLeft+' top:'+zoomTop+' zoom:'+zoomFactor);
				// Check to see if we have reached the max zoom
				// or if the image is currently animating.
				// If so, just return out.
				if (
					(imageData.zoom == maxZoom) ||
					(image.is( ":animated" ))
					){
 					resetZoom();
					// Zooming in beyond this is pointless (and
					// can cause the browser to mis-render the
					// image).
					return;
 
				}
 
				// Scale the image up based on the zoom factor.
				imageData.width =
					(image.width() * imageData.zoomFactor);
 
				imageData.height =
					(image.height() * imageData.zoomFactor);
 
				// Change the offset set data to re-position the
				// 0,0 coordinate back up in the top left.
				imageData.left =
					((imageData.left - zoomLeft) * imageData.zoomFactor);
 
				imageData.top =
					((imageData.top - zoomTop) * imageData.zoomFactor);
 
				// Increase the zoom.
				imageData.zoom++;
 
				// Animate the zoom.
				image.animate(
					{
						width: imageData.width,
						height: imageData.height,
						left: imageData.left,
						top: imageData.top
					},
					500
				);
			};
 
 
			// I reset the image zoom.
			var resetZoom = function(){
				// Get a reference to the image data object so we
				// don't need to keep retreiving it.
				var imageData = image.data();
 
				// Reset the image data.
				imageData.zoom = 1;
				imageData.top = 0;
				imageData.left = 0;
				imageData.width = imageData.originalWidth;
				imageData.height = imageData.originalHeight;
 
				// Animate the zoom.
				image.animate(
					{
						width: imageData.width,
						height: imageData.height,
						left: imageData.left,
						top: imageData.top
					},
					300
				);
			};
 
 
			// As a final step, to make sure that the image can
			// be zoomed out, bind the mousedown to the document.
			$( document ).mousedown(
				function( event ){
					// Check to see if the view is in the event
					// bubble chain for the mouse down. If it is,
					// then this click was in the view or its
					// child elements.
					var closestView = $( event.target ).closest( "#view" );
 
					// Check to see if this mouse down was in the
					// image view.
					if (!closestView.size()){
 
						// The view was not found in the chain.
						// This was clicked outside of the view.
						// Reset the image zoom.
						resetZoom();
 
					}
				}
			);
 
		});
 