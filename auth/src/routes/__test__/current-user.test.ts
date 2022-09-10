import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(response.body.currentsUser.email).toEqual("test@test.com");
});

it("respondes with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(401);
});
