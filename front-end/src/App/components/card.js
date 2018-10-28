import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Media card Functional Component
function MediaCard(props) {
  return (
    <Card style={{width:"100%"}}>
      <CardActionArea style={{width:"100%"}}>
        <CardContent style={{width:"100%"}}>
          <Typography align="left" gutterBottom variant="h5" component="h2"
              onClick={() => window.location.assign(props.link)}
          >
              {props.title}
          </Typography>
          <Typography align="left" component="p">
              {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          {props.stats}
      </CardActions>
    </Card>
  );
}

const styles = {
  card: {
    maxWidth: 3000
  },
  media: {
    height: 20
  }
};

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
