# TESTING

## Tools

- Unit testing: [Jest](https://jestjs.io/docs/en/getting-started)
- Integration: [Jest](https://jestjs.io/docs/en/getting-started)
- End-to-end: [Cypress](https://docs.cypress.io/)

## Approach

### When to test:

- Unit test all _shared_ business logic:
  - Higher order components
  - Controller components
  - Utility functions
- Unit test hardened implementations
  - Complicated routing systems
- E2E Test (w/ Cypress)
  - User Stories
- Integration Test
  - **All** api calls

### When to not:

Small, single-use, presentational components don't need testing, **BUT** when an implementation is used in a second place, please write a test for its use-case, & if possible _both_ the _old & new_ use-cases.

Purely presentational components—with no conditional logic or flow control—do not benefit from tests. If the exposed api of a component needs hardening, provide `prop-types` for it.

### What this implies:

The approach above strongly suggests components be structured in such a way that some components control others, so they may be tested, and many more components be structured as logic-free presentational components.

Try to treat controllers as state-access-points, they alone have access to dispatching events and executing logic. If controll needs to be passed to UI elements, pass `handleX` props down.

## Examples

### Jest

[Jest API Docs](https://jestjs.io/docs/en/api)

```js
it("Unit Test", () => {});
```

```js
it("External Request", async () => {
  expect.assertions(1);

  const actual = await GET();
  const expected = { data: {} };

  expect(actual).toBe(expected);
});
```

### Cypress

[Cypress Docs](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple)

```js
describe("Post Resource", function() {
  it("Creating a New Post", function() {
    cy.visit("/posts/new"); // 1.

    cy.get("input.post-title") // 2.
      .type("My First Post"); // 3.

    cy.get("input.post-body") // 4.
      .type("Hello, world!"); // 5.

    cy.contains("Submit") // 6.
      .click(); // 7.

    cy.url() // 8.
      .should("include", "/posts/my-first-post");

    cy.get("h1") // 9.
      .should("contain", "My First Post");
  });
});
```
