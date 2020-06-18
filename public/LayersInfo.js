/*

Each layer has the following values:

	layer_type {string}: Required. The Leaflet layer type. Values can be WMSTileLayer, EsriTiledMapLayer, EsriDynamicMapLayer, TileLayer, and others.
		See Leaflet documentation for others. Esri Leaflet has more also, but they need porting to leaflet-react.
	display_name {string}: Required. What you want to be displayed over the layer's selection tile. Keep it short!
	url {string}: Required. The url to the service.
  thumbnail_path {string}: Optional. Strongly encouraged. You can either reference the name of a file stored locally in public/assets/images or provide the full url to a thumbnail stored elsewhere. For example, IIIF links work very nicely if available.
  start_bounds {string}: Optional. In addition to setting the default map bounds in Config.js, you can also provide them on a layer basis. The format is sw longitude, sw latitude, ne longitude, ne latitude. Klokan's Bounding Box tool's CSV provides this format. !Note! the start_bounds is only used when the layer is the first one turned on.

You can also supply options that are specific to the type of layer. For some layers there are additional required fields. For example, for a WMS layer, you must provide a "layers" parameter specifying which layers to use in a comma separated list like 'layer1,layer2'.

See the documentation for each layer for other options.
https://leafletjs.com/reference-1.5.0.html
http://esri.github.io/esri-leaflet/api-reference/

Note: Layers need to be capable of serving in Web Mercator (EPSG: 3857). For Esri services, if a tiled service is not served in 3857, you can oftentimes use the same service as a dynamic layer, which will reproject the layer into 3857 on the fly.

*/  

 
window.sideby.LayersInfo =  //leave this line and 
[
  {
    "layer_type": "TileLayer",
    "url": "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token={access_token}",
    "display_name": "Mapbox Satellite",
    "access_token": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
    "thumbnail_path": "mapbox_satellite.jpg"
  },
  {
    "layer_type": "WMSTileLayer",
    "layers": "gpw-v3:gpw-v3-population-density_2000",
    "url": "https://sedac.ciesin.columbia.edu/geoserver/wms",
    "thumbnail_path": "wms2.JPG",
    "display_name": "WMS Layer"
  },

  {
    "layer_type": "EsriImageLayer",
    "url": "https://landsat.arcgis.com/arcgis/rest/services/Landsat/PS/ImageServer",
    "display_name": "Esri Image Layer (Landsat)",
    "thumbnail_path": "landsat.jpg"
  },

  {
    "layer_type": "WMTSTileLayer",
    "url": "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi",
    "layer": "BlueMarble_ShadedRelief_Bathymetry",
    "thumbnail_path": "wmts.jpg",
    "display_name": "WMTS Example (Blue Marble)",
    "tilematrixSet": "GoogleMapsCompatible_Level8",
    //"start_bounds": "-74.447928,40.442617,-73.512717,40.988043",
    "format": "image/jpeg"
  }, 

  {
    "layer_type": "WMTSTileLayer",
    "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/WMTS/",
    "display_name": "WMTS Layer (from ArcGIS)",
    "layers": "WorldTimeZones",
    "tilematrixSet": "default028mm",
    "thumbnail_path": "wmts_arcgis.jpg",
    "format": "image/png",
    "style": "default"
  }
  // {
  //   "layer_type": "EsriTiledMapLayer",
  //   "url": "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer",
  //   "display_name": "Esri Tiled Map Layer",
  //   //"thumbnail_path": "http://www.arcgis.com/sharing/rest/content/items/30e5fe3149c34df1ba922e6f5bbf808f/info/thumbnail/thumbnail1581038983201.jpeg",
  //   "id": "56jjzza1",
  //   "maxZoom": 20
  // },

  // {
  //   "layer_type": "EsriImageLayer",
  //   "url": "https://lcgis.linncounty.org/ags/rest/services/PublicImagery/img1930/ImageServer",
  //   "display_name": "Esri Image Layer",
  //   //"thumbnail_path": "esri_image.jpg",
  //   "start_bounds": "-91.820375,41.975089,-91.471559,42.152487"
  // },

  // {
  //   "layer_type": "TileLayer",
  //   "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
  //   "display_name": "XYZ (from MapWarper)",
  //   "thumbnail_path": "mapwarper_34156.JPG",
  //https://mapwarper.net/uploads/34156/thumb/0776002.png
  //   "start_bounds": "-127.5,23.3,-64.1,51.4",
  //   "id": "4supxIrT",
  //   "maxZoom": 20
  // },

  // {
  //   "layer_type": "WMTSTileLayer",
  //   "url": "https://maps.nyc.gov/wmts/1.0.0/",
  //   "layer": "basemap",
  //   "thumbnail_path": "nyc.jpg",
  //   "display_name": "WMTS Example (NYC)",
  //   "tilematrixSet": "EPSG:900913",
  //   "start_bounds": "-74.447928,40.442617,-73.512717,40.988043",
  //   "format": "image/jpeg"
  // }, 



  // {
  //   "layer_type": "TileLayer",
  //   "display_name": "USA",
  //   "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
  //   "thumbnail_path": "mapwarper_34156.JPG",
  //   "start_bounds": "-127.5,23.3,-64.1,51.4",
  //   "isToggledOn": false,
  //   "id": "Q_bpDdmL"
  // },
  
  // {
  //   "url": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer",
  //   "layer_type": "EsriTiledMapLayer",
  //   "display_name": "Base Map",
  //   //"thumbnail_path": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/info/thumbnail",
  //   "isToggledOn": false,
  //   "id": "rbJDITOUM"
  // },
  //{
  //   "layer_type": "EsriTiledMapLayer",
  //   "thumbnail_path": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/24e82d4524a6475d8787e3b9783b494c/info/thumbnail/thumbnail1553624734746.png",
  //   "display_name": "oksm SS 4959 p807c",
  //   "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_4959_p807c/MapServer",
  //   "isToggledOn": false,
  //   "id": "r_JNNVzI0"
  // },
  // {
  //   "layer_type": "TileLayer",
  //   "display_name": "Orange",
  //   "thumbnail_path": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/static/-97,38,2,0,0/300x200@2x?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
  //   "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token={access_token}",
  //   "access_token": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
  //   "isToggledOn": false,
  //   "id": "2j-b7y3b6"
  // },
  // {
  //   "layer_type": "EsriTiledMapLayer",
  //   "thumbnail_path": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/cec6db40a19b48cf92e895a78e466230/info/thumbnail/thumbnail1553625137428.png",
  //   "display_name": "oksm SS 6243 p1005 1",
  //   "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_6243_p1005_1/MapServer",
  //   "isToggledOn": false,
  //   "id": "5Y1t1qmjr"
  // },
  // {
  //   "layer_type": "TileLayer",
  //   "display_name": "NLS",
  //   "url": "https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg",
  //   "subdomains": "123",
  //   "thumbnail_path": "nls.JPG",
  //   "start_bounds": "-12.41,48.01,4.51,60.84",
  //   "isToggledOn": false,
  //   "id": "Shsd9jfLp"
  // },
  // {
  //   "layer_type": "TileLayer",
  //   "display_name": "OS",
  //   "url": "https://geo.nls.uk/maps/os/1inch_2nd_ed/{z}/{x}/{y}.png",
  //   "thumbnail_path": "os.JPG",
  //   "start_bounds": "-12.41,48.01,4.51,60.84",
  //   "isToggledOn": false,
  //   "id": "IZZ8Ko1t6"
  // },
  // {
  //   "layer_type": "TileLayer",
  //   "display_name": "NYC 2018",
  //   "url": "https://maps.nyc.gov/tms/1.0.0/photo/2018/{z}/{x}/{y}.png8",
  //   "start_bounds": "-74.447928,40.442617,-73.512717,40.988043",
  //   "tms": true,
  //   "isToggledOn": false,
  //   "id": "ur6qiWKNm"
  // },
  // {
  //   "layer_type": "TileLayer",
  //   "display_name": "NYC 1924",
  //   "url": "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8",
  //   "start_bounds": "-74.447928,40.442617,-73.512717,40.988043",
  //   "isToggledOn": false,
  //   "id": "mu5KTMhmz"
  // },

  //VectorGrid layer does not work well enough. There doesn't seem to be support
  //in leaflet for pulling styles via URL
  // {
  //   "layer_type": "VectorGrid",
  //   "type": "protobuf",
  //   "url": "https://{s}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
  //   "display_name": "Vector",
  //   "vectorTileLayerStyles": vectorTileStyling,
  //   "subdomains": 'abc'
  // },
  
]