import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestEventsPage(unittest.TestCase):
    
    def setUp(self):
        # Створюємо драйвер Chrome
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.driver.get("https://www.greencity.cx.ua/#/greenCity/events") 
        
        # Створюємо WebDriverWait
        self.wait = WebDriverWait(self.driver, 10)
    
    def tearDown(self):
        # Закриваємо браузер після тесту
        if hasattr(self, 'driver') and self.driver:
            self.driver.quit()
    
    def test_page_loads(self):
        # Чекаємо, поки завантажиться головний елемент сторінки
        main_element = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".events-container"))
        )
        self.assertIsNotNone(main_element)
    
    def test_event_cards_content(self):
        # Чекаємо, поки з'являться всі картки подій
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".event-card"))
        )
        self.assertGreater(len(cards), 0)
        
        # Перевіряємо, що в кожній картці є заголовок
        for card in cards:
            title = card.find_element(By.CSS_SELECTOR, ".event-title")
            self.assertTrue(title.text.strip() != "")
    
    def test_navigation_to_event(self):
        # Чекаємо появи карток та клікаємо на першу
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".event-card"))
        )
        cards[0].click()
        
        # Перевіряємо, що відкрилася сторінка події
        event_header = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".event-header"))
        )
        self.assertIsNotNone(event_header)

if __name__ == "__main__":
    unittest.main()