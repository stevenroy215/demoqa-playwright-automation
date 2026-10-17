import { expect } from '@playwright/test';

class WebTablesPage {
    constructor(page) {
        this.page = page;

         this.page = page;

        this.addButton = page.locator('#addNewRecordButton');
        this.formTitle = page.locator('#registration-form-modal');
        this.userForm = page.locator('#userForm');

        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');

        this.submitButton = page.locator('#submit');
        this.tableRows = page.locator('table tbody tr');
    }

    async open() {
        await this.page.goto('/webtables');
    }

    async clickAdd() {
        await this.addButton.click();
        await this.registrationForm();
    }

    async clearEmail() {
        await this.emailInput.clear();
    }

    async clearSalary() {
        await this.salaryInput.clear();
    }

    async registrationForm() {
        await expect(this.formTitle).toBeVisible();
        await expect(this.formTitle).toHaveText('Registration Form');
    }

    async fillFirstName(firstName) {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillAge(age) {
        await this.ageInput.fill(String(age));
    }

    async fillSalary(salary) {
        await this.salaryInput.fill(String(salary));
    }

    async fillDepartment(department) {
        await this.departmentInput.fill(department);
    }

    async fillForm(user) {
        await this.fillFirstName(user.firstName);
        await this.fillLastName(user.lastName);
        await this.fillEmail(user.email);
        await this.fillAge(user.age);
        await this.fillSalary(user.salary);
        await this.fillDepartment(user.department);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }

    async verifyUserSaved(user) {
        const row = this.tableRows.filter({
            has: this.page.getByRole('cell', {
                name: user.email,
                exact: true,
            }),
        });

        await expect(row).toBeVisible();

        const cells = row.locator('td');

        await expect(cells.nth(0)).toHaveText(user.firstName);
        await expect(cells.nth(1)).toHaveText(user.lastName);
        await expect(cells.nth(2)).toHaveText(String(user.age));
        await expect(cells.nth(3)).toHaveText(user.email);
        await expect(cells.nth(4)).toHaveText(String(user.salary));
        await expect(cells.nth(5)).toHaveText(user.department);
    }

    async verifyEmailRequired() {
        await expect(this.userForm).toHaveClass(/was-validated/);
        await expect(this.emailInput).toHaveValue('');
        await expect(this.page.locator('#userEmail:invalid'))
            .toBeVisible();

        await this.registrationForm();
    }

    async verifyAgeNumbersOnly(invalidAge) {
        await expect(this.userForm).toHaveClass(/was-validated/);
        await expect(this.ageInput).toHaveValue(String(invalidAge));
        await expect(this.page.locator('#age:invalid'))
            .toBeVisible();

        await this.registrationForm();
    }

    async verifyUserNotSaved(firstName) {
        const row = this.tableRows.filter({
            has: this.page.getByRole('cell', {
                name: firstName,
                exact: true,
            }),
        });

        await expect(row).toHaveCount(0);
    }

    async delay(milliseconds = 3000) {
    await this.page.waitForTimeout(milliseconds);
}
}

export default WebTablesPage;