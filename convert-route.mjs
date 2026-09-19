import fs from "fs";

const inputPath = "./src/data/brouter-route.geojson";
const outputPath = "./src/data/journeyRoute.ts";

const geojson = JSON.parse(
  fs.readFileSync(inputPath, "utf8")
);

const route = geojson.features[0];

const output = `import type { Feature, LineString } from "geojson";

export const journeyRoute: Feature<LineString> = ${JSON.stringify(
  route,
  null,
  2
)};
`;

fs.writeFileSync(outputPath, output);

console.log("journeyRoute.ts created successfully.");