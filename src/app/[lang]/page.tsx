import ConsoleMessage from "@/src/components/Console/Message"
import ThreeApp from "@/src/components/ThreeApp"
import { LanguageType } from "@/src/types/language";

const App = ({ params }: { params: { lang: LanguageType } }) => {

  return (
    <>
      <ConsoleMessage />
      <ThreeApp lang={params.lang} />
    </>
  )
}

export default App
