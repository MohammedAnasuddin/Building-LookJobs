// swagger.js
import swaggerAutogen from "swagger-autogen";

const swagger = swaggerAutogen();

const doc = {
  info: {
    title: "Job API",
    description: "Auto-generated API docs",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server"];

swagger(outputFile, endpointsFiles, doc);