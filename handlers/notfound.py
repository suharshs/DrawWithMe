import tornado.web

class PageNotFoundHandler(tornado.web.RequestHandler):
	def get(self):
		self.write("404 Error -- Page Not Found")
		self.flush()
