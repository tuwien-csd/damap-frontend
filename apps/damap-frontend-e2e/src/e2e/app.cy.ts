describe("damap-frontend", () => {
  beforeEach(() => cy.visit("/"));

  it("should load plans", () => {
    cy.fixture("users").then((users) => {
      cy.login(users.username, users.password);
      // Go to plans
      cy.get('div.button-row-left > button').first().click();
      // Check loading bar
      cy.get('div.mat-progress-bar-element').should('exist');
      // Check table
      cy.get('table').should('exist');
      cy.logout();
    });
  });

  // TODO
  it("should create and autosave dmp", () => {
    cy.fixture("users").then((users) => {
      cy.login(users.username, users.password);
      // Create new dmp
      // Create new project
      // Add new data
      // Use file upload
      // Check autosave
      // Search for repositories
      // Go back to plans
      // Check if dmp shows in list
      cy.logout();
    });
  });

  // TODO
  it("should update and autosave dmp", () => {
    cy.fixture("users").then((users) => {
      cy.login(users.username, users.password);
      // Create new dmp
      // Select project from db
      // Search and add person
      // Add reused data
      // Add storage
      // Check autosave
      // Set retention period
      // Reuse of data
      // Add costs
      // Check if dmp shows in list
      cy.logout();
    });
  });
});
