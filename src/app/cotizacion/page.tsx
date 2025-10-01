
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import PageEquipos from "./pageEquipos"
import PagePersonas from "./pagePersonas"

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="equipos" className="w-full">
        <TabsList>
          <TabsTrigger value="equipos">Equipos</TabsTrigger>
          <TabsTrigger value="personas">Personas</TabsTrigger>
        </TabsList>
        <TabsContent value="equipos">
          <PageEquipos/>
        </TabsContent>
        <TabsContent value="personas">
          <PagePersonas/> 
        </TabsContent>
      </Tabs>
    </div>
  )
}
