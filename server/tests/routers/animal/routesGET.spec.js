const { app, request, database } = require("../../config");

// TEST : suite for the GET /api/animal

describe("GET /api/users", () => {
    it("should fetch users successfully", async () => {
      // Mock empty rows returned from the database
      const rows = [];
  
      // Mock the implementation of the database query method
      jest.spyOn(database, "query").mockImplementation(() => [rows]);
  
      // Send a GET request to the /api/users endpoint
      const response = await request(app).get("/api/users");
  
      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(rows);
    });
  });