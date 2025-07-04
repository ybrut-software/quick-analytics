import { Badge } from "@/components/badge";
import { Divider } from "@/components/divider";

export function Stat({ title, value, change }) {
  return (
    <div className="my-6">
      <Divider />
      <div className="py-5">
        <div className="text-lg/6 font-medium sm:text-sm/6 capitalize">
          {title}
        </div>
        <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">
          {value}
        </div>
        <div className="mt-3 text-sm/6 sm:text-xs/6">
          <Badge color={change.startsWith("+") ? "lime" : "pink"}>
            {change}
          </Badge>{" "}
          <span className="text-zinc-500">from last week</span>
        </div>
      </div>
    </div>
  );
}
