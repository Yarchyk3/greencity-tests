import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

class TestEventsPage(unittest.TestCase):

    def setUp(self):
        # Налаштування опцій Chrome
        chrome_options = Options()
        
        # Режим без GUI (headless) – потрібен для серверів / контейнерів
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")  # щоб усі елементи були видимі

        # Ініціалізація драйвера
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.maximize_window()  # локально можна залишити для зручності

        # WebDriverWait
        self.wait = WebDriverWait(self.driver, 10)

        # Відкриваємо сторінку подій
        self.driver.get("https://www.greencity.cx.ua/#/greenCity/events")  # заміни на свій URL

    def tearDown(self):
        if hasattr(self, 'driver') and self.driver:
            self.driver.quit()

    def test_page_loads(self):
        main_element = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".events-container"))
        )
        self.assertIsNotNone(main_element)

    def test_event_cards_content(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".event-card"))
        )
        self.assertGreater(len(cards), 0)
        for card in cards:
            title = card.find_element(By.CSS_SELECTOR, ".event-title")
            self.assertTrue(title.text.strip() != "")

    def test_navigation_to_event(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".event-card"))
        )
        cards[0].click()
        event_header = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".event-header"))
        )
        self.assertIsNotNone(event_header)

if __name__ == "__main__":
    unittest.main()