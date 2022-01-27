import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEntry } from "../../store/actions/enrtyActions";
import { RootState } from "../../store";
import { UserEntry } from "../../store/types";

const Homepage: FC = () => {
  const dispatch = useDispatch();

  const { UserEntry, entryLoaded } = useSelector(
    (state: RootState) => state.UserEntry
  );

  useEffect(() => {
    if (!entryLoaded) {
      dispatch(getEntry());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section className="section">
      <div className="container">
        {UserEntry.length > 0 && (
          <div className="cards-wrapper is-flex mt-5">
            {UserEntry.map((UserEntry: UserEntry) => (
              <>
              {/* {UserEntry.projectName} */}
              <div>hjh</div>
              </>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Homepage;
