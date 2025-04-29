type Props = {
  content: string
  isSender: boolean
};

export default function MessageBubble({ content, isSender }: Props) {
  return (
    <div className={`max-w-[70%] p-3 rounded-xl shadow text-sm ${
      isSender
        ? 'ml-auto bg-indigo-600 text-white'
        : 'mr-auto bg-gray-100 text-gray-800'
    }`}>
      {content}
    </div>
  )
}
