export default function ProfilePreview() {
  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white space-y-2">
      <div className="font-semibold text-lg">Your Profile</div>
      <p className="text-sm text-gray-600">Cass Cav – Frontend dev + Pilates lover!</p>
      <div className="flex flex-wrap gap-2">
        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">JavaScript</span>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Pilates</span>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Cooking</span>
      </div>
      <button className="w-full mt-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md py-1.5">
        Edit Profile
      </button>
    </div>
  )
}