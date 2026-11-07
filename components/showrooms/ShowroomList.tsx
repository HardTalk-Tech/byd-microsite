import { SHOWROOMS, showroomName } from "@/content/showrooms";
import { SelectableRow } from "@/components/ui/SelectableRow";

interface ShowroomListProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

/** 05 Showrooms – "All showrooms" list (alphabetical, as in the data). */
export function ShowroomList({ selectedIndex, onSelect }: ShowroomListProps) {
  return (
    <div className="absolute left-[1290px] top-[170px] flex w-[534px] flex-col gap-1.5">
      <div className="pb-1 pl-1 text-[22px] uppercase tracking-[0.3em] text-ink-4">All showrooms</div>
      {SHOWROOMS.map((showroom, i) => (
        <SelectableRow
          key={showroom.id}
          variant="showroom"
          index={i}
          title={showroomName(showroom)}
          selected={i === selectedIndex}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
