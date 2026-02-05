# playwright-data-driven-testing


Playwright Data-Driven Testing Framework

This project is a Playwright-based, data-driven automation framework created for a technical evaluation.
All test scenarios are driven from a JSON file to reduce code duplication and improve scalability.
The framework validates tasks and tags inside a demo kanban-style web application.

 **Tech Stack**
	- JavaScript (Node.js)
	- Playwright Test Runner
	- Page Object Model (POM)
	- Data-Driven Testing using JSON

**Project Structure**
- data/testCases.json (All test scenarios and credentials)
- pages/ LoginPage.js (Login page actions & assertions)
         BoardPage.js (Board navigation & card validation)
  
- tests/tasks.spec.js (Test runner that consumes JSON data)
- playwright.config.js
- package-lock.json

**Test Coverage**
The framework executes the following scenarios from testCases.json:
- TC1
	•	Verify “Implement user authentication” in Web Application - To Do
	•	Tags: Feature, High Priority

- TC2
	•	Verify “Fix navigation bug” in Web Application - To Do

- TC3
	•	Verify “Design system updates” in Web Application - In Progress
	•	Tag: Design

- TC4
	•	Verify “Push notification system” in Mobile Application - To Do
	•	Tag: Feature

- TC5
	•	Verify “Offline mode” in Mobile Application - In Progress
	•	Tags: Feature, High Priority

- TC6
	•	Verify “App icon design” in Mobile Application - Done
	•	Tag: Design

**Demo App Credentials**
Username: admin
Password: password123

**Setup Instructions**
	1.	Clone repository
	2.	Install dependencies

**Run from terminal**
-npm install

**Install playwright browsers**
-npx playwright install

**Run all tests**
-npx playwright test

**Run single test(example TC1)**
-npx playwright test tests/tasks.spec.js -g "TC1"

**Framework Design**
- Uses Page Object Model for maintainability
- Uses JSON-driven test cases
- Single reusable test runner
- Scalable for adding new scenarios without modifying test logic


**Result**
- All six test cases pass successfully using a fully data-driven approach.
