import axios from "axios";

// Code mainly from: https://codesandbox.io/p/sandbox/react-display-multiple-colored-gpx-tracks-on-a-leaflet-map-3rxo0?file=%2Fsrc%2Ffunctions%2Fmain-functions.js%3A15%2C51
// Parse gpx file
export async function parseGpxFile(gpxXmlFile) {
  return new Promise(async (resolve, reject) => {
    try {
/*       axios
        .get(gpxXmlFile, {
          "Content-Type": "application/xml; charset=utf-8",
        })
        .then(async (response) => {
          // Gpx file string
          console.log(response); */
          var gpxStr = gpxXmlFile;

          // Count lat & lon
          var trkCount = gpxStr.match(/<trk>/g).length;

          // While loop params
          var i = 0;
          var resultArray = [];

          while (i < trkCount) {
            // Number of total characters
            let totalGpxStr = gpxStr.length;

            // Slice str to each <trk></trk> segment
            let trkPosition = gpxStr.indexOf("<trk>");
            let trkLastPosition = gpxStr.indexOf("</trk>") + "</trk>".length;
            let trkStr = gpxStr.substring(trkPosition, trkLastPosition);

            // If <trk></trk> is existing
            if (trkPosition > 0) {
              // Redefine the native string
              gpxStr = gpxStr.substring(trkLastPosition, totalGpxStr);

              resultArray.push(trkStr);
            }

            // Incrementation
            i++;
          }

          // Foreach loop params
          var resultArrObj = [];

          // Get all latitudes and longitudes data for each track
          for (let f = 0; f < resultArray.length; f++) {
            // Variables params
            var track = resultArray[f];

            // Track's name
            let namePosition =
              resultArray[f].indexOf("<name>") + "<name>".length;
            let nameLastPosition = resultArray[f].indexOf("</name>");
            let trackName = resultArray[f].substring(
              namePosition,
              nameLastPosition
            );

            // Params
            var n = 0;
            var arr = [];

            // Count lat & lon
            var latLonCount = resultArray[f].match(/lat=/g).length;

            while (n < latLonCount) {
              // Number of total characters
              let totalStr = track.length;

              // Selection of string
              var selectedStrPosition = track.indexOf("<trkpt");
              var selectedStrLastPosition = track.indexOf("</trkpt>");
              var selectedStr = track.substring(
                selectedStrPosition,
                selectedStrLastPosition
              );

              // Get elevations
              var selectedElevationStrPosition =
                track.indexOf("<ele>") + "<ele>".length;
              var selectedElevationStrLastPosition = track.indexOf("</ele>");
              var selectedElevationsStr = track.substring(
                selectedElevationStrPosition,
                selectedElevationStrLastPosition
              );
              var eleValue = parseFloat(selectedElevationsStr);

              // Get latitude and longitude between double quotes from the string
              var reg = new RegExp(/"(.*?)"/g); // Double quotes included
              var matches = selectedStr.match(reg);
              var matchesArr = [];

              // Record matches
              for (let match of matches) {
                // Match convert to number format
                let v = parseFloat(match.replace(/['"]+/g, ""));

                // Record
                matchesArr.push(v);
              }

              // Latitude value
              let latValue = matchesArr[0];

              // Longitude value
              let lonValue = matchesArr[1];

              // If <trkpt></trkpt> is existing
              if (selectedStrPosition > 0) {
                // Redefine the native string
                track = track.substring(selectedStrLastPosition + 5, totalStr);

                // Record
                arr.push([latValue, lonValue, eleValue]);
              }

              // Incrementation
              n++;

              // While loop end
              if (n === latLonCount) {
                // Remove duplicated values
                let stringArray = arr.map(JSON.stringify);
                let uniqueStringArray = new Set(stringArray);
                let uniqueArray = Array.from(uniqueStringArray, JSON.parse);

                /*                   // Min and max elevations
                  const minMaxElevations = await maxMinNumberFromArrayOfArrays(
                    uniqueArray,
                    2
                  ); */

                // Result object
                let obj = {
                  name: trackName,
                  positions: uniqueArray,
                  /*                     elevations: minMaxElevations */
                };

                // Record
                resultArrObj.push(obj);
              }
            }

            // For loop end
            if (f + 1 === resultArray.length) {
              resolve(resultArrObj);
            }
          }
/*         }); */
    } catch (error) {
      console.error(":( parseGpxFile error");
      reject(console.log);
    }
  });
}

export async function parseGpxFileOriginal(gpxXmlFile) {
  console.log(gpxXmlFile);
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .get(gpxXmlFile, {
          "Content-Type": "application/xml; charset=utf-8",
        })
        .then(async (response) => {
          // Gpx file string
          console.log(response);
          var gpxStr = response.data;

          // Count lat & lon
          var trkCount = gpxStr.match(/<trk>/g).length;

          // While loop params
          var i = 0;
          var resultArray = [];

          while (i < trkCount) {
            // Number of total characters
            let totalGpxStr = gpxStr.length;

            // Slice str to each <trk></trk> segment
            let trkPosition = gpxStr.indexOf("<trk>");
            let trkLastPosition = gpxStr.indexOf("</trk>") + "</trk>".length;
            let trkStr = gpxStr.substring(trkPosition, trkLastPosition);

            // If <trk></trk> is existing
            if (trkPosition > 0) {
              // Redefine the native string
              gpxStr = gpxStr.substring(trkLastPosition, totalGpxStr);

              resultArray.push(trkStr);
            }

            // Incrementation
            i++;
          }

          // Foreach loop params
          var resultArrObj = [];

          // Get all latitudes and longitudes data for each track
          for (let f = 0; f < resultArray.length; f++) {
            // Variables params
            var track = resultArray[f];

            // Track's name
            let namePosition =
              resultArray[f].indexOf("<name>") + "<name>".length;
            let nameLastPosition = resultArray[f].indexOf("</name>");
            let trackName = resultArray[f].substring(
              namePosition,
              nameLastPosition
            );

            // Params
            var n = 0;
            var arr = [];

            // Count lat & lon
            var latLonCount = resultArray[f].match(/lat=/g).length;

            while (n < latLonCount) {
              // Number of total characters
              let totalStr = track.length;

              // Selection of string
              var selectedStrPosition = track.indexOf("<trkpt");
              var selectedStrLastPosition = track.indexOf("</trkpt>");
              var selectedStr = track.substring(
                selectedStrPosition,
                selectedStrLastPosition
              );

              // Get elevations
              var selectedElevationStrPosition =
                track.indexOf("<ele>") + "<ele>".length;
              var selectedElevationStrLastPosition = track.indexOf("</ele>");
              var selectedElevationsStr = track.substring(
                selectedElevationStrPosition,
                selectedElevationStrLastPosition
              );
              var eleValue = parseFloat(selectedElevationsStr);

              // Get latitude and longitude between double quotes from the string
              var reg = new RegExp(/"(.*?)"/g); // Double quotes included
              var matches = selectedStr.match(reg);
              var matchesArr = [];

              // Record matches
              for (let match of matches) {
                // Match convert to number format
                let v = parseFloat(match.replace(/['"]+/g, ""));

                // Record
                matchesArr.push(v);
              }

              // Latitude value
              let latValue = matchesArr[0];

              // Longitude value
              let lonValue = matchesArr[1];

              // If <trkpt></trkpt> is existing
              if (selectedStrPosition > 0) {
                // Redefine the native string
                track = track.substring(selectedStrLastPosition + 5, totalStr);

                // Record
                arr.push([latValue, lonValue, eleValue]);
              }

              // Incrementation
              n++;

              // While loop end
              if (n === latLonCount) {
                // Remove duplicated values
                let stringArray = arr.map(JSON.stringify);
                let uniqueStringArray = new Set(stringArray);
                let uniqueArray = Array.from(uniqueStringArray, JSON.parse);

                /*                   // Min and max elevations
                  const minMaxElevations = await maxMinNumberFromArrayOfArrays(
                    uniqueArray,
                    2
                  ); */

                // Result object
                let obj = {
                  name: trackName,
                  positions: uniqueArray,
                  /*                     elevations: minMaxElevations */
                };

                console.log(obj);

                // Record
                resultArrObj.push(obj);
              }
            }

            // For loop end
            if (f + 1 === resultArray.length) {
              resolve(resultArrObj);
            }
          }
        });
    } catch (error) {
      console.error(":( parseGpxFile error");
      reject(console.log);
    }
  });
}
