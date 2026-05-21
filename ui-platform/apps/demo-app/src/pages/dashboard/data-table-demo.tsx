import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Input,
  Button,
  Badge,
  Checkbox,
} from '@ui-platform/ui';
import { HStack } from '@ui-platform/layouts';
import { formatCurrency, formatDate } from '@ui-platform/utils';

interface Order {
  id: string;
  customer: string;
  email: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  amount: number;
  date: Date;
}

const data: Order[] = [
  { id: 'ORD-001', customer: 'John Smith', email: 'john@example.com', status: 'completed', amount: 1250.00, date: new Date('2024-01-15') },
  { id: 'ORD-002', customer: 'Sarah Johnson', email: 'sarah@example.com', status: 'processing', amount: 890.50, date: new Date('2024-01-14') },
  { id: 'ORD-003', customer: 'Michael Brown', email: 'michael@example.com', status: 'pending', amount: 2100.00, date: new Date('2024-01-13') },
  { id: 'ORD-004', customer: 'Emily Davis', email: 'emily@example.com', status: 'completed', amount: 450.75, date: new Date('2024-01-12') },
  { id: 'ORD-005', customer: 'David Wilson', email: 'david@example.com', status: 'cancelled', amount: 750.00, date: new Date('2024-01-11') },
  { id: 'ORD-006', customer: 'Lisa Anderson', email: 'lisa@example.com', status: 'completed', amount: 1875.25, date: new Date('2024-01-10') },
  { id: 'ORD-007', customer: 'James Taylor', email: 'james@example.com', status: 'processing', amount: 320.00, date: new Date('2024-01-09') },
  { id: 'ORD-008', customer: 'Jennifer White', email: 'jennifer@example.com', status: 'pending', amount: 1560.00, date: new Date('2024-01-08') },
];

const statusColors: Record<Order['status'], 'default' | 'info' | 'success' | 'error'> = {
  pending: 'default',
  processing: 'info',
  completed: 'success',
  cancelled: 'error',
};

export function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: 'id',
        header: 'Order ID',
        cell: ({ row }) => (
          <span className="font-mono text-sm">{row.getValue('id')}</span>
        ),
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.getValue('customer')}</p>
            <p className="text-xs text-[var(--color-foreground-muted)]">
              {row.original.email}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as Order['status'];
          return (
            <Badge variant={statusColors[status]} size="sm">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'amount',
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => (
          <div className="text-right font-medium">
            {formatCurrency(row.getValue('amount'))}
          </div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Date',
        cell: ({ row }) => formatDate(row.getValue('date'), { dateStyle: 'medium' }),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  return (
    <Card>
      <CardHeader>
        <HStack justify="between" align="center" fullWidth>
          <CardTitle>Recent Orders</CardTitle>
          <Input
            placeholder="Search orders..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-[300px]"
            size="sm"
          />
        </HStack>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <HStack justify="between" align="center" className="p-[var(--spacing-lg)] border-t border-[var(--color-border)]">
          <span className="text-sm text-[var(--color-foreground-muted)]">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </span>
          <HStack gap="sm">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </HStack>
        </HStack>
      </CardContent>
    </Card>
  );
}
