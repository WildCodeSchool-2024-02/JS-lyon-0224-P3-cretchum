const jwt = require('jsonwebtoken');
const { app, request } = require("../../config");
const { edit } = require('../../../app/controllers/usersActions');

// TEST : suite for PUT Route to edit an existing user

// Mock the edit method
jest.mock('../../../app/controllers/usersActions', () => ({
  edit: jest.fn(),
}));

describe("PUT /api/users/:id", () => {
  const validToken = jwt.sign({ id: 1 }, process.env.APP_SECRET);

  it("should update user profile successfully", async () => {
    // Mock the edit method
    edit.mockImplementation((req, res) => {
      res.status(200).json({ message: "Profile updated successfully" });
    });

    // Define a valid profile update payload
    const validProfile = {
      id: 1,
      lastname: "Doe",
      firstname: "John",
      username: "johndoe",
      phone_number: "0123456789",
      location: "New York",
      mail: "john.doe@example.com",
      description: "A short bio"
    };

    // Send a PUT request with valid data
    const response = await request(app)
      .put(`/api/users/1`)
      .set('Cookie', `cookie=${validToken}`)
      .send(validProfile);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Profile updated successfully" });
  });

  it("should return 400 for invalid profile data", async () => {
    // Define an invalid profile update payload
    const invalidProfile = {
      id: 1,
      lastname: "D",
      firstname: "J",
      username: "jo",
      phone_number: "12345",
      location: "NY",
      mail: "john.doe@",
      description: "A short bio"
    };

    // Send a PUT request with invalid data
    const response = await request(app)
      .put(`/api/users/1`)
      .set('Cookie', `cookie=${validToken}`)
      .send(invalidProfile);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.validationErrors).toBeDefined();
  });
});