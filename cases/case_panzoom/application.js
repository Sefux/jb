

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
			{'_top':'308','_left':'460','_zoom':'8','_title':'Career','_content':'Here hotspot 1'},
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
				var panzoom = $section.find('.panzoom').panzoom();
				
				var center_x = body_width / 2;
				var center_y = body_height / 2;	
				//console.log('center_x:'+center_x+' center_y:'+center_y);
				var mouse_x = event.clientX;
				var mouse_y = event.clientY;
				//console.log('offset_x:'+mouse_x+' offset_y:'+mouse_y);
				var pan_x = center_x - mouse_x;
				var pan_y = center_y - mouse_y;
				
				console.log('element_x:'+pan_x+' pan_y:'+pan_y);

				if($(this).data('zommedIn')) {
					console.log('resetPan');	
					panzoom.panzoom("resetPan", true);

					$(this).data('zommedIn',false);
					var zoomOut = 0;//this._zoomLevel;
					
					panzoom.panzoom('zoom', zoomOut, {
						maxScale: this._zoomLevel,
					  	increment: 1.1,
					  	duration: 20000,
					  	//focal: point_obj
					});
				} else {
					//alert('this');
					panzoom.panzoom("pan", pan_x, pan_y, {relative: true, animate: true});
		//var point_obj = {'clientX':theObject._left,'clientY':theObject._top};
					var point_obj = {'clientX':pan_x,'clientY':pan_y};
					var point_obj = {'clientX':mouse_x,'clientY':mouse_y};
					
					var zoomOut = 4;//this._zoomLevel;
					panzoom.panzoom('zoom', zoomOut, {
						maxScale: this._zoomLevel,
					  	increment: 1.1,
					  	duration: 20000,
					  	//focal: point_obj
					});

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
				//resetZoom();
			}
			this.scrollHere = function(zoomOut) {
				// Let's pass the position of the zoom box
				// off to the function that is responsible
				// for zooming the image.
				/*
				zoomImage(
					this._left,
					this._top,
					this._zoomLevel
				);


*/

			var $panzoom = $section.find('.panzoom').panzoom();
			var point_obj = {'clientX':this._left,'clientY':this._top};
			
			/*$panzoom.panzoom('zoom', zoomOut, {
				maxScale: this._zoomLevel,
				  increment: 2.1,
				  duration: 20000,
				  focal: point_obj
				});
*/
			var center_x = body_width / 2;
			var center_y = body_height / 2;	

			console.log('offset_x:'+center_x+' offset_y:'+center_y);
			console.log('element_x:'+this._instance.css('left')+' offset_y:'+this._instance.css('top'));

			//$panzoom.panzoom("pan", pan_x, pan_y, {relative: false, animate: true});
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


			var $section = $('#focal');
			var $panzoom = $section.find('.panzoom').panzoom();


			$panzoom.parent().on('mousewheel.focal', function( e ) {
				e.preventDefault();
				var delta = e.delta || e.originalEvent.wheelDelta;
				var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
				//console.log('zoomOut:'+zoomOut);
				$panzoom.panzoom('zoom', zoomOut, {
				  increment: 0.1,
				  focal: e
				});
			});
 
			
			
			
		});
 