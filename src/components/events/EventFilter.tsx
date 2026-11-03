import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "";
  categories: Category[];
  onCategoryChange: (cat: Category | "") => void;
}

export default function EventFilter({
  searchText,
  onSearchChange,
  category,
  categories,
  onCategoryChange
}: EventFilterProps) {
  return (
    <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
      <p className="alan">
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          type="search"
          id="arama"
          placeholder="Örn. atölye, kariyer"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </p>
      <p className="alan">
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </p>
    </form>
  );
}
