import { test } from '@playwright/test';
import DroppablePage from '../pages/DroppablePage.js';

test.describe('Droppable', () => {
    test.setTimeout(90_000);
    
    let droppablePage;

    test.beforeEach(async ({ page }) => {
        droppablePage = new DroppablePage(page);
        await droppablePage.open();
    });

    test('Simple - drops Drag Me onto target', async () => {
        await droppablePage.selectSimpleTab();

        const source = droppablePage.simpleSource;
        const target = droppablePage.simpleTarget;

        await droppablePage.verifyDragBox(source, 'Drag Me');
        await droppablePage.verifyInitialState(target);

        await droppablePage.dragToTarget(source, target);

        await droppablePage.verifyDropped(target);
    });

    test('Accept - accepts Acceptable box', async () => {
        await droppablePage.selectAcceptTab();

        const source = droppablePage.acceptableSource;
        const target = droppablePage.acceptTarget;

        await droppablePage.verifyDragBox(source, 'Acceptable');
        await droppablePage.verifyInitialState(target);

        await droppablePage.dragToTarget(source, target);

        await droppablePage.verifyDropped(target);
    });

    test('Accept - rejects Not Acceptable box', async () => {
        await droppablePage.selectAcceptTab();

        const source = droppablePage.notAcceptableSource;
        const target = droppablePage.acceptTarget;

        await droppablePage.verifyDragBox(source, 'Not Acceptable');
        await droppablePage.verifyInitialState(target);

        await droppablePage.dragToTarget(source, target);

        await droppablePage.verifyNotDropped(target);
    });
});