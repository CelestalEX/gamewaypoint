import ReadingProgress from "@/components/ReadingProgress"

export default function GuideLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (

    <div className="min-h-screen max-w-7xl mx-auto grid grid-cols-[minmax(0,900px)_260px] gap-16 px-6 py-10">
      <ReadingProgress />
      <main className="col-span-9 min-w-0">
        {children}
      </main>

      <aside>
        
      </aside>

    </div>
  )
}