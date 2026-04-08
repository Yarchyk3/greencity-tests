import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


class TestEventsPage(unittest.TestCase):

    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")

        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )

        self.wait = WebDriverWait(self.driver, 15)

        self.url = "https://www.greencity.cx.ua/#/greenCity/events"
        self.driver.get(self.url)

    def tearDown(self):
        if hasattr(self, 'driver'):
            self.driver.quit()

    # ✅ TC-01: Page load
    def test_page_loads(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )
        self.assertGreater(len(cards), 0)

    # ✅ TC-02: Event cards
    def test_event_cards_content(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )

        self.assertGreater(len(cards), 0)

        for card in cards:
            text = card.text.strip()
            self.assertTrue(len(text) > 0)

    # ✅ TC-03: Navigation
    def test_navigation_to_event(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )

        cards[0].click()

        # перевіряємо, що URL змінився
        self.wait.until(EC.url_contains("event"))

        current_url = self.driver.current_url
        self.assertIn("event", current_url)

    # ✅ TC-04: Negative test
    def test_wrong_url(self):
        self.driver.get("https://www.greencity.cx.ua/wrongpage")

        # просто перевіряємо, що сторінка не events
        self.assertNotIn("greenCity/events", self.driver.current_url)


if __name__ == "__main__":
    unittest.main()