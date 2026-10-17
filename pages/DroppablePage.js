import { expect } from "@playwright/test";
import { dragAndDrop } from '../helpers/dragAndDrop.js';

class DroppablePage {
    constructor(page) {
        this.page = page;

        this.simpleTab = page.locator('#droppableExample-tab-simple');
        this.acceptTab = page.locator('#droppableExample-tab-accept');

        this.simpleSource = page.locator(
            '#simpleDropContainer #draggable'
        );
        this.simpleTarget = page.locator(
            '#simpleDropContainer #droppable'
        );

        this.acceptableSource = page.locator(
            '#acceptDropContainer #acceptable'
        );
        this.notAcceptableSource = page
            .locator('#acceptDropContainer .drag-box')
            .filter({ hasText: /^Not Acceptable$/});

        this.acceptTarget = page.locator(
            '#acceptDropContainer .drop-box'
        );
    }

    async open() {
        await this.page.goto('/droppable');
    }

    async selectSimpleTab() {
        await this.simpleTab.click();
    }

    async selectAcceptTab() {
        await this.acceptTab.click();
    }

    async verifyDragBox(source, expectedText) {
        await expect(source).toBeVisible();
        await expect(source).toHaveText(expectedText);
    }

    async verifyInitialState(target) {
        await expect(target).toBeVisible();
        await expect(target).toHaveText(/^Drop Here$/i);
    }

    async dragToTarget(source, target) {
        await dragAndDrop(source, target);
    }

    async verifyDropped(target) {
        await expect(target).toHaveText('Dropped!');
        await expect(target).toHaveClass(/ui-state-highlight/);
    }

    async verifyNotDropped(target) {
        await expect(target).toHaveText(/^Drop here$/i);
        await expect(target).not.toHaveClass(/ui-state-highlight/);
    }

    async delay(milliseconds = 1000) {
        await this.page.waitForTimeout(milliseconds);
    }
}

export default DroppablePage;