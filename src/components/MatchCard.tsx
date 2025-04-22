export default function MatchCard({
  name,
  skills,
  bio,
}: {
  name: string;
  skills: string[];
  bio: string;
}) {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white space-y-2">
      <div className="text-lg font-semibold">{name}</div>
      <p className="text-sm text-gray-600">{bio}</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>
      <button className="w-full mt-2 text-sm bg-indigo-600 text-white py-1.5 rounded-md hover:bg-indigo-700">
        Message
      </button>
    </div>
  )
}