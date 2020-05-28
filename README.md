# Installing pre-requisites
1. Install Git (via https://git-scm.com/downloads) and optionally GitHub (https://desktop.github.com).
2. Install Node.js (https://nodejs.org/)
3. Install Yarn (https://yarnpkg.com/docs/install)

# Installing and locally serving the app
1. Clone (https://github.com/okstate-maps/sideby.git) or fork the repo.
2. Open your command line application (**cmd** in Windows, **terminal** in Mac).
3. Enter the directory (`cd sideby` or whatever name of the directory you cloned into).
4. Run the install script using `yarn install`. This installs all of Sideby's dependencies and will take awhile.
4. Start the server using `yarn start`.
5. The app should automatically open in your default browser. You can also manually go to [`localhost:3000`](localhost:3000) in any other browser. Anytime you save a change, the app will reload automatically (some CSS changes require a manual refresh). `src/LayersInfo.js` contains the layer information. Check out the file for some explanation.

# Adjusting configuration using Config.js
Once you've cloned the repo, take a look at `public/Config.js`. 

Option             |  Description  |  Default (blank if none)
-------------------|---------------|-------------------------
`mapboxToken`      |  A token is required to use any [Mapbox](https://docs.mapbox.com/help/glossary/access-token) layer. You can register for an account and get one for free.  | 
`labelLayerUrl`    |  The URL for the label layer.  |  `https://api.mapbox.com/styles/v1/krdyke/cjf9wgvwg0zlh2rmo4jx9jcec/tiles/256/{z}/{x}/{y}?access_token=`
`maxLayers`        | The maximum number of layers that can be displayed at a time. Valid values from 1 - 9, though why would you want 1? | `9`
`maxLayersWarning` |  Customize the warning message when a user attempts to select more than the maxLayers value above. While it can be changed, you need to leave {maxLayers} in there somewhere. | `"Only {maxLayers} layers can be selected at once. Please deselect some in order to select new ones."`
`siteTitle`        | The title and main header of the site. | `"Sideby: for comparing stuff"`
`welcomeText`      | The text that appears in the center of the screen when no layers are turned on. | `"Sideby is an application for comparing spatial data layers side by side (by side by side by side, etc.). Try clicking/tapping the layers below, or try adding your own by clicking the + at the end of the list."`
`geocoderSearchPlaceholderText` | The text displayed in the search box before the user adds anything | `"Search for a place..."`
`mapDefaultZoom`   | Initial zoom level of the map. Pick a value between 1-20. Lower = more zoomed out. | `3`
`mapMinZoom`       | The lowest zoom level (most zoomed out) for the map. Pick a value between 1-20. | `3`
`mapDefaultCenter` | A latitude/longitude pair that the map will center on initially | `[20,-50]`
  
# LayersInfo.js
Alongside `Config.js` in the public folder you'll see another file called `LayersInfo.js`. This file contains the data used to create the different layer options that are displayed on the bottom view bar of Sideby. By combining the use of Add Layer Item and Export Layers, you can save yourself some tedium.

## Coming soon
More on adding layers.
