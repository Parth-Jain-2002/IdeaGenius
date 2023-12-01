def questions_answer(answer):
    prompt = f"""1. Current challenge or pain point? {str(answer[0])}
            2. Desired positive change? {answer[1]}
            3. Interest or industry preference? {answer[2]}
            4. Any budget or time limits? {answer[3]}
            5. Preferred technologies or trends? {answer[4]}"""
    
    return prompt

def idea_generation(answer, source_documents):
    # Step 1: Format user's answers using the provided function
    formatted_answers = questions_answer(answer)

    # Step 2: Provide context for Trumio, the AI-driven University Project Ecosystem
    prompt = f"""The insights and valid points from the source documents are: {source_documents}. Use this, if found relevant, to generate 4 unique disjoint problem statements for alumni/clients, which can then be addressed with college students.

    Now, as part of our continued innovation, we are developing "IdeaGenius" to address ideation and market research challenges. Users have responded to five key questions, and their insights are outlined below:

    {formatted_answers}

    Your task is to generate four unique and well-defined problem statements for alumni/clients. These statements will serve as the foundation for collaborative projects with college students. Each problem statement should be logical, meaningful, and considerate of budget, time constraints, and required technologies. The objective is to propose ideas that alumni/clients find compelling to pursue further."""

    # Step 3: Return the refined prompt
    return prompt

def final_source_generation(source_documents, answer):
    # Step 1: Format user's answers using the provided function
    formatted_answers = questions_answer(answer)

    # Step 2: Provide context and introduce the collected source documents
    prompt = f"""We are creating “IdeaGenius” as a platform to solve ideation and market research problems. 
    We have asked users these 5 questions, and their responses are as follows: {formatted_answers}.
    We need to generate 4 unique disjoint problem statements for alumni/clients, which can then be addressed with college students.

    We have collected all the valid points from source documents. Those points are: {source_documents}. 
    Generate the final list of points from these source documents that can be used to formulate the problem statements."""

    # Step 3: Return the generated prompt
    return prompt

def source_document_generation(answer):
    # Step 1: Format user's answers using the provided function
    formatted_answers = questions_answer(answer)

    # Step 2: Introduce the context of "IdeaGenius" platform and user responses
    prompt = f"""We are developing "IdeaGenius," a platform dedicated to solving ideation and market research challenges. Users have provided responses to 5 questions, outlined as follows: {formatted_answers}.

    Now, the next step is to generate 4 unique, disjoint problem statements for alumni/clients, which will be collaboratively addressed with college students. To achieve this, we will leverage source documents. If there are relevant points in the source documents that can contribute to formulating the problem statements, we need to identify and utilize them.

    Your task is to extract 5-7 valid points from the source documents that can be instrumental in crafting the problem statements. If no relevant points are found, please return 'No valid points found.'
    
    Return each idea with title, description and target audience. For example, "Problem Statement 1: \nTitle: IdeaGenius \n Description: A platform to solve ideation and market research problems \n Target Audience: Alumni/Clients"
    """

    # Step 3: Return the refined prompt
    return prompt