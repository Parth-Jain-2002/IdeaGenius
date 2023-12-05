import os
from langchain.embeddings import HuggingFaceHubEmbeddings
from scipy.spatial.distance import cosine
from collections import Counter
import pickle
# Assuming you have set up the Hugging Face API token as an environment variable
# huggingfacehub_api_token = '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'

# # Step 1: Define your user profiles
user_profiles = {
    'user1': ['Java', 'Web Development', 'SQL', 'Machine Learning'],
    'user2': ['Python', 'Data Science', 'Deep Learning', 'Natural Language Processing'],
    'user3': ['C++', 'Algorithm Design', 'Computer Vision', 'Robotics'],
    'user4': ['JavaScript', 'Front-end Development', 'React', 'UI/UX Design'],
    'user5': ['Ruby', 'Rails', 'Database Management', 'Cloud Computing'],
    'user6': ['C#', 'Game Development', 'Unity', 'VR/AR'],
    # 'user7': ['PHP', 'WordPress', 'E-commerce', 'Digital Marketing'],
    # 'user8': ['Go', 'Microservices', 'Docker', 'Kubernetes'],
    # 'user9': ['Swift', 'iOS App Development', 'Objective-C', 'Mobile UI/UX'],
    # 'user10': ['Rust', 'Systems Programming', 'Concurrency', 'Security'],
    # 'user11': ['Python', 'Cybersecurity', 'Network Administration', 'Penetration Testing'],
    # 'user12': ['JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
    # 'user13': ['Python', 'TensorFlow', 'Computer Graphics', 'Natural Language Processing'],
    # 'user14': ['Java', 'Android App Development', 'Kotlin', 'Mobile Game Development'],
    # 'user15': ['Ruby', 'Sinatra', 'API Development', 'Microservices Architecture'],
    # 'user16': ['C++', 'Embedded Systems', 'IoT', 'Firmware Development'],
    # 'user17': ['Python', 'Data Analysis', 'Pandas', 'Matplotlib'],
    # 'user18': ['JavaScript', 'Vue.js', 'Front-end Frameworks', 'Responsive Design'],
    # 'user19': ['C#', 'ASP.NET', 'MVC', 'Web API Development'],
    # 'user20': ['Java', 'Spring Boot', 'Microservices', 'Cloud Native Applications'],
}


# Step 2: Create HuggingFaceHubEmbeddings instance
embeddings = HuggingFaceHubEmbeddings(repo_id="sentence-transformers/all-mpnet-base-v2", task="feature-extraction", huggingfacehub_api_token=huggingfacehub_api_token)

# Step 3: Vector Embeddings for Tags
tag_set = set(tag for tags in user_profiles.values() for tag in tags)
tag_embeddings = {tag: embeddings.embed_query(tag) for tag in tag_set}
# print(tag_embeddings)
# Step 4: User Profiles
# user_profile_embeddings = {user: [tag_embeddings[tag] for tag in user_tags] for user, user_tags in user_profiles.items()}

with open ('tag_embeddings.pkl', 'rb') as f:
    tag_embeddings = pickle.load(f)
# Function to find users based on input list of tags
def find_users_based_on_tags(input_tags, user_profiles, tag_embeddings):
    user_counter = Counter()  # Counter to track user occurrences

    for input_tag in input_tags:
        input_embedding = tag_embeddings[input_tag]
        
        # Find users with similar tags
        for user, user_tags in user_profiles.items():
            user_embedding = [tag_embeddings[tag] for tag in user_tags]
            
            # Calculate similarity between input tag and user tags
            similarity_scores = [1 - cosine(input_embedding, tag_embedding) for tag_embedding in user_embedding]
            
            # If at least one tag is similar, consider the user
            user_counter[user] += sum(score > threshold for score in similarity_scores)

    # Get users with the highest occurrences
    top_users = user_counter.most_common()
    return top_users

# Example: Find users based on input list of tags
input_tags = ['Java', 'Web Development']
threshold = 0.5  # Adjust as needed
recommended_users = find_users_based_on_tags(input_tags, user_profiles, tag_embeddings)
print(f"Recommended Users: {recommended_users}")
