import DashboardCards from "./components/DashboardCards"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-2 px-8 py-16">
        <Header title="Inicío" subtitle="Inicío" />
        <DashboardCards />
      </div>
    </div>
  )
}

export default HomePage
