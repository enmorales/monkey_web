const textoPrueba = "faker text";

const SITE = "https://losestudiantes.co";
const WAIT_TIME = 1000;
const MONKEYS_DEFAULT = 1;

describe("Llenar un campo de texto al azar", function () {
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
    cy.get("input").then(($input) => {
      var input = $input.get(getRandomInt(0, $input.length));
      cy.wrap(input).type(textoPrueba, { force: true });
      monkeysLeft = monkeysLeft - 1;
      cy.wait(WAIT_TIME);
      randomEvent(monkeysLeft);
    });
  }
}