import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox(props) {
  const { isRed, active, title, cases, total, onClick } = props;
  return (
    <Card
      onClick={onClick}
      className={`infobox ${active && "infobox--selected"} ${
        isRed && "infobox--red"
      }`}
    >
      <CardContent className="infoBox__cardContent">
        <div>
          <Typography className="infoBox__title">{title}</Typography>
        </div>
        <div className="infoBox__counts">
          <Typography
            className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}
          >
            {cases}
          </Typography>
          <Typography className="infoBox__total">{total}</Typography>
        </div>
      </CardContent>
      {/* <div>No.of cases</div>
      <div>
        <div>+2000</div>
        <div>1.2M Total</div>
      </div> */}
    </Card>
  );
}

export default InfoBox;
