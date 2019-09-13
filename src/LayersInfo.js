/*

Each layer has the following values:

	type {string}: Required. The Leaflet layer type. Values can be WMSTileLayer, EsriTiledMapLayer, EsriDynamicMapLayer, TileLayer, and others.
		See Leaflet documentation for others. Esri Leaflet has more also, but they need porting to leaflet-react.
	display_name {string}: Required. What you want to be displayed over the layer's selection tile. Keep it short!
	url {string}: Required. The url to the service.
  thumbnail_file {string}: Optional. Strongly encouraged. You can either reference the name of a file stored locally in public/assets/images or provide the full url to a thumbnail stored elsewhere. For example, IIIF links work very nicely if available.
  startBounds {string}: Optional. In addition to setting the default map bounds in Config.js, you can also provide them on a layer basis. !Note! the startBounds is only used when the layer is the first one turned on.

You can also supply options that are specific to the type of layer. For some layers there are additional required fields. For example, for a WMS layer, you must provide a "layers" parameter specifying which layers to use in a comma separated list like 'layer1,layer2'.

See the documentation for each layer for other options.
https://leafletjs.com/reference-1.5.0.html
http://esri.github.io/esri-leaflet/api-reference/

*/
module.exports = [
      {
        "type": "TileLayer",
        "display_name": "USA",
        "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
        "thumbnail_file": "mapwarper_34156.JPG",
        "startBounds": "-127.5,23.3,-64.1,51.4"
      },  

      {
        "url":"https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer",
        "type":"EsriTiledMapLayer",
        "display_name": "Base Map",
        "thumbnail_file": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/info/thumbnail"
      },

      {
        "type": "EsriTiledMapLayer",
        "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/24e82d4524a6475d8787e3b9783b494c/info/thumbnail/thumbnail1553624734746.png",
        "display_name": "oksm SS 4959 p807c",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_4959_p807c/MapServer"
      },
      {
        "type": "TileLayer",
        "display_name": "Orange",
        "thumbnail_file": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/static/-97,38,2,0,0/300x200@2x?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
        "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg"
      },
      {
        "type": "EsriTiledMapLayer",
        "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/cec6db40a19b48cf92e895a78e466230/info/thumbnail/thumbnail1553625137428.png",
        "display_name": "oksm SS 6243 p1005 1",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_6243_p1005_1/MapServer"
      },
      {
        "type": "TileLayer",
        "display_name": "NLS",
        "url": "https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg",
        "subdomains": "123",
        "thumbnail_file": "nls.jpg",
        "startBounds": "-12.41,48.01,4.51,60.84"

      },
      {
        "type": "TileLayer",
        "display_name": "OS",
        "url": "https://geo.nls.uk/maps/os/1inch_2nd_ed/{z}/{x}/{y}.png",
        "thumbnail_file": "os.jpg",
        "startBounds": "-12.41,48.01,4.51,60.84"
      },
      {
        "type": "TileLayer",
        "display_name": "NYC 2018",
        "url": "https://maps.nyc.gov/xyz/1.0.0/photo/2018/{z}/{x}/{y}.png8",
        "startBounds": "-74.447928,40.442617,-73.512717,40.988043"
      },
      {
        "type": "TileLayer",
        "display_name": "NYC 2016",
        "url": "https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8",
        "startBounds": "-74.447928,40.442617,-73.512717,40.988043"
      },
      {
        "type": "TileLayer",
        "display_name": "NYC 2014",
        "url": "https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8",
        "startBounds": "-74.447928,40.442617,-73.512717,40.988043"
      },
      {
        "type": "TileLayer",
        "display_name": "NYC 2012",
        "url": "https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8",
        "startBounds": "-74.447928,40.442617,-73.512717,40.988043"
      },
      {
        "type": "TileLayer",
        "display_name": "NYC 1951",
        "url": "https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8",
        "startBounds": "-74.447928,40.442617,-73.512717,40.988043"
      },
      {
        "type": "TileLayer",
        "display_name": "NYC 1924",
        "url": "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8",
        "startBounds": "-74.447928,40.442617,-73.512717,40.988043"
      },

      {
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 2015",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_2015/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 2005",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_2005/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 2000",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_2000/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 1988",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1988/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 1969",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1969/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 1957",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1957/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 1953",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1953/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },{
        "type": "EsriDynamicMapLayer",
        "display_name": "Hennepin 1940",
        "url": "https://gis.hennepin.us/arcgis/rest/services/Imagery/UTM_Aerial_1940/MapServer",
        "startBounds": "-93.770195,44.78738,-93.176871,45.246598"
      },




      

];