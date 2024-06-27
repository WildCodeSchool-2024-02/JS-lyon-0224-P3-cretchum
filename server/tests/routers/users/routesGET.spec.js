const jwt = require('jsonwebtoken');
const { app, request, database } = require("../../config");

// TEST : suite for the GET /api/users route

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

// TEST : suite for the GET /api/users/:id route

describe("GET /api/users/:id", () => {
  const userId = 2;
  const validToken = jwt.sign({ id: userId }, process.env.APP_SECRET);
  
  it("should fetch a single user successfully", async () => {
    // Mock rows returned from the database
    const rows = [{
      id: userId,
      lastname: "Martin",
      firstname: "Lou",
      username: "Lou69",
      location: "Lyon 7",
      mail: "lou1.martin@exemple.com",
      description: "J'ai 2 chiens :) !",
      phone_number: "0688263395",
    }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockResolvedValue([rows]);

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Cookie', `cookie=${validToken}`);

     // Assertions
     expect(response.status).toBe(200);
     expect(response.body).toEqual({
       id: expect.any(Number),
       lastname: expect.any(String),
       firstname: expect.any(String),
       username: expect.any(String),
       location: expect.any(String),
       mail: expect.any(String),
       description: expect.any(String),
       phoneNumber: expect.any(String),
     });
  });

  it("should return 404 for non-existent user", async () => {
    // Mock empty rows returned from the database
    const rows = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockResolvedValue([rows]);

    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app)
      .get("/api/users/1")
      .set('Cookie', `cookie=${validToken}`);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "User not found" });
  });
});