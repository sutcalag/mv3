import React from "react";
import clsx from "clsx";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import LocalizedLink from "../localizedLink/localizedLink";
import "./ExpansionTreeView.less";

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
                  className={clsx("mv3-item-link", {
                    [linkClassName]: linkClassName,
                  })}
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
    <TreeView
      className={clsx("mv3-tree-view", { [treeClassName]: treeClassName })}
      {...others}
    >
      {homeLabel && homeUrl && (
        <TreeItem
          nodeId={`home-${homeLabel}`}
          className={itemClassName}
          label={
            <LocalizedLink
              to={homeUrl}
              className={clsx("mv3-item-link", {
                [linkClassName]: linkClassName,
              })}
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

export default ExpansionTreeView;
