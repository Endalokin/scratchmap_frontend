# ScratchMap

## Demo

For a demonstration of all the features of version 0.0.0, please visit my post on LinkedIn:

https://www.linkedin.com/feed/update/urn:li:activity:7156217765761077248/

## Backend

Be aware, that the data is provided by a server. Please visit its repository for its setup, if you want build your own backend and add your own data:

https://github.com/Endalokin/scratchmap_backend

## Installation

The installation is quite self-explanatory. But as I am a beginner myself and find that repositories often lack a proper entry point, I'll try to go into more detail. 

1. Download repository and unzip the folder.
2. Open folder in i.e. Visual Studio Code.
3. Enter `npm i` within the terminal to install all dependencies.
4. Run the application with `npm run dev`. Then it is available via browser on `http://localhost:5173/`.
5. The application needs environment variables to function. Create a local file `.env.local`.
   - Add `VITE_SERVER_URL=https://scratchmap-backend.onrender.com`. You can also set the link to your own backend, ofc. 
   - Add `VITE_CESIUM_TOKEN={your own token from Cesium goes here}`. You need to register with [Cesium](https://cesium.com/) to receive your own token. If you omit this variable, the 3D scene will not work. (optional)