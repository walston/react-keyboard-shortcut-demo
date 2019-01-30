import { getUser } from "./UserApi";

it("Should get a user", async () => {
  expect.assertions(1);
  const response = await getUser();
  expect(response).toHaveProperty("name");
});
