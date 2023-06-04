import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';

interface Data
{
  location: string;
  price: number;
  type: string;
  room_number: number;
}

function createData (
  location: string,
  price: number,
  type: string,
  room_number: number,
): Data
{
  return {
    location,
    price,
    type,
    room_number
  };
}

let labels = [ 'Location', 'Price', 'Type', 'Room number' ]

const rows = [
  createData( 'Cupcake', 305, 'HOUSE', 4 )
];

function descendingComparator<T> ( a: T, b: T, orderBy: keyof T )
{
  if ( b[ orderBy ] < a[ orderBy ] )
  {
    return -1;
  }
  if ( b[ orderBy ] > a[ orderBy ] )
  {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any> (
  order: Order,
  orderBy: Key,
): (
  a: { [ key in Key ]: number | string },
  b: { [ key in Key ]: number | string },
) => number
{
  return order === 'desc'
    ? ( a, b ) => descendingComparator( a, b, orderBy )
    : ( a, b ) => -descendingComparator( a, b, orderBy );
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T> ( array: readonly T[], comparator: ( a: T, b: T ) => number )
{
  const stabilizedThis = array.map( ( el, index ) => [ el, index ] as [ T, number ] );
  stabilizedThis.sort( ( a, b ) =>
  {
    const order = comparator( a[ 0 ], b[ 0 ] );
    if ( order !== 0 )
    {
      return order;
    }
    return a[ 1 ] - b[ 1 ];
  } );
  return stabilizedThis.map( ( el ) => el[ 0 ] );
}

interface HeadCell
{
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'location',
    numeric: false,
    disablePadding: true,
    label: labels[ 0 ],
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: labels[ 1 ],
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: labels[ 2 ],
  },
  {
    id: 'room_number',
    numeric: true,
    disablePadding: false,
    label: labels[ 3 ],
  }
];

interface EnhancedTableProps
{
  numSelected: number;
  onRequestSort: ( event: React.MouseEvent<unknown>, property: keyof Data ) => void;
  onSelectAllClick: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead ( props: EnhancedTableProps )
{
  const createSortHandler =
    ( property: keyof Data ) => ( event: React.MouseEvent<unknown> ) => { };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
        { headCells.map( ( headCell ) => (
          <TableCell
            key={ headCell.id }
            align={ headCell.numeric ? 'right' : 'left' }
            padding={ headCell.disablePadding ? 'none' : 'normal' }
          >
            <TableSortLabel
              onClick={ createSortHandler( headCell.id ) }
            >
              { headCell.label }
            </TableSortLabel>
          </TableCell>
        ) ) }
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps
{
  numSelected: number;
}

function EnhancedTableToolbar ( props: EnhancedTableToolbarProps )
{
  const { numSelected } = props;

  return (

    <Typography
      sx={ { flex: '1 1 100%' } }
      variant="h6"
      id="tableTitle"
      component="div"
    >
      Available Properties
    </Typography>

  );
}

export default function MyHomeTable ()
{

  const [ order, setOrder ] = React.useState<Order>( 'asc' );
  const [ orderBy, setOrderBy ] = React.useState<keyof Data>( 'location' );
  const [ selected, setSelected ] = React.useState<readonly string[]>( [] );
  const [ page, setPage ] = React.useState( 0 );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) =>
  {
    const isAsc = orderBy === property && order === 'asc';
    setOrder( isAsc ? 'desc' : 'asc' );
    setOrderBy( property );
  };

  const handleSelectAllClick = ( event: React.ChangeEvent<HTMLInputElement> ) =>
  {
    if ( event.target.checked )
    {
      const newSelected = rows.map( ( n ) => n.location );
      setSelected( newSelected );
      return;
    }
    setSelected( [] );
  };

  const handleClick = ( event: React.MouseEvent<unknown>, name: string ) =>
  {
    const selectedIndex = selected.indexOf( name );
    let newSelected: readonly string[] = [];

    if ( selectedIndex === -1 )
    {
      newSelected = newSelected.concat( selected, name );
    } else if ( selectedIndex === 0 )
    {
      newSelected = newSelected.concat( selected.slice( 1 ) );
    } else if ( selectedIndex === selected.length - 1 )
    {
      newSelected = newSelected.concat( selected.slice( 0, -1 ) );
    } else if ( selectedIndex > 0 )
    {
      newSelected = newSelected.concat(
        selected.slice( 0, selectedIndex ),
        selected.slice( selectedIndex + 1 ),
      );
    }

    setSelected( newSelected );
  };

  const handleChangePage = ( event: unknown, newPage: number ) =>
  {
    setPage( newPage );
  };

  const isSelected = ( name: string ) => selected.indexOf( name ) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max( 0, ( 1 + page ) * 5 - rows.length ) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort( rows, getComparator( order, orderBy ) ).slice(
        page * 5,
        page * 5 + 5,
      ),
    [ order, orderBy, page, 5 ],
  );
  return (
    <Box sx={ { width: '100%' } }>
      <Paper sx={ { width: '100%', mb: 2 } }>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */ }
        <TableContainer>
          <Table
            sx={ { minWidth: 750 } }
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={ selected.length }
              order={ order }
              orderBy={ orderBy }
              onSelectAllClick={ handleSelectAllClick }
              onRequestSort={ handleRequestSort }
              rowCount={ rows.length }
            />
            <TableBody>
              { visibleRows.map( ( row, index ) =>
              {
                // const isItemSelected = isSelected(row.location);
                // const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={ ( event ) => handleClick( event, row.location ) }
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={ -1 }
                    key={ row.location }
                    // selected={isItemSelected}
                    sx={ { cursor: 'pointer' } }
                  >

                    <TableCell>{ row.location }</TableCell>
                    <TableCell align="right">{ row.price }</TableCell>
                    <TableCell align="right">{ row.type }</TableCell>
                    <TableCell align="right">{ row.room_number }</TableCell>
                  </TableRow>
                );
              } ) }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={ [] }
          component="div"
          count={ rows.length }
          rowsPerPage={ 5 }
          page={ page }
          onPageChange={ handleChangePage }
        />
      </Paper>
    </Box>
  );
}