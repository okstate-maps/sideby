module.exports = {
  "defaultOverlays": [{
    "url": "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0",
    "type": "EsriFeatureLayer",
    "style": function(){return {"fill": false, "color": "#fafafa", "weight": 1}},
    "id": "stateoutlinesoverlay",
    "display_name": "USA State Outlines",
    "interactive": false
  }],
  //"defaultOverlays":[],
  "mapboxToken": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",//replace with your own
  "labelLayerUrl": "https://api.mapbox.com/styles/v1/krdyke/cjf9wgvwg0zlh2rmo4jx9jcec/tiles/256/{z}/{x}/{y}?access_token=",
  "maxLayers": 8, //From 1 - 8, though why would you want 1?
  "maxLayersWarning": "Only {maxLayers} layers can be selected at once. Please deselect some in order to select new ones.",//Can be changed, but leave {maxLayers in there somewhere}
  "siteTitle": "Sideby: for comparing stuff",
  "welcomeText": "Sideby is an application for comparing spatial data layers side by side (by side by side by side, etc.). Try clicking/tapping the layers below, or try adding your own by clicking the + at the end of the list.",
  "mapMinZoom": 3,
  "mapDefaultZoom": 3,
  "mapDefaultCenter": [0,0],
  "geocoderSearchPlaceholderText": "Search for a place...",
  "tooltips": {
      "AddOverlayUrl": "Enter the URL to the layer you want to add here.",
      "AddOverlayTileLayer": "An XYZ style layer.<br/>For example https://maps.nyc.gov/xyz/1.0.0/carto/label/{z}/{x}/{y}.png8",
      "AddOverlayEsriFeatureLayer": "A vector layer coming from ArcGIS Online or ArcGIS Server.<br/>For example, https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0"
    
  }
};