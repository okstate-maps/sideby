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

     



window.LayersInfo =  //leave this line and 
[
  // {
  //   "type": "EsriTiledMapLayer",
  //   "url": "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/Earth_at_Night_WM/MapServer",
  //   "display_name": "Esri Tiled Map Layer Example",
  //   "id": "IF9yOWga",
  //   "thumbnail_file": "night.jpg",
  //   "maxZoom": 20,
  //   "isToggledOn": false
  // },
  // {
  //   "type": "WMSTileLayer",
  //   "layers": "neir2009",
  //   "url": "https://imageserver.gisdata.mn.gov/cgi-bin/wmsll?",
  //   "display_name": "WMS",
  //   "thumbnail_file": "wms.jpg",
  //   "startBounds": "-92.386068,47.945484,-92.037252,48.105296"
  // },
  // {
  //   "type": "EsriImageLayer",
  //   "url": "https://lcgis.linncounty.org/ags/rest/services/PublicImagery/img1930/ImageServer",
  //   "display_name": "Esri Image Layer",
  //   "thumbnail_file": "esri_image.jpg",
  //   "startBounds": "-91.820375,41.975089,-91.471559,42.152487"
  // },
  {
    "type": "TileLayer",
    "url": "https://mapwarper.net/maps/tile/25235/{z}/{x}/{y}.png",
    "display_name": "1848",
    "thumbnail_file": "ca1848.png",
    "id": "4supxIrT",
    "maxZoom": 20,
    "startBounds": "-124.48,32.53,-114.13,42.01"
  },     {
    "type": "TileLayer",
    "url": "https://maps.georeferencer.com/georeferences/fc2c5f79-1425-5214-b72e-fca67fc2ce60/2017-11-21T05:53:37.327214Z/map/{z}/{x}/{y}.png?key=21DX4X7GGxkEH7Fmp5Uj",
    "display_name": "1853",
    "thumbnail_file": "ca1853.jpg",
    "id": "4supxIrT",
    "maxZoom": 20,
    "startBounds": "-124.48,32.53,-114.13,42.01"
  },    
  {
    "type": "TileLayer",
    "url": "https://maps.georeferencer.com/georeferences/1355d29a-1ae0-52f1-904a-ad7d95d810e6/2017-02-20T14:25:19.132722Z/map/{z}/{x}/{y}.png?key=21DX4X7GGxkEH7Fmp5Uj",
    "display_name": "1885",
    "thumbnail_file": "ca1885.jpg",
    "id": "4supxIrT",
    "maxZoom": 20
  },  

  {
    "type": "TileLayer",
    "url": "https://maps.georeferencer.com/georeferences/8c8f9ae8-24e9-5fa8-82df-e96e6bbb2f5c/2020-01-08T13:32:16.959259Z/map/{z}/{x}/{y}.png?key=21DX4X7GGxkEH7Fmp5Uj",
    "display_name": "1917",
    "thumbnail_file": "ca1917.jpg",
    "id": "4supxIrT",
    "maxZoom": 20
  },  
  {
    "type": "TileLayer",
    "url": "https://mapwarper.net/maps/tile/34086/{z}/{x}/{y}.png",
    "display_name": "1920",
    "thumbnail_file": "ca1920.png",
    "id": "4supxIrT",
    "maxZoom": 20
  },

  {
    "type": "TileLayer",
    "url": "https://maps.georeferencer.com/georeferences/be192d2d-7790-52eb-9e43-72f473aab06b/2014-11-02T00:01:59.549700Z/map/{z}/{x}/{y}.png?key=21DX4X7GGxkEH7Fmp5Uj",
    "display_name": "1962",
    "thumbnail_file": "ca1962.jpg",
    "id": "4supxIrT",
    "maxZoom": 20
  } 

  
  // {
  //   "type": "TileLayer",
  //   "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
  //   "display_name": "XYZ (from MapWarper)",
  //   "thumbnail_file": "mapwarper_34156.JPG",
  //   "startBounds": "-127.5,23.3,-64.1,51.4",
  //   "id": "4supxIrT",
  //   "maxZoom": 20
  // },
  // {
  //   "type": "WMTSTileLayer",
  //   "url": "https://maps.nyc.gov/wmts/1.0.0/",
  //   "layer": "basemap",
  //   "thumbnail_file": "nyc.jpg",
  //   "display_name": "WMTS Example (NYC)",
  //   "tilematrixSet": "EPSG:900913",
  //   "startBounds": "-74.447928,40.442617,-73.512717,40.988043",
  //   "format": "image/jpeg"
  //   },
  //   {
  //   "type": "WMTSTileLayer",
  //   "url": "https://sampleserver6.arcgisonline.com/arcgis/rest/services/WorldTimeZones/MapServer/WMTS/",
  //   "display_name": "WMTS (from ArcGIS) ",
  //   "tilematrixSet": "default028mm",
  //   "thumbnail_file": "wmts_arcgis.jpg",
  //   "format": "image/png",
  //   "style": "default"
  //   }
]


// [

//   {
//     "type": "TileLayer",
//     "display_name": "USA",
//     "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
//     "thumbnail_file": "mapwarper_34156.JPG",
//     "startBounds": "-127.5,23.3,-64.1,51.4",
//     "isToggledOn": false,
//     "id": "Q_bpDdmL"
//   },
//   {
//     "url": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer",
//     "type": "EsriTiledMapLayer",
//     "display_name": "Base Map",
//     "thumbnail_file": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/info/thumbnail",
//     "isToggledOn": false,
//     "id": "rbJDITOUM"
//   },
//   {
//     "type": "EsriTiledMapLayer",
//     "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/24e82d4524a6475d8787e3b9783b494c/info/thumbnail/thumbnail1553624734746.png",
//     "display_name": "oksm SS 4959 p807c",
//     "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_4959_p807c/MapServer",
//     "isToggledOn": false,
//     "id": "r_JNNVzI0"
//   },
//   {
//     "type": "TileLayer",
//     "display_name": "Orange",
//     "thumbnail_file": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/static/-97,38,2,0,0/300x200@2x?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
//     "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token={access_token}",
//     "access_token": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
//     "isToggledOn": false,
//     "id": "2j-b7y3b6"
//   },
//   {
//     "type": "EsriTiledMapLayer",
//     "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/cec6db40a19b48cf92e895a78e466230/info/thumbnail/thumbnail1553625137428.png",
//     "display_name": "oksm SS 6243 p1005 1",
//     "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_6243_p1005_1/MapServer",
//     "isToggledOn": false,
//     "id": "5Y1t1qmjr"
//   },
//   {
//     "type": "TileLayer",
//     "display_name": "NLS",
//     "url": "https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg",
//     "subdomains": "123",
//     "thumbnail_file": "nls.JPG",
//     "startBounds": "-12.41,48.01,4.51,60.84",
//     "isToggledOn": false,
//     "id": "Shsd9jfLp"
//   },
//   {
//     "type": "TileLayer",
//     "display_name": "OS",
//     "url": "https://geo.nls.uk/maps/os/1inch_2nd_ed/{z}/{x}/{y}.png",
//     "thumbnail_file": "os.JPG",
//     "startBounds": "-12.41,48.01,4.51,60.84",
//     "isToggledOn": false,
//     "id": "IZZ8Ko1t6"
//   },
//   {
//     "type": "TileLayer",
//     "display_name": "NYC 2018",
//     "url": "https://maps.nyc.gov/tms/1.0.0/photo/2018/{z}/{x}/{y}.png8",
//     "startBounds": "-74.447928,40.442617,-73.512717,40.988043",
//     "tms": true,
//     "isToggledOn": false,
//     "id": "ur6qiWKNm"
//   },
//   {
//     "type": "TileLayer",
//     "display_name": "NYC 1924",
//     "url": "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8",
//     "startBounds": "-74.447928,40.442617,-73.512717,40.988043",
//     "isToggledOn": false,
//     "id": "mu5KTMhmz"
//   },
//   {
//     "type": "EsriDynamicMapLayer",
//     "display_name": "Hennepin 2015",
//     "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_2015/MapServer",
//     "startBounds": "-93.770195,44.78738,-93.176871,45.246598",
//     "isToggledOn": false,
//     "id": "9ie-1CNMc"
//   },
//   {
//     "type": "EsriDynamicMapLayer",
//     "display_name": "Hennepin 1940",
//     "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1940/MapServer",
//     "startBounds": "-93.770195,44.78738,-93.176871,45.246598",
//     "isToggledOn": false,
//     "id": "GiQlHxMAS"
//   }
// ]
