const { app, request, database } = require("../config");

describe("Routes", () => {
  it("should return 200 for /user route", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [rows]);

    const res = await request(app).get("/api/user");
    expect(res.statusCode).toBe(200);
  });

  it("should return 200 for /homestructure route", async () => {
    const res = await request(app).get(
      '/api/homestructure/?offset=0&limit=30&search'
    );
    expect(res.statusCode).toBe(200);
  });

  it("should return 200 for /animal route", async () => {
    const res = await request(app).get("/api/animal");
    expect(res.statusCode).toBe(200);
  });
});
