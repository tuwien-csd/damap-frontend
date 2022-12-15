describe("damap-frontend", () => {

  before(() => {
    cy.fixture("users").then((users) => cy.login(users.username, users.password));
  });

  beforeEach(() => {
    cy.visit("/");
  });

  after(() => cy.logout());

  it("should load plans", () => {
    // Go to plans
    cy.get("div.button-row-left > button").first().click();
    // Check table
    cy.get("table").should("exist");
  });

});
