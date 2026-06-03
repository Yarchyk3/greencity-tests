<<<<<<< HEAD
# GreenCity Playwright Test Automation

> 📊 **Allure Report (GitHub Pages):** `https://<your-username>.github.io/<your-repo-name>/`  
> *(Replace with your actual GitHub Pages link after first CI run)*

Automated end-to-end tests for the [GreenCity](https://www.greencity.cx.ua/#/greenCity) web application using Playwright + TypeScript + Allure Report.

---

## 🛠 Tech Stack

| Tool | Version |
|---|---|
| [Playwright](https://playwright.dev/) | ^1.44 |
| TypeScript | ^5.4 |
| Node.js | 20+ |
| Allure Report | ^3.0 |

---

## 📁 Project Structure

```
greencity-tests/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline
├── components/
│   ├── header.component.ts      # Header navigation component
│   ├── footer.component.ts      # Footer component
│   └── news-card.component.ts   # News card component
├── fixtures/
│   └── auth.fixture.ts          # Test credentials and data
├── pages/
│   ├── login.page.ts            # Login page POM
│   ├── news.page.ts             # News listing page POM
│   ├── create-news.page.ts      # Create/Edit news form POM
│   └── news-detail.page.ts      # News detail page POM
├── tests/
│   ├── tc01-form-fields.spec.ts
│   ├── tc02-title-validation.spec.ts
│   ├── tc03-tags-selection.spec.ts
│   ├── tc04-image-upload.spec.ts
│   ├── tc05-main-text-validation.spec.ts
│   ├── tc06-source-validation.spec.ts
│   ├── tc07-cancel-button.spec.ts
│   ├── tc08-preview.spec.ts
│   ├── tc09-edit-button-visibility.spec.ts
│   └── tc10-edit-news.spec.ts
├── utils/
│   └── helpers.ts               # Shared utilities (login, file creation)
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd greencity-tests
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install --with-deps chromium
```

### 4. Configure test credentials

Open `fixtures/auth.fixture.ts` and update with your GreenCity account:

```ts
export const TEST_USER = {
  email: 'your-email@example.com',
  password: 'YourPassword123!',
};
```

---

## ▶️ Running Tests

```bash
# Run all tests (headless)
npm test

# Run with browser visible
npm run test:headed

# Run a specific test file
npx playwright test tests/tc01-form-fields.spec.ts

# Run with Playwright UI mode
npm run test:ui
```

---

## 📊 Generating Allure Report

```bash
# Generate and open report
npm run report

# Or step by step:
npm run allure:generate   # generates allure-report/ from allure-results/
npm run allure:open       # opens the report in browser

# Serve live (no separate generate step needed)
npm run allure:serve
```

---

## ⚙️ CI/CD — GitHub Actions

The pipeline runs automatically on every `push` or `pull_request` to `main`/`master`:

1. Installs dependencies and Playwright browsers
2. Runs all 10 tests
3. Uploads `allure-results` as a GitHub artifact
4. Generates the Allure Report and deploys it to **GitHub Pages**

### Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Set **Source** to `Deploy from a branch`
3. Select branch: `gh-pages`, folder: `/ (root)`
4. Save — your report will be available at `https://<username>.github.io/<repo>/`

---

## 🧪 Test Cases Covered

| ID | Description |
|---|---|
| TC-01 | Create News form displays all fields in correct order |
| TC-02 | Title field validation (max 170 chars, Publish button state) |
| TC-03 | Tag selection (1–3 tags, 4th tag blocked) |
| TC-04 | Image upload validation (PNG/JPG only, max 10MB) |
| TC-05 | Main Text validation (min 20, max 63,206 chars) |
| TC-06 | Source field validation (optional, valid URL required) |
| TC-07 | Cancel button confirmation modal |
| TC-08 | Preview mode displays entered data correctly |
| TC-09 | Edit News button visible only to the author |
| TC-10 | Author can edit news; changes saved, creation date preserved |
=======
GreenCity Tests
Description
Test cases for GreenCity events page.
Tested Page
https://www.greencity.cx.ua/#/greenCity/events
Author
Yarchyk3
>>>>>>> d503db65e0fd33b4ffbf0844af469c54895178dc
