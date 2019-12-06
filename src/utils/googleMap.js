
GoogleMap = {
    	//	myLatlng : new google.maps.LatLng(29.875, 121.556830), // 宁波的经纬度
		myLatlng : new google.maps.LatLng(29.772646, 121.183072), //周公宅
		initialize : function(mapurl,initzoom,centerLatlng,isGoogle,mapdiv) {
			var myOptions = {
				center : centerLatlng || myLatlng,
				maxZoom : 18,
				minZoom : 9,
				zoom : initzoom || 14,
				mapTypeId : google.maps.MapTypeId.HYBRID, //google.maps.MapTypeId.SATELLITE,
				mapTypeControlOptions : {
					//mapTypeIds : [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN],
					//mapTypeIds : ['ningbo', google.maps.MapTypeId.ROADMAP],
					mapTypeIds : [],
					position : google.maps.ControlPosition.LEFT_BOTTOM
				},
				styles : [ {
					//elementType : "all",
					featureType : "road",
					stylers : [ {
						visibility : "off"
					} ]
				}, {
					//elementType : "all",
					featureType : "transit",
					stylers : [ {
						visibility : "off"
					} ]
				}
				/*, {
					elementType : "all",
					stylers : [ {
						visibility : "on"
					} ]
				}*/],
				streetViewControl : true,
				zoomControl : true,
				zoomControlOptions : {
					style : google.maps.ZoomControlStyle.SMALL,
					position : google.maps.ControlPosition.RIGHT_CENTER
				},
				navigationControl : true
			};
			map = new google.maps.Map(document.getElementById(mapdiv),
					myOptions);


			// begin of 设置自定义宁波图层----图，不是图层，只能切换不能叠加
			if(isGoogle==undefined){
					map.mapTypes.set("ningbo", new google.maps.ImageMapType({
						getTileUrl : function(coord, zoom) {
							var ymax = 1 << zoom;
							var y = ymax - coord.y - 1;
							console.debug(mapurl + zoom + '/' + coord.x + '/' + y + '.png?r=' + Math.random());
							return mapurl + zoom + '/' + coord.x + '/' + y + '.png?r=' + Math.random();
						},
						tileSize : new google.maps.Size(256, 256),
						name : "Ningbo",
						maxZoom : 18,
						minZoom : 9
					}));
			}else if(isGoogle==true){
				map.mapTypes.set("ningbo", new google.maps.ImageMapType({
					getTileUrl : function(coord, zoom) {
						var ymax = 1 << zoom;
						var y = ymax - coord.y - 1;
						console.debug("http://mt" + (coord.x % 4) + ".google.cn/vt/lyrs=s@170&hl=zh-CN&gl=cn&" + "x=" + coord.x + "&" + "y=" + coord.y + "&" + "z=" + zoom + "&s=Galil");
						return "http://mt" + (coord.x % 4) + ".google.cn/vt/lyrs=s@170&hl=zh-CN&gl=cn&" + "x=" + coord.x + "&" + "y=" + coord.y + "&" + "z=" + zoom + "&s=Galil";
					},
					tileSize : new google.maps.Size(256, 256),
					name : "Ningbo",
					maxZoom : 18,
					minZoom : 9
				}));
			}else{
				map.mapTypes.set("ningbo", new google.maps.ImageMapType({
					getTileUrl : function(coord, zoom) {
						var ymax = 1 << zoom;
						var y = ymax - coord.y - 1;
						console.debug(mapurl + zoom + '/' + coord.x + '/' + y + '.png?r=' + Math.random());
						return mapurl + zoom + '/' + coord.x + '/' + y + '.png?r=' + Math.random();
					},
					tileSize : new google.maps.Size(256, 256),
					name : "Ningbo",
					maxZoom : 18,
					minZoom : 9
				}));
		}					
	    map.setMapTypeId("ningbo");
			// end of 设置自定义宁波图层 

//		addOverlay('ningbo');
	},
	pan2Ningbo : function() {
		map.panTo(net.htwater.GoogleMap.myLatlng);
		map.setZoom(5);
	},
	loadKML : function(kmlUrl, preserveViewport) {
		if (null == preserveViewport) {
			preserveViewport = true;
		}
		var kmlLayer = new google.maps.KmlLayer(kmlUrl, {
			clickable : false,
			map : map,
			preserveViewport : preserveViewport
		});
		kmlLayer.setMap(map);
		return kmlLayer;
	},
	addWeatherLayer : function() {
		var weatherLayer = new google.maps.weather.WeatherLayer( {
			temperatureUnits : google.maps.weather.TemperatureUnit.CELCIUS
		});
		weatherLayer.setMap(map);
	},
	addCloudLayer : function() {
		// set weather layer
		var cloudLayer = new google.maps.weather.CloudLayer();
		cloudLayer.setMap(map);
		return cloudLayer;
	},
	addPolygon:function(bermudaTriangle)
	{
		bermudaTriangle.setMap(map);
		return bermudaTriangle;
	},
		addWarningLine : function() {
			// set warning line
			var wline24 = [new google.maps.LatLng(34.266667, 126.80888), new google.maps.LatLng(22.2, 126.80888), new google.maps.LatLng(14.75, 110.16666)];
			var wline24Path = new google.maps.Polyline({
				path : wline24,
				strokeColor : "#FFE426",
				strokeOpacity : 1.0,
				strokeWeight : 2
			});
			wline24Path.setMap(map);
			var wline48 = [new google.maps.LatLng(34.266667, 132.0), new google.maps.LatLng(22.2, 132.0), new google.maps.LatLng(14.75, 124.0), new google.maps.LatLng(14.75, 108.3)];
			var wline48Path = new google.maps.Polyline({
				path : wline48,
				strokeColor : "#456ED7",
				strokeOpacity : 1.0,
				strokeWeight : 2
			});
			wline48Path.setMap(map);
	
			var wBounds24 = new google.maps.LatLngBounds(new google.maps.LatLng(26.2, 126.2), new google.maps.LatLng(29.4, 126.80));
			var w24 = new google.maps.GroundOverlay("images/warning24.png", wBounds24, {
				clickable : false
			});
			w24.setMap(map);
			var wBounds48 = new google.maps.LatLngBounds(new google.maps.LatLng(26.2, 131.4), new google.maps.LatLng(29.4, 132.0));
			var w48 = new google.maps.GroundOverlay("images/warning48.png", wBounds48, {
				clickable : false
			});
			w48.setMap(map);
		},
	addPolyLine : function(locations) {
		var polyline = new google.maps.Polyline( {
			path : locations,
			strokeColor : "gray",
			strokeOpacity : 1.0,
			strokeWeight : 3
		});
		polyline.setMap(map);
		return polyline;
	},
	addLine:function(polyline)
	{
		polyline.setMap(map);
	},
	cleanPolyLine : function(polyline) {
		polyline.setMap(null);
	},
	drawCircleOpacity : function(location, radius, color, opacity) {
		var circle = new google.maps.Circle( {
			center : location,
			fillColor : color,
			fillOpacity : opacity,
			radius : radius,
			strokeColor : "black",
			strokeWeight : 0.1
		});
		circle.setMap(map);
		return circle;
	},
	drawCircle : function(location, radius, color) {
		var circle = new google.maps.Circle( {
			center : location,
			fillColor : color,
			fillOpacity : 0.3,
			radius : radius,
			strokeColor : "black",
			strokeWeight : 0.1
		});
		circle.setMap(map);
		return circle;
	},
	addDot : function(image, infowindow, location, title, contentString,
			markersArray) {
		var marker = new google.maps.Marker( {
			position : location,
			map : map,
			title : title,
			icon : image
		});
		markersArray.push(marker);
		// set bubble layer
		contentString = '<h2>' + title + '</h2>' + '<p>' + contentString;
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
			map.panTo(marker.getPosition());
			map.setZoom(5);
		});
	},
	addDot : function(image, infowindow, location, title, contentString,
			markersArray, zoom) {
		var marker = new google.maps.Marker( {
			position : location,
			map : map,
			title : title,
			icon : image
		});
		markersArray.push(marker);
		// set bubble layer
		contentString = '<h2>' + title + '</h2>' + '<p>' + contentString;
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
			map.panTo(marker.getPosition());
			map.setZoom(zoom);
		});
	},
	addMarkerWithColor : function(infowindow, location, title, contentString,
			markersArray, image, color) {
		if (null == image) {
			image = 'images/pin_blue.png';
		}
		if (null == color) {
			color = '#ffffff';
		}
		var marker = new google.maps.Marker( {
			position : location,
			map : map,
			title : title.split('@')[0],
			icon : image
		});
		var mapLabel = new MapLabel( {
			text : title,
			position : location,
			map : map,
			fontSize : 18,
			align : 'center'
		});
		mapLabel.set('strokeColor', color);
		mapLabel.set('position', location);
		marker.bindTo('map', mapLabel);
		marker.bindTo('position', mapLabel);
		markersArray.push(marker);
		// set bubble layer
		contentString = '<h2>' + title.split('@')[0] + '</h2>' + '<p>'
				+ contentString;
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
			map.panTo(marker.getPosition());
			//map.setZoom(11);
			});
	},
	addMarker : function(infowindow, location, title, contentString,
			markersArray, image) {
		if (null == image) {
			image = 'images/pin_blue.png';
		}
		var marker = new google.maps.Marker( {
			position : location,
			map : map,
			title : title.split('@')[0],
			icon : image
		});
		var mapLabel = new MapLabel( {
			text : title,
			position : location,
			map : map,
			fontSize : 12,
			align : 'center'
		});
		mapLabel.set('position', location);
		marker.bindTo('map', mapLabel);
		marker.bindTo('position', mapLabel);
		markersArray.push(marker);
		// set bubble layer
		contentString = '<h2>' + title.split('@')[0] + '</h2>' + '<p>'
				+ contentString;
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(contentString);
			infowindow.open(map, marker);
			map.panTo(marker.getPosition());
			map.setZoom(11);
		});
	},
	addpointMarker : function(  location, title,markersArray, image,size) {
		if (null != image) {
			var myIcon = new google.maps.MarkerImage(image, null, null, null, size);
		} 
		var marker = new google.maps.Marker( {
			position : location,
			map : map,
			title : title,
			icon : myIcon, 
		});
		var mapLabel = new MapLabel( {
			text : title,
			position : location,
			map : map,
			fontSize : 12,
			align : 'center'
		});
		mapLabel.set('position', location);
		marker.bindTo('map', mapLabel);
		marker.bindTo('position', mapLabel);
		markersArray.push(marker);
		// set bubble layer
		 if(markersArray==qjdw)
		 {
			 google.maps.event.addListener(marker, 'click', function() {
			   $("#qjwindow").html(
				  "<iframe src='360/index.html'  style= 'border: 0px;width:500px;height:430px;' />" );
		    });
		 }

	},
	addtextMarker : function(location, title,fontSize, markersArray) {
		var marker = new google.maps.Marker( {
//			position : location,
//			map : map,
//			title : title,
			zIndex:100000000000,
			icon : '...png',
		});
		var mapLabel = new MapLabel( {
			text : title,
			position : location,
			map : map,
			zIndex:100000000000,
			fontSize : fontSize,
			align : 'center', 
		});
		mapLabel.set('fontFamily', 'helvetica');
		mapLabel.set('fontColor', '#FFFF00');
		mapLabel.set('position', location);
		mapLabel.set('strokeColor', null);
		marker.bindTo('map', mapLabel);
		marker.bindTo('position', mapLabel);
		markersArray.push(marker);
	},
	
	
	// Removes the overlays from the map, but keeps them in the array
	clearOverlays : function(markersArray) {
		if (markersArray) {
			for (i in markersArray) {
				if(!markersArray.hasOwnProperty(i)){continue;}
				markersArray[i].setMap(null);
			}
			markersArray = [];
		}
	},
	clearbermudaTriangle : function(bermudaTriangle) {
		if (bermudaTriangle) {
				bermudaTriangle.setMap(null);
		}
	},
	// Shows any overlays currently in the array
	showOverlays : function(markersArray) {
		if (markersArray) {
			for (i in markersArray) {
				if(!markersArray.hasOwnProperty(i)){continue;}
				markersArray[i].setMap(map);
			}
		}
	},
	// Deletes all markers in the array by removing references to them
	deleteOverlays : function(markersArray) {
		if (markersArray) {
			for (i in markersArray) {
				if(!markersArray.hasOwnProperty(i)){continue;}
				markersArray[i].setMap(null);
			}
			markersArray.length = 0;
		}
	}
}

export function addOverlay(theme) {
	var hMap = new MCustomTileLayer(map, theme,'http://122.227.239.195/GmapServer/zgz/','.png');
	//	var oDiv = document.getElementById('controlsDiv');
	var tlcOptions
= {
//		parent : oDiv,
		overlay : hMap,
//		caption : theme.toUpperCase()
	}
	var tlc = new MTileLayerControl(tlcOptions);

}

/*
 * 在图上添加标签
 * @param {Object} location
 * @param {Object} title
 * @param {Object} contentString
 * @param {Object} markersArray
 * @param {Object} image
 * @param {Object} color
 * @param {Object} stcd
 * @param {Object} stnm
 * @param {Object} type
 */
export function addMarkerWithColor(location, title, contentString, markersArray, image, color,stcd,stnm,type,size) {
		
		if (null != image) {
			var myIcon = new google.maps.MarkerImage(image, null, null, null, size);
		} 
		if (null == color) {
			color = '#ffffff';
		} 
		var marker = new google.maps.Marker( {
			position : location,
			map : map,
			title : title,
			icon : myIcon, 
		});
		var mapLabel = new MapLabel( {
			text : title,
			position : location,
			map : map,
			fontSize : 17,
			align : 'center'
		});
		mapLabel.set('fontFamily', 'helvetica');
		mapLabel.set('fontColor', '#FFFFFF');
		mapLabel.set('strokeColor', null);
//		mapLabel.set('strokeColor', color);
		mapLabel.set('position', location);
		marker.bindTo('map', mapLabel);
		marker.bindTo('position', mapLabel);
		markersArray.push(marker);
		 
		if(type!=""){
			google.maps.event.addListener(marker, 'click', function() { 
				infowindow.setContent("<iframe src='chart.html?stcd="+stcd+"&type="+type+"' class='infowindow' style= 'border: 0px;' />");
				 infowindow.open(map, marker);
				 map.panTo(marker.getPosition());   
				
			}); 
		} 
 
    }
    
export default GoogleMap