

		var body_width;
		var body_height;

		var maxZoom = 4;

		// First, let's get refernces to the elements we will
		// be using.
		var view = $( "#viewport" );
		var container = $( "#container" );
		var image = $( "#image" );

		// Create the ZOOM element - this will be added with
		// Javascript since it's more of an "effect".
		var zoom = $( "<a id='zoom'><span><br /></span></a>" );


		
		var hotspots_setup = [
			{'_top':'308','_left':'460','_zoom':'8','_title':'Career','_content':'Here hotspot 1'},
			{'_top':'375','_left':'870','_zoom':'4','_title':'Nike','_content':'Here hotspot 2'},
		];

		$(window).load(function(){
			body_width = $(window).width();
			body_height = $(window).height();

			var view = $( "#viewport" );
			var container = $( "#container" );
			var image = $( "#image" );

			
console.log('DOC-READY width:'+body_width+' height:'+body_height);
			view.width(body_width);
			container.width(body_width);
			image.width(body_width);
			/*
				$('#container').click(function(evt) {
                	evt.stopPropagation();
                	$(this).zoomTo({duration:1000, targetsize:0.9});
                });
              */  
               /*
               $('.label').click(function(evt) {
                	evt.stopPropagation();
                	$(this).zoomTo({duration:1000, targetsize:0.6});
                });
*/
		});

 