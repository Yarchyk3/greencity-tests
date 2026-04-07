import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.chrome.options import Options

def setUp(self):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    self.driver = webdriver.Chrome(options=options)
    self.driver.maximize_window()
    self.driver.get("https://www.greencity.cx.ua/#/greenCity/events")
    self.wait = WebDriverWait(self.driver, 10)
class TestEventsPage(unittest.TestCase):

    def tearDown(self):
        self.driver.quit()

    # TC-01: Page loads
    def test_page_loads(self):
        events = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )
        self.assertTrue(len(events) > 0, "Events are not displayed")

    # TC-02: Event cards content
    def test_event_cards_content(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )

        first_card_text = cards[0].text
        self.assertTrue(len(first_card_text) > 0, "Event card is empty")

    # TC-03: Navigation to event details
    def test_navigation_to_event(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )

        cards[0].click()

        self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "app-event-detail"))
        )

        self.assertIn("event", self.driver.current_url.lower())


if __name__ == "__main__":
    unittest.main()