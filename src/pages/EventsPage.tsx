import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        categories={categories}
        onCategoryChange={setCategory}
      />
      {filtered.length > 0 && (
        <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>
      )}
      <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
    </>
  );
}
