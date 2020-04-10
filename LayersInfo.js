/*

Each layer has the following values:

	type {string}: Required. The Leaflet layer type. Values can be WMSTileLayer, EsriTiledMapLayer, EsriDynamicMapLayer, TileLayer, and others.
		See Leaflet documentation for others. Esri Leaflet has more also, but they need porting to leaflet-react.
	display_name {string}: Required. What you want to be displayed over the layer's selection tile. Keep it short!
	url {string}: Required. The url to the service.
  thumbnail_file {string}: Optional. Strongly encouraged. You can either reference the name of a file stored locally in public/assets/images or provide the full url to a thumbnail stored elsewhere. For example, IIIF links work very nicely if available.
  startBounds {string}: Optional. In addition to setting the default map bounds in Config.js, you can also provide them on a layer basis. The format is sw longitude, sw latitude, ne longitude, ne latitude. Klokan's Bounding Box tool's CSV provides this format. !Note! the startBounds is only used when the layer is the first one turned on.

You can also supply options that are specific to the type of layer. For some layers there are additional required fields. For example, for a WMS layer, you must provide a "layers" parameter specifying which layers to use in a comma separated list like 'layer1,layer2'.

See the documentation for each layer for other options.
https://leafletjs.com/reference-1.5.0.html
http://esri.github.io/esri-leaflet/api-reference/

Note: Layers need to be capable of serving in Web Mercator (EPSG: 3857). For Esri services, if a tiled service is not served in 3857, you can oftentimes use the same service as a dynamic layer, which will reproject the layer into 3857 on the fly.

*/  

window.sideby.LayersInfo =  //leave this line and 
[
  {
    "type": "EsriTiledMapLayer",
    "url": "https://wtb.maptiles.arcgis.com/arcgis/rest/services/World_Topo_Base/MapServer",
    "display_name": "Esri Tiled Map Layer",
    "thumbnail_file": "https://www.arcgis.com/sharing/rest/content/items/3a75a3ee1d1040838f382cbefce99125/info/thumbnail/thumbnail1579117297320.jpeg",
    "id": "56jjzza1",
    "maxZoom": 20
  },

  {
    "type": "WMSTileLayer",
    "layers": "gpw-v3:gpw-v3-population-density_2000",
    "url": "https://sedac.ciesin.columbia.edu/geoserver/wms",
    "thumbnail_file": "wms2.JPG",
    "display_name": "WMS"
  },

  {
    "type": "EsriImageLayer",
    "url": "https://lcgis.linncounty.org/ags/rest/services/PublicImagery/img1930/ImageServer",
    "display_name": "Esri Image Layer",
    "thumbnail_file": "esri_image.jpg",
    "startBounds": "-91.820375,41.975089,-91.471559,42.152487"
  },

  {
    "type": "TileLayer",
    "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
    "display_name": "XYZ (from MapWarper)",
    "thumbnail_file": "mapwarper_34156.JPG",
    "startBounds": "-127.5,23.3,-64.1,51.4",
    "id": "4supxIrT",
    "maxZoom": 20
  },

  {
    "type": "WMTSTileLayer",
    "url": "https://maps.nyc.gov/wmts/1.0.0/",
    "layer": "basemap",
    "thumbnail_file": "nyc.jpg",
    "display_name": "WMTS Example (NYC)",
    "tilematrixSet": "EPSG:900913",
    "startBounds": "-74.447928,40.442617,-73.512717,40.988043",
    "format": "image/jpeg"
  }, 


  {
    "type": "WMTSTileLayer",
    "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/WMTS/",
    "display_name": "WMTS (from ArcGIS) ",
    "tilematrixSet": "default028mm",
    "thumbnail_file": "wmts_arcgis.jpg",
    "format": "image/png",
    "style": "default"
  },


  {
    "type": "TileLayer",
    "display_name": "USA",
    "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
    "thumbnail_file": "mapwarper_34156.JPG",
    "startBounds": "-127.5,23.3,-64.1,51.4",
    "isToggledOn": false,
    "id": "Q_bpDdmL"
  },
  {
    "url": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer",
    "type": "EsriTiledMapLayer",
    "display_name": "Base Map",
    "thumbnail_file": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/info/thumbnail",
    "isToggledOn": false,
    "id": "rbJDITOUM"
  },
  {
    "type": "EsriTiledMapLayer",
    "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/24e82d4524a6475d8787e3b9783b494c/info/thumbnail/thumbnail1553624734746.png",
    "display_name": "oksm SS 4959 p807c",
    "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_4959_p807c/MapServer",
    "isToggledOn": false,
    "id": "r_JNNVzI0"
  },
  {
    "type": "TileLayer",
    "display_name": "Orange",
    "thumbnail_file": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/static/-97,38,2,0,0/300x200@2x?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
    "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token={access_token}",
    "access_token": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
    "isToggledOn": false,
    "id": "2j-b7y3b6"
  },
  {
    "type": "EsriTiledMapLayer",
    "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/cec6db40a19b48cf92e895a78e466230/info/thumbnail/thumbnail1553625137428.png",
    "display_name": "oksm SS 6243 p1005 1",
    "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_6243_p1005_1/MapServer",
    "isToggledOn": false,
    "id": "5Y1t1qmjr"
  },
  {
    "type": "TileLayer",
    "display_name": "NLS",
    "url": "https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg",
    "subdomains": "123",
    "thumbnail_file": "nls.JPG",
    "startBounds": "-12.41,48.01,4.51,60.84",
    "isToggledOn": false,
    "id": "Shsd9jfLp"
  },
  {
    "type": "TileLayer",
    "display_name": "OS",
    "url": "https://geo.nls.uk/maps/os/1inch_2nd_ed/{z}/{x}/{y}.png",
    "thumbnail_file": "os.JPG",
    "startBounds": "-12.41,48.01,4.51,60.84",
    "isToggledOn": false,
    "id": "IZZ8Ko1t6"
  },
  {
    "type": "TileLayer",
    "display_name": "NYC 2018",
    "url": "https://maps.nyc.gov/tms/1.0.0/photo/2018/{z}/{x}/{y}.png8",
    "startBounds": "-74.447928,40.442617,-73.512717,40.988043",
    "tms": true,
    "isToggledOn": false,
    "id": "ur6qiWKNm"
  },
  {
    "type": "TileLayer",
    "display_name": "NYC 1924",
    "url": "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8",
    "startBounds": "-74.447928,40.442617,-73.512717,40.988043",
    "isToggledOn": false,
    "id": "mu5KTMhmz"
  },
  {
    "type": "EsriDynamicMapLayer",
    "display_name": "Hennepin 2015",
    "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_2015/MapServer",
    "startBounds": "-93.770195,44.78738,-93.176871,45.246598",
    "isToggledOn": false,
    "id": "9ie-1CNMc"
  },
  {
    "type": "EsriDynamicMapLayer",
    "display_name": "Hennepin 1940",
    "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1940/MapServer",
    "startBounds": "-93.770195,44.78738,-93.176871,45.246598",
    "isToggledOn": false,
    "id": "GiQlHxMAS"
  }
]
