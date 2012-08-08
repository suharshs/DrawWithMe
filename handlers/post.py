import tornado.web
import tornado.websocket
import simplejson

websockets = []
user_id=0
users = {}

class WSHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		global user_id
		websockets.append(self)
		users[user_id] = {"x":None, "y":None}
		for ws in websockets:
			if ws is not self:
				ws.write_message({"message":'',"count":len(websockets), "sender": user_id, "users":users})
		self.write_message({"message":'',"count":len(websockets), "sender": user_id, "first": 'True', "users":users})
		user_id = user_id + 1
	def on_message(self, message):
		message = simplejson.loads(message)
		for ws in websockets:
			ws.write_message({"message":message['message'],"count":len(websockets), "sender":message['sender']})
	def on_close(self):
		websockets.remove(self)
		for ws in websockets:
			ws.write_message({"message":'',"count":len(websockets)})