import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestEventsPage(unittest.TestCase):
    BASE_URL = "https://www.greencity.cx.ua/#/greenCity/events"

    def setUp(self):
        """Preconditions: Відкриття браузера перед кожним тестом"""
        options = webdriver.ChromeOptions()
        # Запускаємо браузер розгорнутим на весь екран для уникнення перекриттів
        options.add_argument("--start-maximized") 
        
        self.driver = webdriver.Chrome(options=options)
        # Ініціалізуємо явне очікування (максимум 10 секунд)
        self.wait = WebDriverWait(self.driver, 10)

    def tearDown(self):
        """Postconditions: Закриття браузера після кожного тесту"""
        if self.driver:
            self.driver.quit()

    def test_tc01_page_load(self):
        """TC-01: Page load - Перевірка завантаження сторінки подій"""
        # Крок 1-2: Переходимо за лінком
        self.driver.get(self.BASE_URL)
        
        # Крок 3: Чекаємо на завантаження загального контейнера подій
        events_container = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "app-events-list, .list-container"))
        )
        self.assertTrue(events_container.is_displayed(), "Сторінка подій не відображається")

    def test_tc02_event_cards(self):
        """TC-02: Event cards - Перевірка наявності даних у картках"""
        self.driver.get(self.BASE_URL)
        
        # Крок 1: Шукаємо картки за нашим надійним локатором
        cards = self.wait.until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "app-events-list-item"))
        )
        self.assertGreater(len(cards), 0, "Картки подій не знайдені на сторінці")

        # Беремо першу картку для перевірки її наповнення
        first_card = cards[0]
        
        # Крок 2: Перевірка заголовку
        title = first_card.find_element(By.CSS_SELECTOR, ".title-list, .event-title, .title, h2").text
        self.assertTrue(len(title) > 0, "Заголовок події порожній")
        
        # Крок 3: Перевірка дати
        date = first_card.find_element(By.CSS_SELECTOR, ".date-data, .event-date, .date").text
        self.assertTrue(len(date) > 0, "Дата події порожня")
        
        # Крок 4: Перевірка опису
        description = first_card.find_element(By.CSS_SELECTOR, ".description, .event-description, p").text
        self.assertTrue(len(description) > 0, "Опис події порожній")

    def test_tc03_navigation(self):
        """TC-03: Navigation - Перехід на сторінку деталей через кнопку 'More'"""
        self.driver.get(self.BASE_URL)
        
        # Крок 1: Чекаємо на появу першої картки
        first_card = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "app-events-list-item"))
        )
        
        # Крок 2: Знаходимо кнопку "More" всередині цієї картки і клікаємо її
        more_button = first_card.find_element(By.CSS_SELECTOR, "button.secondary-global-button")
        self.driver.execute_script("arguments[0].click();", more_button)
        
        # Крок 3: Чекаємо, поки URL зміниться (перестане бути базовим)
        self.wait.until(lambda driver: driver.current_url != self.BASE_URL)
        
        # Перевіряємо, що ми дійсно перейшли на сторінку конкретної події
        current_url = self.driver.current_url
        self.assertTrue("events/" in current_url, f"Редирект не відбувся! Поточний URL: {current_url}")

    def test_tc04_negative_test(self):
        """TC-04: Negative test - Введення некоректного URL"""
        # Крок 1: Вводимо некоректний URL
        wrong_url = "https://www.greencity.cx.ua/#/wrongpage"
        self.driver.get(wrong_url)
        
        
        error_message = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "h1, .error-code, .not-found-container"))
        )
        
        self.assertTrue(error_message.is_displayed(), "Повідомлення про помилку (Page not found) не відобразилось")

if __name__ == "__main__":
    unittest.main()