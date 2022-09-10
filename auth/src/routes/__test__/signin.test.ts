import request from "supertest";
import { app } from "../../app";

it("fails when a email does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "incorrectpassword",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
});

it("responde with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const response = await request(app).post("/api/users/signin").send({
    email: "test@test.com",
    password: "password",
  });
  expect(response.get("Set-Cookie")).toBeDefined();
});
