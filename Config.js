window.sideby.Config = {


  //Google Analytics Tracking ID
  "gaTrackingId": "UA-88563800-4",

  // The maximum number of layers that can be displayed at a time. 
  // Pick a number from From 1 - 9, though why would you want 1?
  "maxLayers": 9, 

  // Customize the warning message when a user attempts to select more than the maxLayers value above.
  // While it can be changed, you need to leave {maxLayers} in there somewhere.
  "maxLayersWarning": "Only {maxLayers} layers can be selected at once. Please deselect some in order to select new ones.",
  
  // The title and main header of the site.
  "siteTitle": "Sideby: for comparing stuff",

  // The text that appears in the center of the screen when no layers are turned on.
  "welcomeText": "Sideby is an application for comparing spatial data layers side by side (by side by side by side, etc.). Try clicking/tapping the layers below, or try adding your own by clicking the + at the end of the list.",
  
  //The text displayed in the search box before.
  "geocoderSearchPlaceholderText": "Search for a place...",
  
  "mapboxToken": "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg",//replace with your own
  "esriAPIKey": "AAPK7f7338ef408f47029a5a7bb1560ef7f7kBpJhlfXEbyJPtP6RI1dn4jk3p2fitP5kVOC0733r85Cbf_FNjJebmr8XvtubbfZ",
  "labelLayerUrl": "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",//replace with your own label layer if you'd like
  
  "mapDefaultZoom": 3, //lower = more zoomed out
  
  "mapMinZoom": 3, //lower = more zoomed out
  
  "mapDefaultCenter": [20,-50], //latitude,longitude
  
  //theming options
  "themeHeaderColor": "#222",
  "themeHeaderFontFamily": '"Montserrat", "sans-serif"',
  "themeScrollButtonHoverColor": "rgb(208, 208, 208)",
  "themeScrollButtonColor": "rgb(228, 228, 228)",
  "themeBackgroundColor": "rgb(215, 215, 215)"
};