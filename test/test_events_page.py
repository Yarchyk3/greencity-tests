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
        # Вимикаємо headless для Windows, щоб бачити браузер
        # chrome_options.add_argument("--headless")  # закоментуй для видимого браузера
        chrome_options.add_argument("--window-size=1920,1080")

        # Підбираємо правильний ChromeDriver
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
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

if __name__ == "__main__":
    unittest.main() 
