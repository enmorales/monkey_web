const SITE = "https://losestudiantes.co";
const WAIT_TIME = 1000;
const MONKEYS_DEFAULT = 2;

describe("Hacer click en un link al azar", function () {
  it("Visits site and survives monkeys", function () {
    cy.visit(SITE);
    cy.wait(WAIT_TIME);
    randomEvent(MONKEYS_DEFAULT);
  });
});

function randomEvent(monkeysLeft) {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  var monkeysLeft = monkeysLeft;
  if (monkeysLeft > 0) {
    cy.get("a").then(($links) => {
      var randomLink = $links.get(getRandomInt(0, $links.length));
      if (!Cypress.dom.isHidden(randomLink)) {
        cy.wrap(randomLink).click({ force: true });
        monkeysLeft = monkeysLeft - 1;
      }
      cy.wait(1000);
      randomEvent(monkeysLeft);
    });
  }
}