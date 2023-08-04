import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { createContext, useState } from "react";
import { ChevronDown } from "react-feather";
import "../sass/home.scss";
import Details from "./details";

const Home = ({ user, usersData, setUsersData, search }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="home">
      <div className="home_container">
        <Accordion expanded={expanded} className="home_container-accordion">
          <AccordionSummary
            expandIcon={
              <ChevronDown size={25} onClick={(e) => setExpanded(!expanded)} />
            }
          >
            <div className="home_container-accordion-summary">
              <img
                className="home_container-accordion-summary-img"
                src={user.picture}
                alt="userImage"
              />
              <h4 className="home_container-accordion-summary-h4">
                {user.first} {user.last}
              </h4>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <Details
              user={user}
              usersData={usersData}
              setUsersData={setUsersData}
              search={search}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
