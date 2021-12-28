import React, { useEffect, useState } from "react";
import LocalizedLink from "../localizedLink/localizedLink";
import * as styles from "./leftNav.module.less";
import "./leftNav.less";
// import { AlgoliaSearch } from '../search/algolia';
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { mdMenuListFactory, filterApiMenus, mergeMenuList } from "./utils";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    <aside className={clsx("left-nav", styles.aside)}>
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

const ExpansionTreeView = (props) => {
  // https://mui.com/components/tree-view/
  // itemList = [ { id='', children = [], label='', link='' }, ...]
  const {
    itemList = [],
    treeClassName = "",
    itemClassName = "",
    linkClassName = "",
    homeUrl,
    homeLabel,
    ...others
  } = props;
  const generateTreeItem = ({ id, label, link, children }) => {
    return (
      <>
        {children?.length ? (
          <TreeItem
            key={id}
            className={itemClassName}
            nodeId={id}
            label={label}
          >
            {children.map((i) => generateTreeItem(i))}
          </TreeItem>
        ) : (
          <TreeItem
            key={id}
            className={itemClassName}
            nodeId={id}
            label={
              link ? (
                <LocalizedLink
                  to={link}
                  className={linkClassName}
                  showIcon={true}
                >
                  {label}
                </LocalizedLink>
              ) : (
                label
              )
            }
          />
        )}
      </>
    );
  };
  return (
    <TreeView className={treeClassName} {...others}>
      {homeLabel && homeUrl && (
        <TreeItem
          nodeId={`home-${homeLabel}`}
          className={itemClassName}
          label={
            <LocalizedLink
              to={homeUrl}
              className={linkClassName}
              showIcon={true}
            >
              {homeLabel}
            </LocalizedLink>
          }
        />
      )}
      {itemList.map((i) => generateTreeItem(i))}
    </TreeView>
  );
};

export default LeftNav;
