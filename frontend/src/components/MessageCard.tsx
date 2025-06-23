

const MessageCard = () => {
  return (
    <div className="rounded-lg bg-white w-full p-2 sm:p-4 cursor-pointer hover:scale-[1.01] transition-all">
        <div className="flex flex-col">
            <p className="text-sm sm:text-base">Topic?</p>
            <div className="w-full bg-gray-100 p-3 mt-1 rounded-xl">
                <p className="text-sm sm:text-base">Message</p>
            </div>
        </div>
    </div>
  )
}

export default MessageCard