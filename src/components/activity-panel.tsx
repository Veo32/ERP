import { MessageSquareText, RadioTower } from "lucide-react";
import { activityEntries } from "@/lib/mock-data";

export function ActivityPanel() {
  return (
    <section className="activity-panel" aria-labelledby="activity-title">
      <div className="section-heading">
        <span className="heading-icon">
          <RadioTower size={18} />
        </span>
        <div>
          <h2 id="activity-title">سجل النشاط والتعاون</h2>
          <p>تتبّع الإنشاء والتعديل والتعليقات والإشارات.</p>
        </div>
      </div>
      <div className="activity-list">
        {activityEntries.map((entry) => (
          <article key={entry.id} className="activity-item">
            <div>
              <strong>{entry.actor}</strong>
              <span>{entry.action}</span>
              <small>{entry.target}</small>
            </div>
            <time>{entry.time}</time>
            {entry.comment ? (
              <p>
                <MessageSquareText size={15} />
                {entry.comment}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
