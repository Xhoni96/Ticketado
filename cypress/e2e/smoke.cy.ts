import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };

    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", { name: /events/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  it("should allow you to create an event", () => {
    const testEvent = {
      name: faker.lorem.words(1),
      description: faker.lorem.sentences(1),
      startDate: new Date(),
    };
    cy.login();

    cy.visitAndCheck("/");

    cy.findByRole("link", { name: /events/i }).click();
    cy.findByText("No events yet");

    cy.findByRole("link", { name: /\+ new event/i }).click();

    cy.findByRole("textbox", { name: /title/i }).type(testEvent.name);
    cy.findByRole("textbox", { name: /description/i }).type(
      testEvent.description
    );
    // cy.findByRole("textbox", { name: /startDate/i }).type(testEvent.startDate);

    cy.findByRole("button", { name: /save/i }).click();

    cy.findByRole("button", { name: /delete/i }).click();

    cy.findByText("No events yet");
  });
});
