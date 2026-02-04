const { expect } = require("@playwright/test");

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class BoardPage {
  /** 
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async openBoard(boardName) {
    // If we're already on that board, don't click anything
    const h1 = this.page.locator("h1", { hasText: boardName });
    if (await h1.isVisible().catch(() => false)) return;
  
    // Left nav item is a BUTTON (not a link)
    // Use regex because the button name may include subtitle text too
    await this.page.getByRole("button", { name: new RegExp(boardName, "i") }).click();
  
    // Confirm board loaded (use h1 to avoid strict-mode duplicates)
    await expect(this.page.locator("h1", { hasText: boardName })).toBeVisible();
  }

  columnContainer(columnName) {
    // Matches "To Do", "To Do (2)", etc.
    const headingRegex = new RegExp(`^${escapeRegExp(columnName)}\\b`, "i");

    return this.page
      .locator("section, div")
      .filter({
        has: this.page.getByRole("heading", { name: headingRegex }),
      })
      .first();
  }

  cardInColumn(columnName, cardTitle) {
    const col = this.columnContainer(columnName);

    // Card title is an h3 (per your earlier DOM notes)
    // Go up one level to the card container
    return col.locator("h3", { hasText: cardTitle }).first().locator("..");
  }

  async verifyCardInColumnWithTags({ column, cardTitle, tags }) {
    const col = this.columnContainer(column);
    await expect(col, `Column "${column}" should exist`).toBeVisible();

    const card = this.cardInColumn(column, cardTitle);
    await expect(card, `Card "${cardTitle}" should be in "${column}"`).toBeVisible();

    for (const tag of tags) {
      await expect(
        card.getByText(tag, { exact: true }),
        `Expected tag "${tag}" on card "${cardTitle}"`
      ).toBeVisible();
    }
  }
}

module.exports = { BoardPage };