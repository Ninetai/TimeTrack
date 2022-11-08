import React from "react";
import { useState, useEffect } from "react"
import { Container, Button, Select, Grid, InputLabel, MenuItem } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { increment, decrement, getCounter } from "./counterReducer";
import { useSelector, useDispatch } from "react-redux";

function createData(note, user, date, time) {
  return { note, user, date, time };
}
var today = new Date(),

  date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();


const rows = [
  createData('Frozen yoghurt', 'Cupcake', date, 1),
];
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  tablecell: {
    width: '25%',
    textAlign: 'right'
  }
}));

export default function Home() {
  const classes = useStyles();
  const [task, setTask] = useState('Task one');

  const handleChange = (event) => {
    setTask(event.target.value);
  };
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [flag, setFlag] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempSec, setTempSec] = useState(0);
  useEffect(() => {
    if (flag) {
      let myInterval = setInterval(() => {
        if (seconds === 60) {
          setSeconds(0);
          setMinutes(minutes + 1);
        }
        else {
          setSeconds(seconds + 1);
        }
      }, 1000)
      return () => {
        clearInterval(myInterval);
      };
    }
    else {
      setTempMin(minutes);
      setTempSec(seconds);
      setMinutes(0);
      setSeconds(0);
    }
  });

  const TimeTracker = () => {
    setFlag(1 - flag);
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container style={{ marginTop: '100px' }}>
        <Grid container spacing={3} style={{ textAlign: 'right', alignItems: 'center', marginBottom: '50px' }}>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Select Task</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={task}
                onChange={handleChange}
                label="Select Task"
              >
                <MenuItem value={'Task one'}>Task one</MenuItem>
                <MenuItem value={'Task two'}>Task two</MenuItem>
                <MenuItem value={'Task three'}>Task three</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            <Button style={{ width: '100px' }} variant="contained" onClick={TimeTracker}>{!flag ? 'Start' : 'Stop'}</Button>
          </Grid>
        </Grid>

        {/* ---------------------------timetracktable---------------- */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tablecell} >Notes</TableCell>
                <TableCell className={classes.tablecell}>Tracked By</TableCell>
                <TableCell className={classes.tablecell}>Date</TableCell>
                <TableCell className={classes.tablecell}>Time Tracked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.note}>
                  <TableCell align="right">{task}</TableCell>
                  <TableCell align="right">{row.user}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell align="right">{minutes}:{seconds}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};