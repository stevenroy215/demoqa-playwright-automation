import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import Papa from 'papaparse';
import WebTablesPage from '../pages/WebTablesPage';

test.describe('Web Tables - Registration Form', () => {
    let webTablesPage;

    test.beforeEach(async ({ page }) => {
        webTablesPage = new WebTablesPage(page);
        await webTablesPage.open();
    });

    test('Register all users from CSV dataset', async () => {
        test.setTimeout(120_000);
        const csvPath = path.resolve('test-data', 'users.csv');
        const csvText = fs.readFileSync(csvPath, 'utf-8');

        const result = Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false,
        });

        expect(
            result.errors,
            'CSV does not have any errors'
        ).toHaveLength(0);

        const users = result.data;

        expect(
            users.length,
            'User dataset is not empty'
        ).toBeGreaterThan(0);

        for (const user of users) {
            await test.step(`Register user: ${user.email}`, async () => {
                await webTablesPage.clickAdd();
                await webTablesPage.fillForm(user);
                await webTablesPage.delay();
                await webTablesPage.clickSubmit();
                await webTablesPage.verifyUserSaved(user);
                await webTablesPage.delay();
            });
        }
    });

    test('Does not save user when Email is empty', async () => {
        await webTablesPage.clickAdd();

        await webTablesPage.fillFirstName('EmptyEmail');
        await webTablesPage.fillLastName('Test');
        await webTablesPage.clearEmail();
        await webTablesPage.fillAge('30');
        await webTablesPage.fillSalary('12000000');
        await webTablesPage.fillDepartment('QA');

        //Verify that the user data does not exist in the table
        await webTablesPage.verifyUserNotSaved('EmptyEmail');

        await webTablesPage.clickSubmit();

        //Verify validation email and modal
        await webTablesPage.verifyEmailRequired();

        //Ensure data is not displayed after submit
        await webTablesPage.verifyUserNotSaved('EmptyEmail');
    });

    test('Does not save user when Age contains letters', async () => {
        await webTablesPage.clickAdd();

        await webTablesPage.fillFirstName('InvalidAge');
        await webTablesPage.fillLastName('Test');
        await webTablesPage.fillEmail('steven@test.com');
        await webTablesPage.fillAge('A1');
        await webTablesPage.fillSalary('12000000');
        await webTablesPage.fillDepartment('QA');

        //Verify that the user data does not exist in the table
        await webTablesPage.verifyUserNotSaved('InvalidAge');

        await webTablesPage.clickSubmit();

        //Verify validation age and modal
        await webTablesPage.verifyAgeNumbersOnly('A1');

        //Ensure data is not displayed after submit
        await webTablesPage.verifyUserNotSaved('InvalidAge');
    });
});