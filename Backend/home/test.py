import os
from langchain.embeddings import HuggingFaceHubEmbeddings
from scipy.spatial.distance import cosine

# Assuming you have set up the Hugging Face API token as an environment variable
huggingfacehub_api_token = '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'

# Step 1: Define your user profiles
user_profiles = {
    'user1': ['C++', 'DSA', 'Python'],
    'user2': ['DSA', 'ML', 'DATA'],
    'user3': ['C++', 'Python', 'DSA'],
}

# Step 2: Create HuggingFaceHubEmbeddings instance
embeddings = HuggingFaceHubEmbeddings(repo_id="sentence-transformers/all-mpnet-base-v2", task="feature-extraction", huggingfacehub_api_token=huggingfacehub_api_token)

# Step 3: Vector Embeddings for Tags
tag_set = set(tag for tags in user_profiles.values() for tag in tags)
tag_embeddings = {tag: embeddings.embed_query(tag) for tag in tag_set}

# Step 4: User Profiles
user_profile_embeddings = {user: [tag_embeddings[tag] for tag in user_tags] for user, user_tags in user_profiles.items()}

# Example: Calculate similarity between user profiles
def calculate_similarity(user1, user2):
    user1_embedding = [emb for emb_list in user_profile_embeddings[user1] for emb in emb_list]
    user2_embedding = [emb for emb_list in user_profile_embeddings[user2] for emb in emb_list]
    return 1 - cosine(user1_embedding, user2_embedding)

# Example: Recommend users for a given user
def recommend_users(target_user, threshold=0.5):
    similarities = [(user, calculate_similarity(target_user, user)) for user in user_profiles]
    filtered_recommendations = [(user, similarity) for user, similarity in similarities if similarity > threshold]
    sorted_recommendations = sorted(filtered_recommendations, key=lambda x: x[1], reverse=True)
    return sorted_recommendations

# Example: Recommend users for 'user1' with a similarity threshold of 0.6
recommendations = recommend_users('user1', threshold=0.0)
print(f"Recommendations for user1: {recommendations}")
