# GreenCity Automated Tests

Автоматизовані тести для [GreenCity](https://www.greencity.cx.ua/#/greenCity).

## Стек
- Playwright + TypeScript
- Allure Report

## Встановлення

```bash
npm install
npx playwright install chromium
```

## Запуск тестів

```bash
npx playwright test
```

## Allure звіт

```bash
npx allure serve allure-results
```

## Тест-кейси

| ID | Опис |
|---|---|
| TC-01 | Форма Create News містить всі поля |
| TC-02 | Валідація поля Title |
| TC-03 | Вибір тегів (1-3) |
| TC-04 | Завантаження зображення |
| TC-05 | Валідація Main Text |
| TC-06 | Валідація поля Source |
| TC-07 | Кнопка Cancel — підтвердження |
| TC-08 | Preview режим |
| TC-09 | Кнопка Edit видима автору |
| TC-10 | Редагування новини |