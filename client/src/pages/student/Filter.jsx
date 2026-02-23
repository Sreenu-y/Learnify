import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const CATEGORIES = [
  "Next JS",
  "Data Science",
  "Frontend Development",
  "Fullstack Development",
  "MERN Stack Development",
  "Backend Development",
  "Javascript",
  "Python",
  "Docker",
  "MongoDB",
  "HTML",
];

const Filter = ({ changeFilterHandler }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const categoryChangeHandler = (id) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      changeFilterHandler(next, sortByPrice);
      return next;
    });
  };

  const sortByPriceHandler = (val) => {
    setSortByPrice(val);
    changeFilterHandler(selectedCategories, val);
  };

  return (
    <aside className="w-full md:w-56 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-black dark:text-white">Filters</h2>
        <Select onValueChange={sortByPriceHandler}>
          <SelectTrigger className="w-[120px] h-8 text-xs bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black dark:text-white rounded-lg">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#101010] border-black/10 dark:border-white/10 text-black dark:text-white">
            <SelectGroup>
              <SelectLabel className="text-black/40 dark:text-white/35 text-xs">
                Price
              </SelectLabel>
              <SelectItem
                value="low"
                className="hover:bg-black/5 dark:hover:bg-white/5"
              >
                Low → High
              </SelectItem>
              <SelectItem
                value="high"
                className="hover:bg-black/5 dark:hover:bg-white/5"
              >
                High → Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-black/[0.07] dark:bg-white/[0.07] mb-4" />

      <div>
        <h3 className="font-semibold text-sm text-black dark:text-white mb-3">
          Category
        </h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={cat}
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => categoryChangeHandler(cat)}
                className="border-black/20 dark:border-white/20 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=checked]:text-white dark:data-[state=checked]:text-black"
              />
              <Label
                htmlFor={cat}
                className="text-sm text-black/70 dark:text-white/60 cursor-pointer"
              >
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Filter;
