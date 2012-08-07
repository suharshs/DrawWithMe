import tornado.web
import tornado.websocket

websockets = []

class WSHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		websockets.append(self)
		for ws in websockets:
			ws.write_message({"message":'',"count":len(websockets)})
	def on_message(self, message):
		for ws in websockets:
			ws.write_message({"message":message,"count":len(websockets)})
	def on_close(self):
		websockets.remove(self)
		for ws in websockets:
			ws.write_message({"message":'',"count":len(websockets)})