import HabitTracker from "./HabitTracker";



export default function DashboardHeader({ habitTotals }) {
    return (
    <header className="header">
          <h2>Dashboard</h2>
          <p className="muted">Top bar shows time spent by habit today</p>
          <HabitTracker totals={habitTotals} />
        </header>
    )
}