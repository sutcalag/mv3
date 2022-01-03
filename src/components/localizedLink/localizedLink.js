import React from "react";
import { Link } from "gatsby";
// import { useI18next } from 'gatsby-plugin-react-i18next';
import locales from "../../consts/locales.js";
import * as styles from "./localizedLink.module.less";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const LocalizedLink = ({
  locale = 'en',
  to,
  children,
  className = "",
  showIcon = false,
  customIcon,
}) => {
  // const {languages, changeLanguage} = useI18next();
  // changeLanguage(locale);
  const language = locales[locale];
  const reg = /^(http|https)/;
  const isExternal = reg.test(to);
  if (isExternal) {
    const Icon = customIcon || OpenInNewIcon;
    return (
      <a
        target="_blank"
        href={to}
        rel="noopener noreferrer"
        className={`${styles.link} ${className}`}
      >
        {showIcon && <Icon />}
        {children}
      </a>
    );
  }

  let path;

  const title = typeof children === "string";

  language && !language.default ? (path = `/${locale}${to}`) : (path = to);
  return title ? (
    <Link
      className={`${styles.link} ${className}`}
      children={children}
      to={path}
      title={children}
    />
  ) : (
    <Link
      className={`${styles.link} ${className}`}
      children={children}
      to={path}
    />
  );
};

export default LocalizedLink;
