describe("access", () => {

  beforeEach(() => {
    cy.fixture("users").then((users) => cy.login(users.username, users.password));
  });

  afterEach(() => cy.logout());

  it("should display GDPR data", () => {
    cy.intercept("GET", "/api/gdpr/*").as("getGdpr");
    cy.get(".footer").contains("GDPR").click();
    cy.wait("@getGdpr");
    cy.get("mat-expansion-panel").should('have.length', 3);
  });
});
