import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchArtistsAsync, selectSearchResult } from "./searchSlice";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "./Search.module.css";

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Search() {
  const searchResult = useAppSelector(selectSearchResult);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("Ed Sheeran");
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(fetchArtistsAsync(searchTerm))}
        >
          Search Artists
        </button>
      </div>
      <div className={styles.row}>
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="center"
          container
          spacing={2}
        >
          {searchResult.results.map((result, index) => (
            <Grid justifyContent="center" item xs={12}>
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={`Track Name: ${result.trackName}`}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={result.artworkUrl100}
                  alt="track artwork"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <p>
                      <strong>Artist:</strong> {result.artistName}
                    </p>
                    <p>
                      <strong>Collection Name:</strong> {result.collectionName}
                    </p>
                    <p>
                      <strong>Country:</strong> {result.country}
                    </p>
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>more info:</Typography>
                    <Typography paragraph>
                      <p>
                        <strong>Preview Url:</strong>{" "}
                        <a href={result.previewUrl}>Click here</a>
                      </p>
                      <p>
                        <strong>Track Explicitness:</strong>{" "}
                        <a href={result.trackExplicitness}>Click here</a>
                      </p>
                    </Typography>
                    <Typography paragraph>
                      <p>
                        <strong>Track Price:</strong> {result.trackPrice}
                      </p>
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
