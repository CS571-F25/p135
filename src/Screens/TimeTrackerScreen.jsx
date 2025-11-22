import TimeTracker from "../components/TimeTracker";

export default function TimeTrackerScreen() {
  return (
    <>
      <header className="header">
        <h2>Time Tracker</h2>
        <p className="muted">
          Log how many minutes you spend on activities like dancing, social media,
          or other screen time.
        </p>
      </header>

      <main className="main">
        <div className="left">
          <TimeTracker />
        </div>
        <div className="right">
        </div>
      </main>
    </>
  );
}
