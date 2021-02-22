# sif_engine_ts
A SIF based engine in TypeScript to create web applications based on a SIF based server using a websocket

# how to build the engine

## Clone repository
git clone https://github.com/gokkep/sif_engine_ts.git

## Start development IDE (Visual Studio Code is recommended)
Start Visual Studio Code and open the folder where the repository has been cloned

## Open a Terminal

Install TypeScript transpiler tsc and download node modules as described in package.json with: npm install --save-dev typescript

## Create a bundled javascript file called sif_engine.js and sif_engine.map (for debugging) into the dist folder

The following commands will automatically use the webpack.config.js file to direct what to build.

### Windows
node_modules\.bin\webpack

### Linux/MacOs
.\node_modules\.bin\webpack

