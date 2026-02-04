const { test } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const { LoginPage } = require("../pages/LoginPage");
const { BoardPage } = require("../pages/BoardPage");

function loadTestData() {
  const filePath = path.join(__dirname, "..", "data", "testCases.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

const testData = loadTestData();

for (const tc of testData.cases) {
  test(
    `${tc.id}: ${tc.board} | "${tc.cardTitle}" in "${tc.column}"${
      tc.tags?.length ? ` | tags: ${tc.tags.join(", ")}` : ""
    }`,
    async ({ page }) => {
      // 1) Login
      const loginPage = new LoginPage(page);
      await loginPage.login(
        testData.credentials.username,
        testData.credentials.password
      );
      await loginPage.verifyLoginSuccess();

      // 2) Confirm we're on Web Application
      const boardPage = new BoardPage(page);
      await boardPage.openBoard(tc.board);

      // 3) Verify card in correct column (+ tags if provided)
      await boardPage.verifyCardInColumnWithTags({
        column: tc.column,
        cardTitle: tc.cardTitle,
        tags: tc.tags || [],
      });
    }
  );
}