const { app, request, database } = require("../../config");

// TEST : suite for the GET /api/users route

describe("GET api/homestructure", () => {
    it("should fetch home structure successfully", async () => {
      // Mock empty rows returned from the database
      const rows = [];

      // Mock the implementation of the database query method
      jest.spyOn(database, "query").mockImplementation(() => [rows]);

      // Send a GET request to the /api/users endpoint
      const response = await request(app).get("api/homestructure");

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toStricEqual(rows);
    });
});