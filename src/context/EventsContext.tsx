import { createContext, useContext, useState, type ReactNode } from "react";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim()
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData) {
    const newEvent = toEvent(`event-${Date.now()}`, data);
    setEvents([...events, newEvent]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(
      events.map((e) =>
        e.id === id ? { ...toEvent(id, data), image: e.image } : e
      )
    );
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// oxlint-disable-next-line react/only-export-components
export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (context === null) {
    throw new Error("useEvents, EventsProvider içinde kullanılmalı.");
  }
  return context;
}
