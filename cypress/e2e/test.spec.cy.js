describe("Regestration flow", () => {
  before(() => {
    const random = Math.floor(Math.random() * 100000);
    cy.wrap(`Tester${random}`).as("username");
    cy.wrap(`user+${random}@realworld.io`).as("email");
    cy.wrap("mysupersecretpassword").as("password");
  });
  it("The happy path should work", function () {
    console.log("this", this);

    cy.intercept("POST", "**/api/users").as("signup-request");
    cy.visit("/register");
    cy.get(".form-control").then(($els) => {
      cy.findByPlaceholderText("Username").type(this.username);
      cy.findByPlaceholderText("Email").type(this.email);
      cy.findByPlaceholderText("Password").type(this.password);
    });
    cy.findByText("Sign up", { selector: "button" }).click();

    cy.wait("@signup-request").should((xhr) => {
      let payload;

      // request check
      console.log("xhr", xhr);
      expect(xhr.request.body).to.have.property("user").and.to.be.a("object");
      payload = xhr.request.body.user;
      expect(payload).to.have.property("username", this.username);
      expect(payload).to.have.property("email", this.email);
      expect(payload).to.have.property("password", this.password);

      // status check
      expect(xhr.response.statusCode).to.equal(200);

      // response check
      expect(xhr.response.body).to.have.property("user").and.to.be.a("object");
      payload = xhr.response.body.user;
      expect(payload).to.have.property("username", this.username.toLowerCase());
      expect(payload).to.have.property("email", this.email);
      expect(payload).to.have.property("token").and.to.be.a("string").and.not.to
        .be.empty;
    });
  });

  // it("check the login link", function () {
  //   cy.visit("/register");
  //   cy.contains("Have an account?")
  //     .should("be.visible")
  //     .should("have.attr", "href");
  // });
  it("Login happy path", function () {
    console.log("this", this);
    cy.visit("/login");
    cy.findByPlaceholderText("Email").type(this.email);
    cy.findByPlaceholderText("Password").type(this.password);
    cy.findByText("Sign in", { selector: "button" }).click();
    cy.contains("No articles are here").should("be.visible");
  });
});

// describe("Home page", () => {
//   it("navigate to home page", () => {
//     cy.visit("/");
//     cy.findByText("A place to share your knowledge.").should("be.visible");
//   });
// });
