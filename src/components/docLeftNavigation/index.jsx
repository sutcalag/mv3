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
  } = props;

  const [treeItems, setTreeItems] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(currentVersion);

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

  return (
    <aside className={clsx(className, "left-nav", styles.aside)}>
      <FormControl fullWidth size="small">
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
        treeClassName={styles.tree}
        itemClassName={styles.treeItem}
        linkClassName={styles.treeItemLink}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        homeUrl={homeUrl}
        homeLabel={homeLabel}
      />
    </aside>
  );
};

export default LeftNav;
