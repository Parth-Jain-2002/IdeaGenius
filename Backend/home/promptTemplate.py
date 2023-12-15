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

    Now, as part of our continued innovation, we are developing "IdeaGenius" to Aress ideation and market research challenges. Users have responded to five key questions, and their insights are outlined below:

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


def idea_info(idea):
    prompt= f""" The deatils of the idea are: 
        Title: {idea.title},
        Description: {idea.description},
        Time_insight: {str(idea.time_insight)},
        Cost_insight: {str(idea.cost_insight)},
        Subtask: {idea.subtask},

        Some of the fields might be empty. But don't need to consider them.
    """

    return prompt

def generate_cost_insights_prompt(idea):
    prompt = f""" We are creating “IdeaGenius” as a platform to solve ideation and market research problems.
    This is for a platform that enables alumni/clients to collaborate with college students on projects.
    So, we are generating cost insights for the idea:

    {idea_info(idea)}

    We need to generate cost insights for this idea. 
    """

    prompt += "The cost should in rupees should be within proper double quotes. All property name should be within proper double quotes. Return the JSON object with the following fields: cost, explanation, and note(if any)"

    return prompt

def generate_time_insights_prompt(idea):
    prompt = f""" We are creating “IdeaGenius” as a platform to solve ideation and market research problems.
    This is for a platform that enables alumni/clients to collaborate with college students on projects.
    So, we are generating time insights for the idea:

    {idea_info(idea)}

    We need to generate time insights for this idea. 
    """

    prompt += "The time should in days and should be within proper double quotes. All property name should be within proper double quotes. Return the JSON object with the following fields: time, explanation, and note(if any)"

    return prompt

def generate_subtasks_prompt(idea):
    prompt = f""" We are creating “IdeaGenius” as a platform to solve ideation and market research problems.
    This is for a platform that enables alumni/clients to collaborate with college students on projects.
    So, we are generating subtasks for the idea:

    {idea_info(idea)}

    We need to generate subtasks for this idea. 
    """

    prompt += "They should be meaningful and clear> Justify if you made any assumptions."

    return prompt

def generate_keywords_prompt(idea):
    prompt = f""" We are creating “IdeaGenius” as a platform to solve ideation and market research problems.
    This is for a platform that enables alumni/clients to collaborate with college students on projects.
    So, we are generating keywords for the idea:

    {idea_info(idea)}

    We need to generate google_search_keywords, people_search_keywords, student_team_search_keywords and investor_search_keywords
    for this idea. Google_search_keywords are the keywords that can be used to search the market insights for the idea. People_search_keywords are the keywords that can be used to search the link minded people or people who can guide in this idea.Student_team_search_keywords are the keywords that can be used to search the students who can be interested in the idea. Investor_search_keywords are the keywords that can be used to search the investors who can be interested in the idea.
    """

    prompt += """The keywords should be in JSON format. All property name should be within proper double quotes. There should be 3-5 keywords in each list.
    The format instruction is as follows: 
    {
        "google_search_keywords": ["keyword1", "keyword2", "keyword3"],
        "people_search_keywords": ["keyword1", "keyword2", "keyword3"],
        "student_team_search_keywords": ["keyword1", "keyword2", "keyword3"],
        "investor_search_keywords": ["keyword1", "keyword2", "keyword3"]
    }
    """

    return prompt

def generate_similar_insights_prompt(topic):
    prompt = f""" We are creating “IdeaGenius” as a platform to solve ideation and market research problems.
    This is for a platform that enables alumni/clients to collaborate with college students on projects.
    So, we are generating similar insights for the idea:

    {idea_info(topic)}

    Ideally, the similar insights would have come from the platform itself. But, since we are still in the development phase, we need to generate them manually. Similar insights are the insights that would come from projects that are similar to the idea.
    These insights serve as a learning experience for alumni/clients and students. They can be used to improve the idea or to avoid mistakes that were made in the past.
    """

    prompt += "The similar insights should be meaningful and clear. Justify if you made any assumptions."

    return prompt



def student_idea_generation(answer, source_documents):
    formatted_answers = questions_answer(answer)
    prompt = f"""The insights and valid points from the source documents are: {source_documents}. Use this, if found relevant, to generate 4 unique disjoint project ideas for college students to help them gain experience for industry.

    Students have responded to five key questions, and their insights are outlined below:

    {formatted_answers}

    Your task is to generate four unique and well-defined project ideas for college students. These project ideas will help college students to upskill themselves and provide them with experience of working on industry level projects. Each project idea should be logical, meaningful, and considerate of difficulty level of the required technologies. Also highlight the skills required to solve the problem statement. The objective is to provide project ideas to college students to help them upskill in the considered technologies."""

    # Step 3: Return the refined prompt
    return prompt

def student_idea_info(idea):
    prompt= f""" The deatils of the idea are: 
        Title: {idea.title},
        Description: {idea.description}        
        
    """

    return prompt

def generate_learning_path_prompt(idea):
    prompt = f""" Given a project idea with details of project given as {student_idea_info(idea)}, create a detailed learning path in JSON format. The learning path should include the key milestones, tasks, and resources required for each step. Consider different aspects such as programming languages, frameworks, tools, and concepts that need to be covered.    

    Ensure that the JSON structure is well-organized, with clear keys and values for each task. Include relevant information such as estimated time for completion, difficulty level, and any prerequisites for each task.
    """
    
    prompt+="""
    Give a JSON object array in the following format:
    [{
        "milestone": "Milestone 1",
        "tasks": [
            {
            "task_name": {Task 1},
            "description": {Description of Task 1},
            "resources": [{Resource 1}, {Resource 2}],
            "estimated_time": {Time of Task 1},
            "difficulty": {Difficulty of Task 1},
            "prerequisites": [{Prerequisite 1}, {Prerequisite 2}]
            },
            { Task 2 }                      
        ]
    },
    { Milestone 2 },
    { Milestone 3 }        
    ]. Don't just return a paragraph.    
    """

    

    return prompt
    