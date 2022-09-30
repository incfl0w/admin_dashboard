import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import GroupService from '../services/groupService';
import { Fragment, useEffect, useState } from 'react';
import { CircularProgress, Collapse, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditGroupForm from './form-components/editGroupForm';


const groupService = new GroupService()


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Id',
  },
  {
    id: 'Name',
    numeric: false,
    disablePadding: false,
    label: 'name',
  },
  {
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'description',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function GroupTable({ updates, setUpdates }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [openedId, setOpenedId] = useState(null)


  const [groups, setGroups] = useState(null);
  useEffect(() => {

    groupService.getAllGroups()
      .then(data => setGroups(data))
  }, [updates])




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };



  const handleRowDeleteClick = (id) => {
    setUpdates(updates + 1)
    groupService.deleteGroup(id)
  }

  const handleRowEditClick = (id) => {
    setUpdates(updates + 1)
    setOpen(!open);
    setOpenedId(id)
  }


  const renderDescription = (description) => {
    if (description.length < 50) {
      return description
    }
    return description.substring(0, 50) + "..."
  }
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groups.length) : 0;
  if (!groups) {
    return <CircularProgress />
  }
  else {
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={groups.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(groups, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <Fragment key={row.id}>
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.id}
                        >

                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                          > {row.id}</TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="right">{renderDescription(row.description)}</TableCell>

                          <TableCell align="right">
                            <IconButton
                              color="primary" aria-label="upload picture"
                              component="label"
                              onClick={() => { handleRowEditClick(row.id) }}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="label"
                              onClick={() => { handleRowDeleteClick(row.id) }}>
                              <DeleteOutlineIcon />
                            </IconButton>

                            <Divider orientation="vertical" flexItem />


                          </TableCell>
                        </TableRow>
                        {open && (openedId === row.id) && <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
                                  <TableBody>
                                    <TableRow key={row.id}>
                                      <TableCell component="th" scope="row">
                                        <EditGroupForm id={row.id}
                                          setUpdates={setUpdates} updates={updates}
                                          name={row.name}
                                          description={row.description}
                                          setOpen={setOpen} />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>}
                      </Fragment>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={groups.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    );
  }
}
