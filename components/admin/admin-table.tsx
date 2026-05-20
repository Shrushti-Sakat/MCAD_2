"use client";

import { Pencil, Trash2 } from "lucide-react";

type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export function AdminTable<T>({ columns, data, onEdit, onDelete }: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border/70 bg-white/90 shadow-soft p-6 text-center">
        <p className="text-sm text-muted">No data to display</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-border/70 bg-white/90 shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border/80 text-sm">
            <thead className="bg-brand-soft/60 text-left text-muted">
              <tr>
                {columns.map((col) => (
                  <th key={col.header} className="px-4 py-3 font-semibold whitespace-nowrap">
                    {col.header}
                  </th>
                ))}
                {(onEdit || onDelete) && <th className="px-4 py-3 font-semibold text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-soft/30">
                  {columns.map((col) => (
                    <td key={col.header} className="px-4 py-3 text-foreground/90 text-sm">
                      {col.accessor(row)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {onEdit ? (
                          <button
                            className="rounded-2xl border border-border px-3 py-2 text-xs font-semibold text-foreground hover:border-brand hover:text-brand transition touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                            onClick={() => onEdit(row)}
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </button>
                        ) : null}
                        {onDelete ? (
                          <button
                            className="rounded-2xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 transition touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                            onClick={() => onDelete(row)}
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline ml-1">Delete</span>
                          </button>
                        ) : null}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((row, idx) => (
          <div key={idx} className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-soft">
            <div className="space-y-3">
              {columns.map((col) => (
                <div key={col.header} className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark flex-shrink-0">
                    {col.header}
                  </span>
                  <span className="text-sm text-foreground/90 text-right flex-1 break-words">
                    {col.accessor(row)}
                  </span>
                </div>
              ))}
            </div>

            {(onEdit || onDelete) && (
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/50">
                {onEdit ? (
                  <button
                    className="flex-1 rounded-2xl border border-border px-3 py-2.5 text-xs font-semibold text-foreground hover:border-brand hover:text-brand transition touch-manipulation min-h-[44px] flex items-center justify-center gap-2"
                    onClick={() => onEdit(row)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                ) : null}
                {onDelete ? (
                  <button
                    className="flex-1 rounded-2xl border border-red-200 px-3 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-50 transition touch-manipulation min-h-[44px] flex items-center justify-center gap-2"
                    onClick={() => onDelete(row)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
