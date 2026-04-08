import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


class TestGreenCityEvents(unittest.TestCase):

    def setUp(self):
        chrome_options = Options()

        # ВАЖЛИВО для workspaces / Linux
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")

        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )

        self.wait = WebDriverWait(self.driver, 15)
        self.driver.get("https://www.greencity.cx.ua/#/greenCity/events")

    def tearDown(self):
        if hasattr(self, 'driver'):
            self.driver.quit()

    # ✅ TC-01: Page load
    def test_tc01_page_load(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )
        self.assertGreater(len(cards), 0)

    # ✅ TC-02: Event cards
    def test_tc02_event_cards(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )

        self.assertGreater(len(cards), 0)

        for card in cards:
            self.assertTrue(card.is_displayed())
            self.assertTrue(len(card.text.strip()) > 0)

    # ✅ TC-03: Navigation
    def test_tc03_navigation(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )

        cards[0].click()

        self.wait.until(EC.url_contains("event"))
        self.assertIn("event", self.driver.current_url)

    # ✅ TC-04: Negative test
    def test_tc04_negative_wrong_url(self):
        self.driver.get("https://www.greencity.cx.ua/wrongpage")
        self.assertNotIn("greenCity/events", self.driver.current_url)


if __name__ == "__main__":
    unittest.main()