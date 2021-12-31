import React, { useEffect, useState } from "react";
import LocalizedLink from "../localizedLink/localizedLink";
import * as styles from "./leftNav.module.less";
import "./leftNav.less";
// import { AlgoliaSearch } from '../search/algolia';
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mdMenuListFactory, filterApiMenus, mergeMenuList } from "./utils";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ExpansionTreeView from "../treeView/ExpansionTreeView";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useWindowSize } from "../../http/hooks";

const LeftNav = (props) => {
  const {
    homeUrl,
    homeLabel,
    menus: docMenus = [],
    apiMenus = [],
    pageType = "doc",
    currentVersion,
    locale = "en",
    docVersions = [],
    className = "",
    mdId = "home",
  } = props;

  const [treeItems, setTreeItems] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(currentVersion);
  const [openDrawer, setOpenDrawer] = useState(false);

  //! bind event twice
  const currentWindowSize = useWindowSize();
  const isMobile = ["phone", "tablet"].includes(currentWindowSize);
  console.log(currentWindowSize);

  useEffect(() => {
    const generateMdMenuList = mdMenuListFactory(
      docMenus,
      pageType,
      currentVersion,
      locale
    );
    const formatedMdMenuList = generateMdMenuList();
    const filteredApiMenus = filterApiMenus(apiMenus, currentVersion);
    const generateApiMenuList = mdMenuListFactory(
      filteredApiMenus,
      pageType,
      currentVersion,
      locale
    );
    const formatedApiMenuList = generateApiMenuList();
    const mergedMenuList = mergeMenuList(
      formatedMdMenuList,
      formatedApiMenuList
    );
    setTreeItems(mergedMenuList);
  }, [docMenus]);

  const handleVersionChange = (event) => {
    const v = event.target.value;
    setSelectedVersion(v);
  };

  const generateContent = () => (
    <>
      <FormControl
        fullWidth
        size="small"
        className={clsx(styles.selector, { [styles.mobile]: isMobile })}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedVersion}
          onChange={handleVersionChange}
        >
          {docVersions.map((i) => (
            <MenuItem key={i} value={i}>
              <LocalizedLink
                to={i === "v0.x" ? `/docs/${i}/overview.md` : `/docs/${i}`}
                className={styles.selectorItem}
              >
                {i}
              </LocalizedLink>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ExpansionTreeView
        itemList={treeItems}
        // treeClassName={styles.tree}
        treeClassName={clsx(styles.tree, { [styles.mobile]: isMobile })}
        itemClassName={styles.treeItem}
        linkClassName={styles.treeItemLink}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        homeUrl={homeUrl}
        homeLabel={homeLabel}
        currentMdId={mdId}
      />
    </>
  );

  return isMobile ? (
    <>
      <IconButton
        aria-label="open menu"
        onClick={() => {
          setOpenDrawer(true);
        }}
        className="doc-menu-icon"
        color="primary"
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        // anchor={anchor}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        {generateContent()}
      </Drawer>
    </>
  ) : (
    <aside className={clsx(className, "left-nav", styles.aside)}>
      {generateContent()}
    </aside>
  );
};

export default LeftNav;
