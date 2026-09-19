import fs from "fs";

const geojson = JSON.parse(
  fs.readFileSync("./src/data/brouter-route.geojson", "utf8")
);

const coordinates =
  geojson.features[0].geometry.coordinates;

const target = [-117.95, 34.15];

let closestPoint = null;
let closestDistance = Infinity;

for (const coordinate of coordinates) {
  const longitude = coordinate[0];
  const latitude = coordinate[1];

  const distance = Math.sqrt(
    Math.pow(longitude - target[0], 2) +
      Math.pow(latitude - target[1], 2)
  );

  if (distance < closestDistance) {
    closestDistance = distance;
    closestPoint = coordinate;
  }
}

console.log("Target:", target);
console.log("Closest route point:", closestPoint);
console.log("Distance:", closestDistance);