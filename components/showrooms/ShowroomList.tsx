import { SHOWROOMS } from "@/content/showrooms";
import { SelectableRow } from "@/components/ui/SelectableRow";

interface ShowroomListProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

/**
 * 05 Showrooms – "All showrooms" list. Two columns, read down the left column then
 * the right (alphabetical, as in the data), so every location is visible at once.
 */
export function ShowroomList({ selectedIndex, onSelect }: ShowroomListProps) {
  const rows = Math.ceil(SHOWROOMS.length / 2);
  return (
    <div className="absolute left-[1290px] top-[170px] flex w-[534px] flex-col gap-1.5">
      <div className="pb-1 pl-1 text-[22px] uppercase tracking-[0.3em] text-ink-4">All showrooms</div>
      <div className="grid grid-flow-col grid-cols-2 gap-2" style={{ gridTemplateRows: `repeat(${rows}, auto)` }}>
        {SHOWROOMS.map((showroom, i) => (
          <SelectableRow
            key={showroom.id}
            variant="showroom-compact"
            index={i}
            title={showroom.city}
            subtitle={showroom.area}
            selected={i === selectedIndex}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
