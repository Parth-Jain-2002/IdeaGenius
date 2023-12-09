import React from "react";

import image from "../../assets/images/Process-amico.png";

/**
 * This is the Use Cases Section for the landing page
 * @returns {React.Component} Use Cases Section
 */
export default function UseCases() {
  return (
    <div className="w-full h-full flex justify-evenly gap-2">
      <div className="h-full w-[35%] my-auto">
        <img src={image} alt="process" />
      </div>
      <div className="h-full w-[65%] flex flex-col justify-evenly">
        <UseCaseCard
          scenario="Efficient Project Ideation"
          content="Scenario: Clients seeking innovative project ideas tailored to their needs."
          howIdeaGeniusHelps="How IdeaGenius Helps: The platform stimulates creativity through thought-provoking questions, employs AI-driven processes for idea generation, and offers real-time market insights, enabling clients to efficiently ideate and formulate project statements."
        />

        <UseCaseCard
          scenario="Data-Driven Decision Support"
          content="Scenario: Clients navigating the project lifecycle and requiring informed decisions."
          howIdeaGeniusHelps="How IdeaGenius Helps: IdeaGenius provides continuous data analysis, ensuring clients have access to the latest industry insights, competitor analysis, and trends, empowering them to make informed, data-driven decisions."
        />

        <UseCaseCard
          scenario="Cross-Disciplinary Collaboration"
          content="Scenario: University clubs fostering cross-disciplinary innovation."
          howIdeaGeniusHelps="How IdeaGenius Helps: The platform serves as a dynamic networking hub, connecting alumni and providing a virtual space for collaboration, sharing experiences, and collectively refining and visioning project ideas, promoting cross-disciplinary collaboration."
        />

        <UseCaseCard
          scenario="Streamlined Knowledge Repository"
          content="Scenario: University leveraging past projects for future students and researchers."
          howIdeaGeniusHelps="How IdeaGenius Helps: IdeaGenius contributes to building a comprehensive knowledge repository of past projects, providing valuable insights for future students, researchers, and contributing to the continuous improvement of university programs."
        />

      </div>
    </div>
  )
}

/**
 * A component to display one of IdeaGenius' possible use cases
 * @param {{scenario: string, content: string, howIdeaGeniusHelps: string}} props Properties describing one of IdeaGenius' possible use cases
 * @returns {React.Component} A card displaying the details
 */
function UseCaseCard({ scenario, content, howIdeaGeniusHelps }) {
  return (
    <div className="p-4 bg-white shadow-lg mb-4 rounded-2xl h-36">
      <h1 className="text-lg font-medium text-[#6c69dc] mb-1">{scenario}</h1>
      <p className="text-xs text-gray-500 mb-2">{content}</p>
      <h1 className="text-sm font-medium text-[#6c69dc] mb-1">How IdeaGenius Helps</h1>
      <p className="text-xs text-gray-500 ">{howIdeaGeniusHelps}</p>
    </div>
  );
}