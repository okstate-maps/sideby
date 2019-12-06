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

## Coming soon
A detailed description of configuration options.

# LayersInfo.js
Alongside `Config.js` in the public folder you'll see another file called `LayersInfo.js`. This file contains the data used to create the different layer options that are displayed on the bottom view bar of Sideby. By combining the use of Add Layer Item and Export Layers, you can save yourself some tedium.

## Coming soon
More on adding layers.
