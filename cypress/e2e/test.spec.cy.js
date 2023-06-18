let username, email, password;

describe("Signup flow", () => {
  it("The happy path should work", () => {
    const random = Math.floor(Math.random() * 100000);
    email = `user+${random}@realworld.io`;
    username = `Tester${random}`;
    password = "mysupersecretpassword";
    cy.visit("/register");
    cy.get(".form-control").then(($els) => {
      cy.findByPlaceholderText("Username").type(username);
      cy.findByPlaceholderText("Email").type(email);
      cy.findByPlaceholderText("Password").type(password);
    });
    cy.findByText("Sign up", { selector: "button" }).click();
    cy.contains("No articles are here").should("be.visible");
  });
  it("check the login link", () => {
    cy.visit("/register");
    cy.contains("Have an account?")
      .should("be.visible")
      .should("have.attr", "href");
  });
});

describe("Home page", () => {
  it("navigate to home page", () => {
    cy.visit("/");
    cy.findByText("A place to share your knowledge.").should("be.visible");
  });
});

describe("Login Flow", () => {
  it("the happy path", () => {
    cy.visit("/login");
    cy.findByPlaceholderText("Email").type(email);
    cy.findByPlaceholderText("Password").type(password);
    cy.findByText("Sign in", { selector: "button" }).click();
    cy.contains("No articles are here").should("be.visible");
  });
});
