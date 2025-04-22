import MatchCard from './MatchCard'

export default function MatchTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'learn' | 'share';
  setActiveTab: (tab: 'learn' | 'share') => void;
}) {
  const matches = [
    { name: 'Jane Doe', skills: ['Pottery', 'Spanish'], bio: 'Loves creative projects!' },
    { name: 'Alex Kim', skills: ['Cooking'], bio: 'Chef and food blogger.' },
  ];

  return (
    <div>
      <div className="flex mb-4 space-x-2">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'learn' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Looking to Learn
        </button>
        <button
          onClick={() => setActiveTab('share')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'share' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Happy to Share
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {matches.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </div>
    </div>
  )
}