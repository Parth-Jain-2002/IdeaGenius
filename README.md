# IdeaGenius
IdeaGenius is a platform for seamless Market Research Assistance and Innovative Ideation. It empowers users with diverse information collection and organization, generating unique ideas from aggregated research.

# Setup
1. Clone the repository

2. Go into the frontend folder using `cd frontend` and run `npm install` to install all the dependencies
3. Create a `.env` file in the frontend folder by copying the contents of `.env.example` and replacing the values with your own
4. Run `npm start` to start the frontend server

5. Go into the extension folder using `cd extension` and run `npm install` to install all the dependencies
6. To load the extension, go to `chrome://extensions` and turn on developer mode
7. Click on `Load unpacked` and select the `extension` folder

8. Go into the backend folder using `cd backend`
9. Create a python virtual environment using `python -m venv {name of virtual environment}`
10. Activate the virtual environment using `.\{name of virtual environment}\Scripts\Activate.ps1`
11. Install all the dependencies using `pip install -r requirements.txt`
12. Create a `.env` file in the backend folder by copying the contents of `.env.example` and replacing the values with your own
13. Run `python manage.py makemigrations` and `python manage.py migrate` to create the database
14. Run `python manage.py runserver` to start the backend server

# More things about setup
1. You need to login on the HuggingFace website and write your username and password in the `.env` file in the backend folder
2. Go to `https://huggingface.co/settings/tokens` and copy your API token and write it in the `.env` file in the backend folder
3. For the firebase project settings, either create your own firebase project if you want to use your own database or ask me for the project settings


