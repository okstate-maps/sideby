window.Config = {

  // The maximum number of layers that can be displayed at a time. 
  // Pick a number from From 1 - 8, though why would you want 1?
  "maxLayers": 4, 

  // Customize the warning message when a user attempts to select more than the maxLayers value above.
  // While it can be changed, you need to leave {maxLayers} in there somewhere.
  "maxLayersWarning": "Only {maxLayers} layers can be selected at once. Please deselect some in order to select new ones.",
  
  // The title and main header of the site.
  "siteTitle": "Sideby: for comparing stuff",

  // The text that appears in the center of the screen when no layers are turned on.
  "welcomeText": "Sideby is an application for comparing spatial data layers side by side (by side by side by side, etc.). Try clicking/tapping the layers below, or try adding your own by clicking the + at the end of the list.",
  
  //The text displayed in the search box before.
  "geocoderSearchPlaceholderText": "Search for a place...",
  
  // You can define layers that will be displayed on each map 
  // by default using the defaultOverlays option.
  "defaultOverlays": [

  /*
    EsriFeatureLayer example
  */
    {
      "url": "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0",
      "type": "EsriFeatureLayer",
      "style": function(){ // you can use style options from https://leafletjs.com/reference-1.5.0.html#path-option 
        return {
          "fill": false, 
          "color": "#fafafa", 
          "weight": 1
        }
      },
      "id": "stateoutlinesoverlay",
      "display_name": "EsriFeatureLayer (USA State Outlines)", // this appears in the manage overlays pop up
      "interactive": false // prevent the layer from seeming "clickable"
    },

    /*
      WMS example layer from Geoserver
    */
    {
      "url": "http://ogi.state.ok.us/geoserver/wms?",
      "type": "WMSTileLayer",
      "format": "image/png8",
      "transparent": "true",
      "layers": "ogi:ok_counties",
      "display_name": "WMSTileLayer (Oklahoma Counties)",
      "id": "ogi:ok_counties"
    },

    /*
      Example of WFS layer via Geoserver 
    */

    // {
    //   "url": "https://sedac.ciesin.columbia.edu/geoserver/ows",
    //   "type": "WFSLayer",
    //   "typeNS": "superfund",
    //   "typeName": "superfund-atsdr-hazardous-waste-site-v2",
    //   "id": "superfund-atsdr-hazardous-waste-site-v2",
    //   "geometryField": "the_geom",
    //   "fillOpacity": 0.8,
    //   "display_name": "WFSLayer (superfund sites)",
    //   "style": {
    //         color: 'orange',
    //         weight: 1
    //    },
    //   "maxFeatures": 300
    // },


    /*
      Example of WFS layer via ArcGIS WFSServer. Note the most important difference is the arcgis: true flag.
      The flag is needed because the ArcGIS implementation of WFS swaps coordinates (or they're the ones doing
      it right. I'm not sure. I spent too much time getting this to work to leave it out now!)
    */

    // {
    //   "url": "https://geodata.md.gov/imap/services/Transportation/MD_RoadCenterlines/MapServer/WFSServer",
    //   "type": "WFSLayer",
    //   "arcgis": true,
    //   "typeNS": "Transportation_MD_RoadCenterlines",
    //   "typeName": "Interstates",
    //   "geometryField": "GIS_Shape",
    //   "id": "MDOT_SHA_Maintenance_Shop_Facilities",
    //   "version": "1.1.0",
    //   "namespaceUri": "https://localhost:6443/arcgis/services/Transportation/MD_RoadCenterlines/MapServer/WFSServer",
    //   "maxFeatures": 1,
    //   "style": function(){ return {
    //         weight: 1,
    //         color: "tomato"
    //   }
    //    }
    // },


    /*
      These WFS layers from ArcGIS Online don't work, as the namespace URI swaps the ID string and /arcgis/services/ pieces of the 
      URL in the GetFeature request for some reason. 
    */

    //  {
    //   "url": "https://dservices1.arcgis.com/jWQlP64OuwDh6GGX/arcgis/services/current_footprints_16Jul2019/WFSServer",
    //   "type": "WFSLayer",
    //   "arcgis": true,
    //   "typeNSName": "current_footprints_16Jul2019",
    //   "typeNS": "current_footprints_16Jul2019",
    //   "typeName": "current_footprints_16Jul2019",
    //   "id": "current_footprints_16Jul2019",
    //   "version": "1.1.0",
    //   "style": function(){ return {
    //         weight: 2,
    //         color: "orange"
    //   }
    //    }
    // },

    // {
    //   "url": "https://dservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/services/JapanPrefectures2018/WFSServer",
    //    "type": "WFSLayer",
    //     "arcgis": true,
    //   "typeName": "JapanPrefectures2018",
    //   "typeNameNS": "JapanPrefectures2018",
    //   "id": "japan",
    //   "version": "1.1.0"
    // }

  ],

  //"defaultOverlays":[],
  "mapboxToken": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",//replace with your own
  "labelLayerUrl": "https://api.mapbox.com/styles/v1/krdyke/cjf9wgvwg0zlh2rmo4jx9jcec/tiles/256/{z}/{x}/{y}?access_token=",//replace with your own label layer if you'd like
  "mapDefaultZoom": 3, //lower = more zoomed out
  "mapMinZoom": 3, //lower = more zoomed out
  "mapDefaultCenter": [20,-50] //latitude,longitude
};