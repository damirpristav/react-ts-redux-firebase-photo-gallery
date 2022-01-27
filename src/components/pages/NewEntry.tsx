import React, { FC, FormEvent, useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, Paper } from "@mui/material";

import { RootState } from "../../store";
import { addEntry } from "../../store/actions/enrtyActions";
import { useDispatch, useSelector } from "react-redux";

import { CKEditor } from "ckeditor4-react";

import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LoadingButton, DesktopDatePicker, TimePicker } from "@mui/lab";
import SendIcon from "@mui/icons-material/Save";

const project = [
  {
    value: "round",
    label: "round",
  },
  {
    value: "princess",
    label: "princess",
  },
  {
    value: "Emerald",
    label: "Emerald",
  },
  {
    value: "Marquise",
    label: "Marquise",
  },
  {
    value: "Oval",
    label: "Oval",
  },
  {
    value: "Asscher",
    label: "Asscher",
  },
  {
    value: "Heart",
    label: "Heart",
  },
];

const managerName = [
  {
    value: "Bhautik",
    label: "Bhautik",
  },
  {
    value: "Sanket",
    label: "Sanket",
  },
  {
    value: "Bhavin",
    label: "Bhavin",
  },
];

const NewEntry: FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [projectName, setProjectName] = useState("EUR");
  const [ManagerName, setManagerName] = useState("EUR");

  const [workDate, setWorkDate] = useState<Date | null>(null);
  const [workedHours, setWorkedHours] = useState<Date | null>(null);
  const [trackedHours, setTrackedHours] = useState<Date | null>(null);
  const [supportHours, setSupportHours] = useState<Date | null>(null);

  const [inTime, setInTime] = useState<Date | null>(null);
  const [breakInTime, setbreakIntime] = useState<Date | null>(null);
  const [breakOutTime, setbreakOuttime] = useState<Date | null>(null);
  const [teaBreakInTime, setteaBreakInTime] = useState<Date | null>(null);
  const [teaBreakOutTime, setteaBreakOutTime] = useState<Date | null>(null);
  const [outTime, setoutTime] = useState<Date | null>(null);

  const [description, setDescription] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      projectName,
      ManagerName,

      workDate,
      workedHours,
      trackedHours,
      supportHours,

      inTime,
      breakInTime,
      breakOutTime,
      teaBreakInTime,
      teaBreakOutTime,
      outTime,

      description,
    };
    if (user) {
      dispatch(addEntry(data, user, () => setLoading(false)));
    }
  };

  return (
    <div className="new-enrty">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <Paper elevation={3}>
              <Box
                sx={{
                  marginTop: 6,
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                component="form"
                noValidate
                onSubmit={submitHandler}
              >
                <Typography component="h1" variant="h5">
                  Add Daily Entry
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{ mt: 3 }}
                  style={{ width: "100%" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ my: 2 }}>
                      <TextField
                        id="standard-select-currency"
                        select
                        label="Select Your Diamond"
                        value={projectName}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setProjectName(event.target.value);
                        }}
                        // helperText="Please select your currency"
                        variant="standard"
                        fullWidth
                      >
                        {project.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 2 }}>
                      <TextField
                        id="standard-select-currency"
                        select
                        label="Manager Name"
                        value={ManagerName}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          setManagerName(event.target.value);
                        }}
                        variant="standard"
                        fullWidth
                      >
                        {managerName.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            value={workDate}
                            label="Work Date"
                            onChange={(newValue) => {
                              setWorkDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Worked Hour"
                            value={workedHours}
                            onChange={(newValue: Date | null) => {
                              setWorkedHours(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Tracked Hours"
                            value={trackedHours}
                            onChange={(newValue: Date | null) => {
                              setTrackedHours(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={3} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Management Support Hours"
                            value={supportHours}
                            onChange={(newValue: Date | null) => {
                              setSupportHours(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="In Time"
                            value={inTime}
                            onChange={(newValue: Date | null) => {
                              setInTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Break Time"
                            value={breakInTime}
                            onChange={(newValue: Date | null) => {
                              setbreakIntime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Break Out Time"
                            value={breakOutTime}
                            onChange={(newValue: Date | null) => {
                              setbreakOuttime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Tea Break In Time"
                            value={teaBreakInTime}
                            onChange={(newValue: Date | null) => {
                              setteaBreakInTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Tea Break Out Hours"
                            value={teaBreakOutTime}
                            onChange={(newValue: Date | null) => {
                              setteaBreakOutTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ my: 3 }}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <TimePicker
                            label="Out time"
                            value={outTime}
                            onChange={(newValue: Date | null) => {
                              setoutTime(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sx={{ my: 2 }}>
                    <CKEditor
                      onChange={(evt) => setDescription(evt.editor.getData())}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {loading ? (
                      <LoadingButton
                        endIcon={<SendIcon />}
                        loadingPosition="end"
                        variant="contained"
                      >
                        adding...
                      </LoadingButton>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="my-2"
                      >
                        Add
                      </Button>
                    )}
                  </Grid>
                  {/* {error && <Message type="danger" msg={error} />} */}
                </Box>
              </Box>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEntry;
