import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { post } from "../utils/axiosInstance";
import ExpertCardContent from "../Components/ExpertCardContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  JourneySearchTypes,
  TrackSearchTypes,
  PriceFilterTypes,
  getRadioLabelByKey,
  productFilterSubLabels
} from "../utils/Constants";
import {
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
  Button,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  faFacebook, faLinkedin, faTwitter, faYoutube, faApple, faGoogle, faAmazon
} from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "110px 0px",
    margin: "0 2rem",
    [theme.breakpoints.only("xs")]: {
      padding: "85px 25px",
      width: "100%",
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  subTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
  subHeading: {
    textAlign: "center",
    fontSize: "17px",
    fontWeight: "300",
    marginBottom: "70px",
    padding: "0px 18px"
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bolder",
  },
  tagTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#37281F",
    textDecoration: "underline",
  },
  tagCheckBox: {
    transform: "scale(0.5)",
  },

  circularLoader: {
    width: "60px",
    height: "60px",
    position: "absolute",
    margin: "0 auto",
    top: "45%",
    left: "0",
    right: "0",
    zIndex: 1,
  },
  card: {
    margin: theme.spacing(2),
    padding: "20px",
    height: "510px",
    boxShadow:
      "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
    [theme.breakpoints.only("xs")]: {
      margin: "0",
      height: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  grid: {
    [theme.breakpoints.only("xs")]: {
      marginLeft: "0px !important",
    },
  },
  filtersContainer: {
    marginTop: "10px",
    marginBottom: "10px",
    padding: "15px",
    backgroundColor: "#fcfdff",
    color: "white",
    borderRadius: "20px",
    border: "1px solid silver",
    boxShadow: "2px 2px 2px #dfdfdf",
  },
  filterBtn: {
    float: "right"
  },
  formGroup: {
    alignItems: "center",
    marginLeft: "20px",
  },
  formControlLabel: {
    width: "155px",
    [theme.breakpoints.down("sm")]: {
      width: "130px",
    },
  },
  parent: {
    [theme.breakpoints.down("sm")]: {
      rowGap: "20px",
    },
    [theme.breakpoints.only("xs")]: {
      gap: "20px",
    },
  },
  tagContainer: {
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down("sm")]: {
      display: 'block'
    },
  },
  subTagTitle: {
    fontStyle: "italic",
    fontWeight: '600',
    color: "#37281F",
    marginLeft: '10px'
  },
  iconContainer: {
    margin: "20px"
  },
  iconSpan: {
    height: '25px',
    margin: '0 0.8rem',
    width: '25px'
  },
  icon: {
    height: 'inherit !important',
    width: 'inherit !important'
  }
}));
export default function MockInterview() {
  const classes = useStyles();
  const { search } = useLocation();

  const [products, setProducts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [tags, setTags] = useState([]);
  const [isTagFocused, setIsTagFocused] = useState(false);
  const [isTagSectionVisible, setIsTagSectionVisible] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    getProducts().then(() => setShowLoader(false));
  }, []);

  useEffect(() => {
    if (isTagFocused) updateProductsOnTagChange();
  }, [tags]);

  async function getProducts() {
    const queryParams = queryString.parse(search);

    const header = {
      searchType: TrackSearchTypes.JOURNEY,
      searchText: JourneySearchTypes.MOCK_INTERVIEW,
      count: 20,
      skipCount: 0,
      flags: {
        case_sensitive: false,
        exact_match: false,
      },
    };
    if (queryParams?.track) {
      header["trackName"] = queryParams?.track;
    }
    let result = await post("getTrackSearch", header);
    result &&
      result.data.output &&
      result.data.output.tracks &&
      addProducts(result.data.output.tracks);
  }

  const groupAndMerge = (arr, groupBy, mergeWith) =>
    Array.from(
      arr
        .reduce(
          (m, o) =>
            m.set(o[groupBy], {
              ...o,
              [mergeWith]: [
                ...new Set([
                  ...(m.get(o[groupBy])?.[mergeWith] ?? []),
                  ...o[mergeWith],
                ]),
              ].sort(),
              selected: [],
            }),
          new Map()
        )
        .values()
    );

  function addProducts(tracks) {
    let productList = [];
    let tagsList = [];
    tracks.forEach((track) => {
      if (track.productInfos && track.productInfos.length) {
        track.productInfos.forEach((product) => {
          if (product.expertInfo) {
            product.trackId = track.trackId;
            product.trackName = track.title;
            productList.push(product);
            tagsList = [...tagsList, ...product.tags];
          }
        });
      }
    });

    setProducts(productList);
    const mergedTags = groupAndMerge(tagsList, "key", "value");
    setTags([...mergedTags, ...[PriceFilterTypes]]);
  }

  function handleBuyNowClick(item) {
    let redirecturl;
    if (item) {
      redirecturl =
        process.env.REACT_APP_EVAL_URL +
        `/?lptrackid=${item.trackId}&lpexpertid=${item.expertId}&lpproductid=${item.productId}&lpflowtype=mockInterview`;
      window.location.href = redirecturl;
    } else {
      alert("No free plan available for this track!");
    }
  }

  const updateProductsOnTagChange = () => {
    const updatedProducts = products.map((prod) =>
      tags
        .filter((tg) => tg.selected.length > 0)
        .every((el) => {
          if (el.key === "Price") {
            if (el.selected[0] === "all") {
              return true;
            }
            const price = Number(prod.price);
            const [minPrice, maxPrice] = el.selected[0].split("-");

            if (
              price >= Number(minPrice) * 100 &&
              price <= Number(maxPrice) * 100
            ) {
              return true;
            }
            return false;
          }
          return prod.tags.some((tag) => {
            return (
              tag.key === el.key &&
              el.selected.every((val) => tag.value.includes(val))
            );
          });
        })
        ? { ...prod, isShow: true }
        : { ...prod, isShow: false }
    );
    setProducts(updatedProducts);
  };

  const handleTagChange = (event, { key, val }) => {
    if (!isTagFocused) setIsTagFocused(true);
    const isChecked = event.target.checked;
    const filteredTags = tags.map((tag) => {
      if (tag.key === key && key === "Price") {
        return {
          ...tag,
          selected: isChecked
            ? [val]
            : tag?.selected?.filter((el) => el !== val),
        };
      }

      return tag.key === key
        ? {
          ...tag,
          selected: isChecked
            ? [...new Set([...tag?.selected, val])]
            : tag?.selected?.filter((el) => el !== val),
        }
        : tag;
    });

    setTags(filteredTags);
  };

  const TagsList = ({ tags }) => {
    return (
      <div className={classes.filtersContainer}>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <Grid container direction="column">
            {tags.map((tag, i) => {
              return (
                <Grid item lg={12} key={`tag-${tag.key}`}>
                  <Grid conainer direction="column">
                    <Grid item lg={12} className={classes.tagContainer}>
                      <Typography className={classes.tagTitle}>
                        {tag.key}
                      </Typography>
                      <Typography className={classes.subTagTitle}>
                        {productFilterSubLabels[tag.key]}
                      </Typography>
                    </Grid>
                    <Grid item lg={12}>
                      <Typography>
                        {tag.key === "Price" ? (
                          <RadioGroup
                            row
                            aria-labelledby="radio-buttons-group-label"
                            defaultValue="all"
                            name="row-radio-buttons-group"
                          >
                            {tag.value.map((el, k) => (
                              <FormControlLabel
                                key={`tag_${tag.key}${k}`}
                                control={
                                  <Radio
                                    checked={tag?.selected?.includes(el)}
                                    onChange={(e) =>
                                      handleTagChange(e, {
                                        key: tag.key,
                                        val: el,
                                      })
                                    }
                                    name={el}
                                    className={classes.tagCheckBox}
                                    value={el}
                                    style={{
                                      color: "grey",
                                    }}
                                  />
                                }
                                label={getRadioLabelByKey[el]}
                                className={classes.formControlLabel}
                              />
                            ))}
                          </RadioGroup>
                        ) : (
                          tag.value.map((el, k) => (
                            <FormControlLabel
                              key={`tag_${tag.key}${k}`}
                              control={
                                <Checkbox
                                  checked={tag?.selected?.includes(el)}
                                  onChange={(e) =>
                                    handleTagChange(e, {
                                      key: tag.key,
                                      val: el,
                                    })
                                  }
                                  name={el}
                                  className={classes.tagCheckBox}
                                  style={{
                                    color: "grey",
                                  }}
                                />
                              }
                              label={el}
                              className={classes.formControlLabel}
                            />
                          ))
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </FormControl>
      </div>
    );
  };

  const ProductCardList = ({ productsList }) => {
    return (
      <Grid container className={classes.parent}>
        {productsList
          .filter((prod) => (prod?.isShow === undefined ? true : prod?.isShow))
          .map((item, index) => (
            <Grid
              key={`product_${index}`}
              className={classes.grid}
              justify="start"
              lg={4}
              md={4}
              sm={6}
              xs={12}
            >
              <Card className={classes.card} key={index}>
                <ExpertCardContent
                  item={item}
                  onBuyNowClick={handleBuyNowClick}
                />
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  };

  const CompanyIcon = () => (
    <>
      <span className={classes.iconSpan}><FontAwesomeIcon className={classes.icon} icon={faFacebook} size="3x" /></span>
      <span className={classes.iconSpan}><FontAwesomeIcon className={classes.icon} icon={faApple} size="3x" /></span>
      <span className={classes.iconSpan}><FontAwesomeIcon className={classes.icon} icon={faGoogle} size="3x" /></span>
      <span className={classes.iconSpan}><FontAwesomeIcon className={classes.icon} icon={faTwitter} size="3x" /></span>
      <span className={classes.iconSpan}><FontAwesomeIcon className={classes.icon} icon={faAmazon} size="3x" /></span>
    </>
  )

  return (
    <div className={classes.root}>
      {showLoader && <CircularProgress className={classes.circularLoader} />}
      <h1 className="heading1">{"Mock Interview"}</h1>
      <div className={classes.subHeading}>
        <Typography variant="h6" className={classes.iconContainer} gutterBottom component="div">
          Perform & Practice interview with experts from <CompanyIcon /> and many other top companies
        </Typography>

        {tags.length > 0 && (
          <Button
            component="button"
            variant="contained"
            onClick={() => setIsTagSectionVisible(!isTagSectionVisible)}
            className={classes.filterBtn}
          >
            Filters for Product Search
          </Button>
        )}
      </div>


      {isTagSectionVisible && tags.length > 0 && (
        <>
          <TagsList tags={tags} />
        </>
      )}
      <ProductCardList productsList={products} />
    </div>
  );
}
