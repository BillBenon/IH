export const removeTrackSpaces = (trackname) => {
    if (!trackname) return trackname;
    trackname = trackname.toLowerCase().replaceAll(" ", "-");
    return trackname;
}

export const hasChildren = (item)  =>{
    const { subMenu: children } = item;
  
    if (children === undefined) {
      return false;
    }
  
    if (children.constructor !== Array) {
      return false;
    }
  
    if (children.length === 0) {
      return false;
    }
  
    return true;
  }