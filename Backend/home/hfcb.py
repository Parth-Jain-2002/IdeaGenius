from hugchat import hugchat
from hugchat.login import Login
from dotenv import load_dotenv
import os

load_dotenv()

class HuggingFaceChatBot:
    def __init__(self, cookie_path_dir="./cookies_snapshot"):
        email = os.getenv("EMAIL")
        password = os.getenv("PASSWORD")

        if os.path.exists(cookie_path_dir):
            self.sign_in = Login(email, None)
            self.cookies = self.sign_in.loadCookiesFromDir(cookie_path_dir)

            # Update ChatBot with new cookies
            self.chatbot = hugchat.ChatBot(cookies=self.cookies.get_dict())
            return

        # Log in to Hugging Face and grant authorization to Hugging Chat
        self.sign_in = Login(email, password)
        self.cookies = self.sign_in.login()

        # Save cookies to the local directory
        self.cookie_path_dir = cookie_path_dir
        self.sign_in.saveCookiesToDir(self.cookie_path_dir)

        # Create a ChatBot
        self.chatbot = hugchat.ChatBot(cookies=self.cookies.get_dict())

    def restart(self, email):
        # Load cookies when you restart your program
        # This will detect if the JSON file exists,
        # return cookies if it does, and raise an Exception if it's not.
        self.sign_in = Login(email, None)
        self.cookies = self.sign_in.loadCookiesFromDir(self.cookie_path_dir)

        # Update ChatBot with new cookies
        self.chatbot = hugchat.ChatBot(cookies=self.cookies.get_dict())

    def query(self, text):
        # Non-stream response
        query_result = self.chatbot.query(text)
        return query_result

    def get_conversation_list(self):
        # Get conversation info
        conversation_info = self.chatbot.get_conversation_list()
        return conversation_info

# # Example usage:
# # Initialize the chatbot
# chatbot_instance = HuggingFaceChatBot()

# # # Query the chatbot
# # query_text = "Hello, chatbot!"
# # result = chatbot_instance.query(query_text)
# # print(result)  # or print(result.text) or print(result["text"])

# # Get conversation info
# conversation_info = chatbot_instance.get_conversation_list()
# print(conversation_info)  # or print(conversation_info.text) or print(conversation_info["text"])