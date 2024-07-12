const request = require("supertest");
const express = require("express");
const { browse } = require("../../../app/controllers/homestructureActions");

// Mock the tables object and the research function
jest.mock("../../../database/tables", () => ({
  home_structure: {
    research: jest.fn(),
  },
}));

const tables = require("../../../database/tables");

const app = express();
const router = express.Router();

// Define the browse route
router.get("/", browse);

app.use(express.json());
app.use("/home-structure", router);

describe("GET /home-structure", () => {
  it("should return a list of home structures", async () => {
    // Arrange
    const mockData = [
      { id: 1, name: "Structure 1" },
      { id: 2, name: "Structure 2" },
    ];
    tables.home_structure.research.mockResolvedValue(mockData);

    // Act
    const res = await request(app).get("/home-structure");

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockData);
  });

  it("should handle errors", async () => {
    // Arrange
    tables.home_structure.research.mockRejectedValue(new Error("Database error"));

    // Act
    const res = await request(app).get("/home-structure");

    // Assert
    expect(res.status).toBe(404);
  });
});
