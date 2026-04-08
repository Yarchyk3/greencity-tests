import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestGreenCityEvents(unittest.TestCase):

    def setUp(self):
        """Preconditions: Відкриття браузера перед кожним тестом"""
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 15)
        self.base_url = "https://www.greencity.cx.ua/#/greenCity/events"

    def tearDown(self):
        """Postconditions: Закриття браузера після кожного тесту"""
        if self.driver:
            self.driver.quit()

    def test_tc01_page_load(self):
        """TC-01: Page load - Перевірка успішного завантаження сторінки"""
        # Крок 2: Введення URL
        self.driver.get(self.base_url)
        
        # Крок 3: Очікування завантаження списку подій
        events_list = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".list-container, app-events-list"))
        )
        
        self.assertTrue(events_list.is_displayed(), "Сторінка подій не відображається")
        self.assertIn("events", self.driver.current_url.lower())

    def test_tc02_event_cards(self):
        """TC-02: Event cards - Перевірка вмісту карток подій"""
        self.driver.get(self.base_url)
        
        # Крок 1: Очікування появи карток
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".list-item, mat-card"))
        )
        self.assertGreater(len(cards), 0, "Картки подій не знайдені")

        # Крок 2-4: Перевірка першої картки на наявність заголовку, дати та опису
        first_card = cards[0]
        
        title = first_card.find_element(By.CSS_SELECTOR, ".title-list, .event-title").text
        date = first_card.find_element(By.CSS_SELECTOR, ".date-data, .event-date").text
        description = first_card.find_element(By.CSS_SELECTOR, ".description, .event-description").text

        self.assertNotEqual(title, "", "Заголовок події порожній")
        self.assertNotEqual(date, "", "Дата події порожня")
        self.assertNotEqual(description, "", "Опис події порожній")

    def test_tc03_navigation(self):
        """TC-03: Navigation - Перехід на сторінку деталей події"""
        self.driver.get(self.base_url)
        
        # Крок 1: Клік на першу картку події
        first_card_link = self.wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".list-item, mat-card"))
        )
        first_card_link.click()
        
        # Крок 2: Перевірка, що URL змінився (містить ID події або шлях деталізації)
        self.wait.until(EC.url_contains("events/"))
        
        # Перевірка наявності детальної інформації
        details_container = self.wait.until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".event-main-image, .event-text"))
        )
        self.assertTrue(details_container.is_displayed(), "Детальна інформація про подію не відобразилась")

    def test_tc04_negative_wrong_url(self):
        """TC-04: Negative test - Перевірка введення некоректного URL"""
        wrong_url = "https://www.greencity.cx.ua/#/wrongpage"
        self.driver.get(wrong_url)
        
        # Очікуємо повідомлення про помилку або 404 сторінку (залежить від логіки сайту)
        # На GreenCity зазвичай відображається кастомна сторінка 404
        error_message = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".error-code, .not-found-container, h1"))
        )
        
        self.assertTrue(error_message.is_displayed(), "Повідомлення про помилку не знайдено")

if __name__ == "__main__":
    unittest.main()