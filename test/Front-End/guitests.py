import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class GUITest(unittest.TestCase):

	def setUp(self):
		self.home_url = 'http://www.propxdoeswhat.me/'
		self.driver = webdriver.Firefox()
		self.driver.get(self.home_url)
		self.driver.maximize_window()

	def test_title(self):
		self.assertEqual(self.driver.title, 'PropXdoesWHAT')

	def test_index_page(self):
		navbar_link = self.driver.find_element_by_link_text('PropXdoesWHAT').click()
		self.assertEqual(self.driver.current_url, self.home_url)

	def test_laws_page(self):
		self.driver.find_element_by_link_text('Laws').click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/laws/page/1')
		self.driver.implicitly_wait(20)

		self.driver.find_element_by_class_name("list-group-item").click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/laws/S.CON.RES.41/1')

	def test_politicians_page(self):
		self.driver.find_element_by_link_text('Politicians').click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/politicians/page/1')
		self.driver.implicitly_wait(20)

		self.driver.find_element_by_id("politician-headshot").click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/politicians/Ralph_Abraham/1')

	def test_action_groups_page(self):
		self.driver.find_element_by_link_text('Action Groups').click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/action_groups/page/1')
		self.driver.implicitly_wait(20)

		self.driver.find_element_by_class_name("list-group-item").click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/action_groups/DemocraticParty/1')

	def test_impacted_groups_page(self):
		self.driver.find_element_by_link_text('Affected Groups').click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/affected_groups/page/1')
		self.driver.implicitly_wait(20)

		self.driver.find_element_by_id("affected-group-headshot").click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/affected_groups/veterans')

	def test_about_page(self):
		navbar_link = self.driver.find_element_by_link_text('About').click()
		self.assertEqual(self.driver.current_url, 'http://www.propxdoeswhat.me/about')

	def tearDown(self):
		self.driver.quit()

if __name__ == '__main__':
	unittest.main()