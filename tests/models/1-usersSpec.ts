import Users from "../../src/models/users";

describe("Users Model", () => {
  const userModel = new Users();

  it("should have an index method", () => {
    expect(userModel.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(userModel.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userModel.create).toBeDefined();
  });

  it("should have a getUserByEmail method", () => {
    expect(userModel.getUserByEmail).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result = await userModel.index();
    expect(result).toEqual([
      {
        first_name: "adam",
        last_name: "john",
        email: "adam@store.com",
        role: "admin",
      },
      {
        first_name: "ahmed",
        last_name: "ibrahim",
        email: "ahmed@mail.com",
        role: "user",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await userModel.show(2);
    expect(result).toEqual({
      first_name: "ahmed",
      last_name: "ibrahim",
      email: "ahmed@mail.com",
      role: "user",
    });
  });

  it("create method should add a user", async () => {
    const result = await userModel.create({
      first_name: "ali",
      last_name: "adel",
      email: "ali@mail.com",
      password: "pass123",
    });

    expect(result).toEqual({
      first_name: "ali",
      last_name: "adel",
      email: "ali@mail.com",
      role: "user",
      user_id: 3,
    });
  });

  it("getUserByEmail method should return the user", async () => {
    const result = await userModel.getUserByEmail("ali@mail.com");

    expect(result?.email).toEqual("ali@mail.com");
  });
});
