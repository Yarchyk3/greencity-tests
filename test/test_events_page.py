import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class TestEventsPage(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get("https://www.greencity.cx.ua/#/greenCity/events")
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        self.driver.quit()

    def test_page_loads(self):
        events = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )
        self.assertTrue(len(events) > 0)

    def test_event_cards_content(self):
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-event-card"))
        )
        self.assertTrue(len(cards[0].text) > 0)

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