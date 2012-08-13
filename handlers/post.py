import tornado.web
import tornado.websocket
import simplejson

websockets = []
user_id=0
users = {}
usersocket = {}

class WSHandler(tornado.websocket.WebSocketHandler):
	def open(self):
		global user_id
		websockets.append(self)
		usersocket[user_id] = self
		users[user_id] = {"x":None, "y":None}
		if len(websockets) > 1:
			websockets[0].write_message({"message":"returnsvg","sender":user_id})
		for ws in websockets:
			if ws is not self:
				ws.write_message({"message":'',"count":len(websockets), "sender": user_id, "users":users})
		self.write_message({"message":'',"count":len(websockets), "sender": user_id, "type": 'first', "users":users})
		user_id = user_id + 1
	def on_message(self, message):
		print message
		message = simplejson.loads(message)
		if "type" in message and message['type'] == 'init':
			usersocket[message['sender']].write_message(message)
		else:
			for ws in websockets:
				ws.write_message({"message":message['message'],"count":len(websockets), "sender":message['sender']})
	def on_close(self):
		websockets.remove(self)
		for ws in websockets:
			ws.write_message({"message":'',"count":len(websockets)})