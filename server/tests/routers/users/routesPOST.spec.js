// Import required dependencies
const bcrypt = require("bcryptjs");
const { app, request, database } = require("../../config");

// TEST : suite for the POST /api/user route

describe("POST /api/user", () => {
  it("should add a new user successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeItem = {
      lastname: "Doe",
      firstname: "John",
      username: "johndoe",
      phoneNumber: "0123456789",
      location: "Somewhere",
      mail: "john.doe@example.com",
      password: "strongpassword1234",
      description: "A description about John Doe",
    };

    // Send a POST request to the /api/user endpoint with a test user
    const response = await request(app).post("/api/user").send(fakeItem);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
});

// TEST : suite for the POST /api/user login

describe("POST /api/user/login", () => {
  it("should validate login request body", async () => {
    const invalidCredentials = {
      mail: "invalidemail.com",
      password: "short",
    };

    const response = await request(app)
      .post("/api/user/login")
      .send(invalidCredentials);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error","unauthorized access");
  });

  it("should return 401 for invalid login credentials", async () => {
    const credentials = {
      mail: "user@example.com",
      password: "wrongpassword",
    };

    // Mock the database call
    jest.spyOn(database, "query").mockImplementation(() => [[]]);

    const response = await request(app)
      .post("/api/user/login")
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error", "unauthorized access");
  });

  it("should return 200 and set a cookie for valid login credentials", async () => {
    const credentials = {
      mail: "user@example.com",
      password: "validpassword",
    };

    // Mock the user returned from the database
    const user = {
      id: 1,
      mail: "user@example.com",
      password: await bcrypt.hash("validpassword", 10), // hashed password
      user_id: 1,
    };

    jest.spyOn(database, "query").mockImplementation(() => [[user]]);

    const response = await request(app)
      .post("/api/user/login")
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.headers).toHaveProperty("set-cookie");
  });
});