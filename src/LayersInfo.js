/*

Each layer has the following required values:

	sortVal {numeric}: value to be used to determine the value used for sort order.
	type {string}: The Leaflet layer type. Values can be WMSTileLayer, EsriTiledMapLayer, EsriDynamicMapLayer, TileLayer, and others.
		See Leaflet documentation for others. Esri Leaflet has more also, but they need porting to leaflet-react.
	id {string}: A unique identifier used to keep React happy.
	display_name {string}: What you want to be displayed over the layer's selection tile. Keep it short!
	url {string}: The url to the service

*/
module.exports = [
      {
        "type": "TileLayer",
        "id": "usa4",
        "display_name": "USA 4",
        "url": "https://mapwarper.net/maps/tile/34156/{z}/{x}/{y}.png",
        "thumbnail_file": "mapwarper_34156.JPG"
      },  

      {
        "url":"https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer",
        "type":"EsriTiledMapLayer",
        "id":"USGSImageryOnly",
        "display_name": "Base Map",
        "thumbnail_file": "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/info/thumbnail"
      },

      {
        "type": "TileLayer",
        "id": "osuOrange",
        "display_name": "Orange",
        "thumbnail_file": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/static/-97,38,2,0,0/300x200@2x?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",
        "url": "https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg"
      },
      {
        "type": "EsriTiledMapLayer",
        "id": "Oksm_SS_889_March_31__1852",
        "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/c78001a459504577ae63121b5ea5e3f7/info/thumbnail/thumbnail1554128621089.png",
        "display_name": "oksm SS 889 March 31 1852",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_889_March_31__1852/MapServer"
      },

      {
        "type": "EsriTiledMapLayer",
        "id": "24e82d4524a6475d8787e3b9783b494c",
        "thumbnail_file": "https://osu-geog.maps.arcgis.com/sharing/rest/content/items/24e82d4524a6475d8787e3b9783b494c/info/thumbnail/thumbnail1553624734746.png",
        "display_name": "oksm_SS_4959_p807c",
        "url": "https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/oksm_SS_4959_p807c/MapServer"
      }



      

];