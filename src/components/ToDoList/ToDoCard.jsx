import { MdQuiz, MdAssignment } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";

export default function ToDoCard({ item, index }) {
    const icon = {
        quiz: <MdQuiz className="text-2xl text-pink-500" />,
        assignment: <MdAssignment className="text-2xl text-pink-500" />,
        discussion_topic: <RiQuestionAnswerFill className="text-2xl text-pink-500" />,
    };
    // console.log(item);
    return (
        <div
            key={index}
            className={`w-full mb-4 flex items-center justify-between rounded-lg p-4 shadow-md ${item.marked_complete ? "bg-gray-200 line-through" : "bg-pink-100"}`}
        >
            <div>
                {icon[item.type]}
                <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-pink-500 hover:underline"
                >
                    {item.name}
                </a>
                <div className="text-sm text-gray-600">
                    Due: {new Date(item.due_at).toLocaleString()}
                </div>
            </div>
            {/* {!item.marked_complete && (
                <button
                    className="rounded-lg bg-green-200 px-3 py-1 transition duration-200 hover:bg-green-300"
                    onClick={() => markComplete(index)}
                >
                    Complete
                </button>
            )} */}
        </div>
    );
};
