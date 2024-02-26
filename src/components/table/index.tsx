import orderBy from 'lodash/orderBy';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useSkipRunEffectForTheFirstTime from 'hooks/useSkipRunEffectForTheFirstTime';
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import Paper from '@mui/material/Paper';

import { TStyledTableCell } from './table.styled';

export type TTableSortTypes = 'asc' | 'desc';

export type TColumnType = ReactNode | string | number | undefined;

export interface RenderCellParams<T = Record<string, TColumnType>> {
  value?: TColumnType;
  getValue?: (_id: TColumnType, field: keyof T) => TColumnType | null;
  getCol?: (field: keyof T) => TColumnType | null;
  _id?: TColumnType;
  index?: number;
}

export interface TTableColumnData<T = Record<string, TColumnType>> {
  field: string;
  headerName?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  sortable?: boolean;
  defaultSort?: TTableSortTypes;
  renderCell?: (params: RenderCellParams<T>) => ReactNode;
  formatValue?: (params: RenderCellParams<T>) => TColumnType;
  width?: number;
  hidden?: boolean;
}

export type TTableRowData = {
  _id: TColumnType;
  [key: string]: TColumnType;
};

export type TTableProps = {
  rows: TTableRowData[];
  columns: TTableColumnData[];
  disabledRows?: string[];
  onSorting?: (sorting: { field: string; direction: TTableSortTypes } | null) => void;
  loading?: boolean;
  hideHeader?: boolean;
  paginationProps?: TablePaginationProps;
};

const TTable = ({ columns, rows, disabledRows, onSorting, loading, hideHeader, paginationProps }: TTableProps) => {
  const defaultAlign = 'left';
  const [sortedData, setSortData] = useState(rows);
  const [sorting, setSorting] = useState<{ [key: string]: TTableSortTypes }>({});

  const onSortColumn = (column: TTableColumnData) => {
    if (column.sortable) {
      if (!sorting[column.field]) {
        setSorting({ [column.field]: column.defaultSort || 'desc' });
        return;
      }
      if (sorting[column.field] === 'desc') {
        setSorting({ [column.field]: 'asc' });
        return;
      }
      if (sorting[column.field] === 'asc') {
        setSorting({});
      }
    }
  };

  const reorderedRows: TTableRowData[] = useMemo(
    () =>
      sortedData.map((row: TTableRowData) =>
        Object.fromEntries(columns.map((column) => [[column.field], row[column.field]])),
      ),
    [sortedData],
  );

  const toPercent = (value: number) => `${value}%`;

  useSkipRunEffectForTheFirstTime(() => {
    const [sortField, sortDirection] = Object.entries(sorting || {})[0] || [];
    if (!!sortField && !!sortDirection) {
      onSorting?.({
        field: sortField,
        direction: sortDirection,
      });
      const dataRows = orderBy(rows, sortField, sortDirection);
      setSortData(dataRows);
      return;
    }
    onSorting?.(null);
    setSortData(rows);
  }, [sorting]);

  useEffect(() => {
    setSortData(rows);
  }, [rows]);

  if (loading) {
    return (
      <Box textAlign="center" width="100%">
        <CircularProgress size={30} />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <Box component="colgroup">
          {columns.map((column) =>
            column.hidden ? null : (
              <Box component="col" key={column.field} width={toPercent(column.width || 100 / columns.length)} />
            ),
          )}
        </Box>
        {!hideHeader && (
          <TableHead>
            <TableRow>
              {columns.map((column, index) =>
                column.hidden ? null : (
                  <TableCell key={index} align={column?.align}>
                    <TableSortLabel
                      active={!!sorting?.[column.field]}
                      direction={!!sorting?.[column.field] ? sorting?.[column.field] : undefined}
                      IconComponent={ArrowDropDownIcon}
                      onClick={() => {
                        if (column) {
                          onSortColumn(column);
                        }
                      }}
                    >
                      {column?.headerName}
                    </TableSortLabel>
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {reorderedRows.map((row, index) => {
            const rowKeys = Object.keys(row);
            return (
              <TableRow key={index}>
                {rowKeys.map((key) => {
                  const columnProperties = columns.find((column) => column.field === key);
                  const isDisabled = !!disabledRows?.map((item) => String(item)).includes(String(row.id));
                  return columnProperties?.hidden ? null : (
                    <TStyledTableCell key={key} align={columnProperties?.align || defaultAlign} disabled={isDisabled}>
                      {columnProperties?.renderCell
                        ? columnProperties.renderCell({
                            value: row[key],
                            _id: row._id,
                            getValue: (_id, field) => {
                              const foundRow = reorderedRows.find((reorderedRow) => String(reorderedRow._id) === _id);
                              return foundRow ? foundRow[field] : null;
                            },
                            getCol: (field) => {
                              return row[field];
                            },
                            index,
                          })
                        : columnProperties?.formatValue?.({
                            value: row[key],
                            _id: row._id,
                            getValue: (_id, field) => {
                              const foundRow = reorderedRows.find((reorderedRow) => String(reorderedRow._id) === _id);
                              return foundRow ? foundRow[field] : null;
                            },
                            getCol: (field) => {
                              return row[field];
                            },
                          }) || row[key]}
                    </TStyledTableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {paginationProps && <TablePagination component="div" {...paginationProps} />}
    </TableContainer>
  );
};

export default TTable;
