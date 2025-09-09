import { Activity } from "lucide-react"

const ActivityGraph = () => {
  return (
    <div className="w-full">
          <div className="flex flex-col bg-white w-full rounded-xl p-2 sm:p-4 shadow">
            <div className="flex items-center gap-1 py-1 ml-1 text-gray-700">
              <Activity size={20} />
              <h1 className="text-lg sm:text-xl rounded-xl">Activity</h1>
            </div>

            
          </div>
      </div>
  )
}

export default ActivityGraph