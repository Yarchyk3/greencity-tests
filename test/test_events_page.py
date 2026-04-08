import unittest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestGreenCityEvents(unittest.TestCase):

    def setUp(self):
        """Preconditions: Відкриття браузера перед кожним тестом у Headless режимі"""
        chrome_options = Options()
        chrome_options.add_argument("--headless") # Запуск без графічного інтерфейсу
        chrome_options.add_argument("--no-sandbox") # Потрібно для роботи в Linux/контейнерах
        chrome_options.add_argument("--disable-dev-shm-usage") # Вирішує проблему з обмеженою пам'яттю
        chrome_options.add_argument("--window-size=1920,1080") # Віртуальний розмір екрану

        # Передаємо опції у драйвер
        self.driver = webdriver.Chrome(options=chrome_options)
        
        self.wait = WebDriverWait(self.driver, 15)
        self.base_url = "https://www.greencity.cx.ua/#/greenCity/events"

    def tearDown(self):
        """Postconditions: Закриття браузера після кожного тесту"""
        if self.driver:
            self.driver.quit()

    def test_tc01_page_load(self):
        """TC-01: Page load - Перевірка успішного завантаження сторінки"""
        self.driver.get(self.base_url)
        
        events_list = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".list-container, app-events-list"))
        )
        
        self.assertTrue(events_list.is_displayed(), "Сторінка подій не відображається")
        self.assertIn("events", self.driver.current_url.lower())

    def test_tc02_event_cards(self):
        """TC-02: Event cards - Перевірка вмісту карток подій"""
        self.driver.get(self.base_url)
        
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".list-item, mat-card"))
        )
        self.assertGreater(len(cards), 0, "Картки подій не знайдені")

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
        
        first_card_link = self.wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".list-item, mat-card"))
        )
        first_card_link.click()
        
        self.wait.until(EC.url_contains("events/"))
        
        details_container = self.wait.until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".event-main-image, .event-text"))
        )
        self.assertTrue(details_container.is_displayed(), "Детальна інформація про подію не відобразилась")

    def test_tc04_negative_wrong_url(self):
        """TC-04: Negative test - Перевірка введення некоректного URL"""
        wrong_url = "https://www.greencity.cx.ua/#/wrongpage"
        self.driver.get(wrong_url)
        
        error_message = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".error-code, .not-found-container, h1"))
        )
        
        self.assertTrue(error_message.is_displayed(), "Повідомлення про помилку не знайдено")

if __name__ == "__main__":
    unittest.main()