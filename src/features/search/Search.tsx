import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchArtistsAsync,
  selectSearchResult,
  selectSearchResultStatus,
} from "./searchSlice";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
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
import { Alert, Button, Container, Input, Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Search.module.css";
import { Box } from "@mui/system";

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

const Item = styled(Paper)(() => ({
  textAlign: "center",
}));

export function Search() {
  const searchResult = useAppSelector(selectSearchResult);
  const searchResultStatus = useAppSelector(selectSearchResultStatus);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("Ed Sheeran");
  const [expanded, setExpanded] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Container>
      <Box>
        <Typography paragraph>
          {" "}
          Search for your favorite artists, albums and/or songs. Expand details
          to see preview URLs.
        </Typography>
      </Box>
      <Box m={10}>
        {" "}
        <Input
          className={styles.textbox}
          aria-label="Set search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          className={styles.button}
          variant="contained"
          onClick={() => {
            dispatch(fetchArtistsAsync({ searchTerm }));
            setButtonPressed(true);
          }}
        >
          Search
        </Button>
        {searchResultStatus === "loading" && (
          <Typography paragraph>Loading</Typography>
        )}
      </Box>
      <div className={styles.row}>
        <Stack spacing={2}>
          {buttonPressed === true &&
            searchResultStatus !== "loading" &&
            searchResult.results.length === 0 && (
              <Item>
                <Box m={2} pt={3}>
                  <Alert severity="error">
                    No results where returned for this search
                  </Alert>
                </Box>
              </Item>
            )}
          {searchResult.results.length > 0 && (
            <InfiniteScroll
              dataLength={searchResult.results.length}
              next={() =>
                dispatch(
                  fetchArtistsAsync({
                    searchTerm,
                    offset: searchResult.results.length,
                  })
                )
              }
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <Typography style={{ textAlign: "center" }} paragraph>
                  <strong>Yay! You have seen it all</strong>
                </Typography>
              }
            >
              {searchResult.results.map((result, index) => (
                <Box mt={5} key={index}>
                  <Item>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                          >
                            R
                          </Avatar>
                        }
                        action={
                          <IconButton
                            aria-label="settings"
                            onClick={() => alert("functionality goes here")}
                          >
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
                          <Typography paragraph>
                            <strong>Artist:</strong> {result.artistName}
                          </Typography>
                          <Typography paragraph>
                            <strong>Collection Name:</strong>{" "}
                            {result.collectionName}
                          </Typography>
                          <Typography paragraph>
                            <strong>Country:</strong> {result.country}
                          </Typography>
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton
                          aria-label="add to favorites"
                          onClick={() => alert("functionality goes here")}
                        >
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton
                          aria-label="share"
                          onClick={() => alert("functionality goes here")}
                        >
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
                            <strong>Preview Url:</strong>{" "}
                            <a href={result.previewUrl}>Click here</a>
                          </Typography>
                          <Typography paragraph>
                            <strong>Track Explicitness:</strong>{" "}
                            {result.trackExplicitness === "notExplicit"
                              ? "not explicit"
                              : "explicit"}
                          </Typography>
                          <Typography paragraph>
                            <strong>Track Price:</strong> {result.trackPrice}
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Item>
                </Box>
              ))}
            </InfiniteScroll>
          )}
        </Stack>
      </div>
    </Container>
  );
}
