import { College } from "@/types";
import { formatCurrency, formatPackage } from "@/utils/format";

interface ComparisonTableProps {
  colleges: College[];
}

export default function ComparisonTable({ colleges }: ComparisonTableProps) {
  if (colleges.length === 0) return null;

  const fields = [
    { label: "Location", render: (c: College) => `${c.city}, ${c.state}` },
    { label: "Type", render: (c: College) => c.type },
    { label: "Established", render: (c: College) => String(c.establishedYear) },
    { label: "Annual Fees", render: (c: College) => formatCurrency(c.fees) },
    { label: "Rating", render: (c: College) => `${c.rating} / 5` },
    { label: "Placement %", render: (c: College) => `${c.placementPercentage}%` },
    { label: "Avg Package", render: (c: College) => formatPackage(c.averagePackage) },
    { label: "Highest Package", render: (c: College) => formatPackage(c.highestPackage) },
    { label: "Courses", render: (c: College) => String(c.courses.length) },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 bg-gray-50 border border-gray-200 font-semibold text-gray-700 min-w-[140px]">
              Field
            </th>
            {colleges.map((c) => (
              <th key={c.id} className="text-left p-3 bg-indigo-50 border border-gray-200 font-semibold text-indigo-700 min-w-[180px]">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.label} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200 font-medium text-gray-600 bg-gray-50">
                {field.label}
              </td>
              {colleges.map((c) => (
                <td key={c.id} className="p-3 border border-gray-200 text-gray-800">
                  {field.render(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
