import React from 'react';
import { useTheme,createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import { ImageCard } from './ImageCard';
import { ImageFrame } from './ImageFrame';


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    gridTile:{
      height:100

    }
  }),
);


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function FixedPanelTest({configuration}) {
  const classes = useStyles(useTheme);

  return (
    <div className={classes.root}>
      <GridList style={{margin:'2em 1em'}} className={classes.gridList} cols={4}>
        {configuration.map((tile,index) => (
          <ImageCard {...{title:tile.title,description:tile.description,link:tile.link,leadText:tile.leadText}} key={index} >
            <ImageFrame {...{ svg: tile.img,link: tile.link,title:tile.title}}/>
          </ImageCard>
        ))}
      </GridList>
    </div>
  );
}
