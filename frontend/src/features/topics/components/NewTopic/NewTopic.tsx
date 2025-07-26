import Card from "@/shared/components/Card/Card"
import { NewTopicForm } from ".."

const NewTopicPage = () => {
  return (
   <div className="flex flex-col sm:flex-row gap-2">
      <Card>
         <NewTopicForm />
      </Card>
      {/* <Card>
         <TopicP />
      </Card> */}
   </div>
  )
}

export default NewTopicPage