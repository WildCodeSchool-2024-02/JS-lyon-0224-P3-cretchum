const express = require("express");
const { browse } = require("../../../app/controllers/homestructureActions");
const { app, request, database } = require("../../config");

// Mock the tables object and the research function
jest.mock("../../../database/tables", () => ({
  home_structure: {
    research: jest.fn(),
  },
}));

const router = express.Router();

// Define the browse route
router.get("/", browse);

app.use(express.json());
app.use("/home_structure", router);

describe("GET /home_structure", () => {
  it("should return a list of home structures", async () => {
    // Arrange

    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    // Act
    const res = await request(app).get(
      "/api/homestructure/?offset=0&limit=30&search="
    );

    // Assert
    expect(res.status).toBe(200);
  });
});
