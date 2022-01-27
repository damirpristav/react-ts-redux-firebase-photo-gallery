import React, { FC, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector, useDispatch } from "react-redux";
import { getEntry, deleteEntry } from "../../store/actions/enrtyActions";
import { RootState } from "../../store";
import { UserEntry } from "../../store/types";
import { Button } from "@mui/material";

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { UserEntry, entryLoaded } = useSelector(
    (state: RootState) => state.UserEntry
  );

  const entryDelete = (UserEntry: any) => {
    setLoading(true);
    dispatch(deleteEntry(UserEntry, () => setLoading(false)));
  };

  useEffect(() => {
    if (!entryLoaded) {
      dispatch(getEntry());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="dashbord py-5">
      <div className="container-fluid">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Daily Entry </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {UserEntry.length > 0 && (
              <div className="cards-wrapper">
                {UserEntry.map((UserEntry: UserEntry) => (
                  <>
                    {/* {UserEntry.projectName} */}
                    {/* <div
                      dangerouslySetInnerHTML={{
                        __html: UserEntry.description,
                      }}
                    ></div> */}
                    {UserEntry.workDate.toDate().toDateString()}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => entryDelete(UserEntry)}
                    >
                      {loading ? "loaing..." : "loaing"}
                    </Button>
                    {error}
                  </>
                ))}
              </div>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
};

export default Dashboard;
