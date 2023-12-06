from langchain.embeddings import HuggingFaceHubEmbeddings
from scipy.spatial.distance import cosine
from collections import Counter
import pickle
from faker import Faker
# Assuming you have set up the Hugging Face API token as an environment variable
huggingfacehub_api_token = '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'

# Step 1: Define your user profiles
user_profiles = {
    'user0': ['Java', 'Spring Boot', 'Microservices', 'Cloud Native Applications'],
    'user1': ['Java', 'Web Development', 'SQL', 'Machine Learning'],
    'user2': ['Python', 'Data Science', 'Deep Learning', 'Natural Language Processing'],
    'user3': ['C++', 'Algorithm Design', 'Computer Vision', 'Robotics'],
    'user4': ['JavaScript', 'Front-end Development', 'React', 'UI/UX Design'],
    'user5': ['Ruby', 'Rails', 'Database Management', 'Cloud Computing'],
    'user6': ['C#', 'Game Development', 'Unity', 'VR/AR'],
    'user7': ['PHP', 'WordPress', 'E-commerce', 'Digital Marketing'],
    'user8': ['Go', 'Microservices', 'Docker', 'Kubernetes'],
    'user9': ['Swift', 'iOS App Development', 'Objective-C', 'Mobile UI/UX'],
    'user10': ['Rust', 'Systems Programming', 'Concurrency', 'Security'],
    'user11': ['Python', 'Cybersecurity', 'Network Administration', 'Penetration Testing'],
    'user12': ['JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    'user13': ['Python', 'TensorFlow', 'Computer Graphics', 'Natural Language Processing'],
    'user14': ['Java', 'Android App Development', 'Kotlin', 'Mobile Game Development'],
    'user15': ['Ruby', 'Sinatra', 'API Development', 'Microservices Architecture'],
    'user16': ['C++', 'Embedded Systems', 'IoT', 'Firmware Development'],
    'user17': ['Python', 'Data Analysis', 'Pandas', 'Matplotlib'],
    'user18': ['JavaScript', 'Vue.js', 'Front-end Frameworks', 'Responsive Design'],
    'user19': ['C#', 'ASP.NET', 'MVC', 'Web API Development'],
}

user_ids_mapping=[{'userid': '6cac9199-db67-4b01-9aac-d3c62d3ae645'},
{'userid': 'a768f03f-0d11-4cf0-9688-e67b4286e857'},
{'userid': '73151626-29fb-4bbd-86da-e1b6f4e94785'},
{'userid': '37c1ba94-9e24-46f9-9cca-7815e6329a0a'},
{'userid': 'deaabf9c-e1b2-4c62-8bc0-152b66e2c7df'},
{'userid': 'abdc6b08-f5ed-4495-8077-3b72f3ee8c4c'},
{'userid': 'b43e6bd3-2c04-4425-88c4-70990510cd37'},
{'userid': 'b3e6c2d3-0499-4f58-bdc3-dbcc393a23a5'},
{'userid': '225acb4e-7b88-417b-9f6e-1ae8064f4e4c'},
{'userid': 'c2cf047c-f373-465c-a136-2e919a5b142b'},
{'userid': '1ca5378e-2ef4-499c-a444-b6a0ec73aa9d'},
{'userid': '8af277a3-c5f3-4c69-a42e-03171743dbeb'},
{'userid': '560098f0-9997-4762-8969-101ac13e77d5'},
{'userid': '18d5ddfe-edcf-433f-9d8e-fa09f2ed9f33'},
{'userid': 'd658abd8-052c-4e7a-8749-5edb32a206ef'},
{'userid': 'd86565ab-0b57-42cf-8f1e-b17435adebf2'},
{'userid': '579b5118-4526-466f-acce-909f94434083'},
{'userid': 'def15e99-1bb8-4350-93e9-94dc9b26e161'},
{'userid': '3f2a4771-90e6-47c4-b83c-8c24dbe81ba0'},
{'userid': 'b1bce31b-8889-415b-9c23-6c98f2888de5'}]

# user_id_mapping_dict = {f"user{i}": user_id['userid'] for i,user_id in enumerate(user_ids_mapping)}
# print(user_id_mapping_dict)

# # Replace keys in the original user_profiles dictionary
# updated_user_profiles = {
#     user_id_mapping_dict[user_id]: tags for user_id, tags in user_profiles.items()
# }
# print(updated_user_profiles)
fake=Faker()
new_obj={}
for user_data in user_ids_mapping:
    new_obj[user_data['userid']] = [fake.job(), fake.company()]
print(new_obj)
# # Step 2: Create HuggingFaceHubEmbeddings instance
# embeddings = HuggingFaceHubEmbeddings(repo_id="sentence-transformers/all-mpnet-base-v2", task="feature-extraction", huggingfacehub_api_token=huggingfacehub_api_token)

# # Step 3: Vector Embeddings for Tags
# tag_set = set(tag for tags in user_profiles.values() for tag in tags)
# tag_embeddings = {tag: embeddings.embed_query(tag) for tag in tag_set}

# with open ('user_profiles.pkl', 'rb') as f:
#     user_profiles = pickle.load(f)
# print(user_profiles)

# with open('user_profiles.pkl', 'wb') as f:
#     pickle.dump(updated_user_profiles, f)

# import random
# import uuid

# users_data = []

# for _ in range(20):
#     user_data = {
#         "userid": str(uuid.uuid4()),  # Generate a random UUID for userid
#         "email": f"user{_}@example.com",  # Modify the domain or structure as needed
#         "name": f"User{_}",
#         "topics": {"Miscellaneous": []}
#     }
#     users_data.append(user_data)

# # Print the generated user data
# for user_data in users_data:
#     print(user_data)
