import { expect } from '@playwright/test';

export async function dragAndDrop(source, target) {
    await expect(source).toBeVisible();
    await expect(target).toBeVisible();

    await expect(source).toHaveClass(/ui-draggable/, {
        timeout: 50_000,
    });

    await expect(target).toHaveClass(/ui-droppable/, {
        timeout: 50_000,
    });

    await source.dragTo(target);
}