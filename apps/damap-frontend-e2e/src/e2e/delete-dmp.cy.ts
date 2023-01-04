describe("delete dmp", () => {

  before(() => {
    cy.fixture("users").then((users) => cy.login(users.username, users.password));
  });

  beforeEach(() => {
    cy.visit("/plans");
  });

  after(() => cy.logout());

  it("should delete dmp", () => {
    cy.intercept("DELETE", "/api/dmps/*").as("deleteDmp");
    cy.get("app-dmp-table tr").first().get("td").last().click()
      .get("mat-icon").contains("delete").click();
    cy.get("damap-delete-warning-dialog > div > button").last().click();
    cy.wait("@deleteDmp");
  });

});
