import unittest
from flask import Flask
from app import app
from flask_testing import TestCase

class TestWebsite(unittest.TestCase):

	def setUp(self):
		"""Defines what should be done before every single test in this test group."""
		self.client = app.test_client()

	def tearDown(self):
		"""Defines what should be done after every single test in this test group."""
		pass

	def test_app_running(self):
		try:
			response = self.client.get("http://18.191.201.206")
		except:
			self.fail("Could not open web app. Not running, or crashed. Test Failed.")

	def test_index_page(self):
		response = self.client.get('/')
		self.assertEqual(response.status_code, 200)

	def test_laws_page(self):
		response = self.client.get('/laws/page/1')
		self.assertEqual(response.status_code, 200)

	def test_politicians_page(self):
		response = self.client.get('/politicians/page/1')
		self.assertEqual(response.status_code, 200)

	def test_action_groups_page(self):
		response = self.client.get('/action_groups/page/1')
		self.assertEqual(response.status_code, 200)

	def test_affected_groups_page(self):
		response = self.client.get('/affected_groups/page/1')
		self.assertEqual(response.status_code, 200)

	def test_about_page(self):
		response = self.client.get('/about')
		self.assertEqual(response.status_code, 200)


# Runs the tests.
if __name__ == '__main__':
	unittest.main()
