  // You can define layers that will be displayed on each map 
  // by default using the defaultOverlays option.
  
  window.sideby.OverlaysInfo = [ 

  /*
    EsriFeatureLayer example
  */
    // {
    //   "url": "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_States_Generalized/FeatureServer/0",
    //   "type": "EsriFeatureLayer",
    //   "style": function(){ // you can use style options from https://leafletjs.com/reference-1.5.0.html#path-option 
    //     return {
    //       "fill": false, 
    //       "color": "#fafafa", 
    //       "weight": 1
    //     }
    //   },
    //   "id": "stateoutlinesoverlay",
    //   "display_name": "EsriFeatureLayer (USA State Outlines)", // this appears in the manage overlays pop up
    //   "interactive": false // prevent the layer from seeming "clickable"
    // },

    /*
      WMS example layer from Geoserver
    */
    // {
    //   "url": "http://ogi.state.ok.us/geoserver/wms?",
    //   "type": "WMSTileLayer",
    //   "format": "image/png8",
    //   "transparent": "true",
    //   "layers": "ogi:ok_counties",
    //   "display_name": "WMSTileLayer (Oklahoma Counties)",
    //   "id": "ogi:ok_counties"
    // },

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

  ]
