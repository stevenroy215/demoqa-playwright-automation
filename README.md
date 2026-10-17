# DemoQA Playwright Automation

UI test automation for DemoQA using Playwright and JavaScript. This portfolio project demonstrates the Page Object Model, CSV-driven testing, reusable helpers, and positive and negative test scenarios.

## Tech Stack

- Playwright
- JavaScript
- Papa Parse
- Node.js

## Test Coverage

### Web Tables

- Register users from a CSV dataset.
- Verify saved user details in the table.
- Verify that an empty email prevents registration.
- Verify that an age containing letters prevents registration.

### Droppable

- Drag the Simple box onto the drop target.
- Verify that the Accept target accepts the Acceptable box.
- Verify that the Accept target rejects the Not Acceptable box.

## Project Structure

```text
helpers/
    dragAndDrop.js
pages/
    DroppablePage.js
    WebTablesPage.js
test-data/
    users.csv
tests/
    droppable.spec.js
    webTables.spec.js
playwright.config.js
package.json
package-lock.json
README.md
```

## Setup

Install Node.js before running this project.

Clone the repository and open its directory, then install dependencies:

```bash
npm ci
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run all tests in Chromium:

```bash
npx playwright test --project=chromium
```

Run with a visible browser, one test at a time:

```bash
npx playwright test --project=chromium --headed --workers=1
```

Run Web Tables tests:

```bash
npx playwright test tests/webTables.spec.js --project=chromium --headed --workers=1
```

Run Droppable tests:

```bash
npx playwright test tests/droppable.spec.js --project=chromium --headed --workers=1
```

## Test Report

Generate an HTML report:

```bash
npx playwright test --project=chromium --reporter=html
```

Open the generated report:

```bash
npx playwright show-report
```

## Configuration

The application base URL is configured in `playwright.config.js`:

```javascript
use: {
    baseURL: 'https://demoqa.com',
}
```

Browser settings and timeouts can be adjusted in the same file.

## Test Data

Registration data is stored in `test-data/users.csv`

Use dummy data only.

## Notes

- Tests run against the public DemoQA website.
- Website availability, external scripts, and loading times may affect execution.
- This is an independent portfolio project and is not affiliated with DemoQA.