import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, Card, CardContent } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = _ => ({});

const Covid19 = () => (
  <Grid item md={6}>
    <Typography variant="h3">COVID-19 effects:</Typography>
    <Card>
      <CardContent>
        <Typography component="p">
          Gurula will be closed starting from March 18.
        </Typography>
        <Typography component="p">
          For more information, visit helsinki.fi and/or hyy.fi
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default withStyles(styles)(Covid19);
