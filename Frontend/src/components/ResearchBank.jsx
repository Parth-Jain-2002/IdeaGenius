import imagem from "../assets/images/IdeaGenLogo.png"
import ResearchCard from "./ResearchCard"
import { useAuth } from "../contexts/AuthContext"

export default function ResearchBank() {
    const {userInfo} = useAuth()

  return (
    <section className="grid h-screen grid-cols-5">
      <aside className="flex flex-col items-center justify-between p-4 bg-[#efefef] dark:bg-zinc-900 border-r">
        <div className="flex items-center space-x-2">
          <img
            alt="Logo"
            className="rounded-full mr-2"
            height="50"
            src={imagem}
            style={{
              aspectRatio: "50/50",
              objectFit: "cover",
            }}
            width="50"
          />
          <h1 className="text-2xl font-bold">IDEAGEN</h1>
        </div>
        <div className="space-y-4 text-center">
          <h2 className="text-lg font-semibold border-b">My Ideas</h2>
          <div className="collapsible">
                <div className="collapsible-trigger flex items-center w-full">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 transform transition-transform duration-200 [&[data-state=open]>svg]:rotate-90 mr-2"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                    </svg>
                    Idea 1
                </div>
                <div className="collapsible-content">
                    <ul className="list-disc list-inside space-y-1">
                    <li>Document 1</li>
                    <li>Document 2</li>
                    </ul>
                </div>
                </div>

                <div className="collapsible">
                <div className="collapsible-trigger flex items-center w-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 transform transition-transform duration-200 [&[data-state=open]>svg]:rotate-90 mr-2"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                    </svg>
                    Idea 2
                </div>
                <div className="collapsible-content">
                    <ul className="list-disc list-inside space-y-1">
                    <li>Document 1</li>
                    <li>Document 2</li>
                    </ul>
                </div>
                </div>
        </div>
        <button className="w-4/5 flex justify-center items-center space-x-2 bg-black rounded-full p-2 text-white">
            <IconLightningbolt className="h-5 w-5 mr-2" />
          Upgrade
        </button>
      </aside>
      <main className="flex flex-col col-span-4 p-4">
        <section className="flex items-center justify-between mb-4">
        <input
            className="w-1/2 p-2 border border-gray-300 rounded-full"
            placeholder="Converse with the research bank"
            type="text"
        />
          <div className="flex items-center space-x-2">
            <svg
                className=" h-6 w-6 text-gray-600 dark:text-gray-300"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-lg">{userInfo? userInfo.name : ""}</span>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Research Bank</h2>
          <div className="grid grid-cols-3 gap-4">
            <ResearchCard imgSrc="https://picsum.photos/id/201/200/200" title="Research 1" url="https://www.google.com" />
            <ResearchCard imgSrc="https://picsum.photos/id/102/200/200" title="Research 1" url="https://www.google.com" />
            <ResearchCard imgSrc="https://picsum.photos/id/31/200/200" title="Research 1" url="https://www.google.com" />
            </div>
        </section>
      </main>
    </section>
  )
}

function IconChevronright(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function IconLightningbolt(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  )
}



