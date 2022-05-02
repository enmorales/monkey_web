const SITE = "https://losestudiantes.co";
const WAIT_TIME = 1000;
const MONKEYS_DEFAULT = 3;

describe("Hacer click en un botón al azar", function () {
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
    cy.get("button").then(($buttons) => {
      var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
      cy.wrap(randomButton).click({ force: true });
      monkeysLeft = monkeysLeft - 1;
      cy.wait(1000);
      randomEvent(monkeysLeft);
    });
  }
}