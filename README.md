# IdeaGenius
IdeaGenius is a platform for seamless Market Research Assistance and Innovative Ideation. It empowers users with diverse information collection and organization, generating unique ideas from aggregated research.

## Setup
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

### More things about setup
1. You need to login on the HuggingFace website and write your username and password in the `.env` file in the backend folder
2. Go to `https://huggingface.co/settings/tokens` and copy your API token and write it in the `.env` file in the backend folder
3. For the firebase project settings, either create your own firebase project if you want to use your own database or ask me for the project settings

## Purpose
IdeaGenius is a dynamic platform designed to transform **ideation and market research processes**. Through features such as market **research assistance**, initial **idea generation**, in-depth **trend analysis**, **project planning**, and **collaboration opportunities**, IdeaGenius empowers users to organize research, generate refined ideas, understand market trends, plan effectively, learn from similar projects, and connect for collaboration. By leveraging advanced AI algorithms and comprehensive industry insights, IdeaGenius aims to assist clients in identifying, developing, and refining innovative project ideas tailored to their time and budget constraints. The platform is user-friendly, scalable, and versatile, catering to individuals across different levels of expertise in various domains.

## Why is it needed?
1. Fragmentation: Existing methods lack cohesion, leading to fragmented efforts in data collection and analysis.
2. Inefficiencies: Lack of a unified system results in duplicated efforts and inefficient resource utilization.
3. Limited Analysis Tools: Traditional methods often lack comprehensive tools for idea generation and market trend analysis.
4. High Costs: Current systems, especially in traditional market research, incur significant financial burdens.
5. Discontinuous Data: Information gathering is often sporadic, creating gaps in insights and hindering a continuous research flow.
6. Missed Opportunities: Inadequate tools and disjointed processes contribute to overlooking potential opportunities.
	
IdeaGenius tackles the challenges of fragmented processes and inefficiencies by providing a unified platform for streamlined ideation and market research. With comprehensive analysis tools, it minimizes costs, ensures continuous data flow, and maximizes opportunities, offering a cohesive and efficient solution to the current drawbacks in ideation and research methodologies.

## Database Architecture
![image5](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/7b856acb-e37f-4e10-a906-a751c15a203f)

1. **UserAction:** Tracks user actions with fields for URL, user ID, and specific action performed, providing a log of user interactions.
2. **Chat:** Manages individual chat messages with details such as user ID, unique chat ID, message content, and response.
3. **Thread:** Organizes related chats into threads with a unique thread ID, user ID, title, image source, and URL.
4. **UserDoc:** Stores user documentation details including user ID, email, personal information, and professional details.
5. **Topic:** Represents user-generated topics with a unique topic ID, user ID, title, description, and related attributes.

## Architecture Diagram
![image7](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/dc74e3a6-1551-4a76-994d-2597be8c7202)

## Activity Diagram

### 1. Extension
![image9](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/91c2070d-6d80-422f-96d2-65be329a0130)
![image4](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/fd2e476a-a0c0-49a6-b2a0-33632f0803f7)

### 2. User Profile
![image3](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/676b779a-7629-4e15-91be-5204588ec35e)

### 3. Research Bank
![image11](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/49d48469-df63-45d8-ba4b-9f2f15630dca)

### 4. Chat Interface
![image8](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/052864ef-acda-4799-90c9-76860929b2ec)

### 5. Idea Interface
![image16](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/348f7202-6ee2-4549-b752-1135f7cf0c24)

### 6. Idea Dashboard
![image12](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/83ed0d87-00b4-43d2-ad91-fffa98596355)
![image14](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/27679bf3-d0f3-4065-8fe2-e660328e02dd)

### 7. Vision Doc
![image20](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/18653709-9d7f-4fad-b62c-7b7183903033)
![image18](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/ac24c91a-98d8-4ea2-846b-320f0b4e256e)
![image15](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/177e5475-d159-4390-b78d-1b3039110bee)

### 8. Market Insights
![image2](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/aea98839-98e6-49a0-9fe6-9445864e7383)

### 9. Recommended People
![image13](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/9789d8e2-f648-4708-8eda-010b04142e12)




![image6](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/8140bb12-38fe-42f2-8f93-b585069763ae)
![image1](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/24ae7fe7-f890-4fbd-89cc-0272633bea68)
![image19](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/d324dacf-59e9-42eb-b4e0-55c4ee5f63be)
![image17](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/e15fac7f-7bdf-4b99-a2d6-082e32f132bb)
![image10](https://github.com/Parth-Jain-2002/IdeaGenius/assets/72060359/686649ea-ef9d-4e32-8359-143b219b590f)

