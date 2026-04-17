import React from "react";
import { Link, LinkProps } from "react-router-dom";

interface LinkHrefProps extends LinkProps {
  href: LinkProps["to"];
}

const LinkHref = React.forwardRef<HTMLAnchorElement, LinkHrefProps>(
  (props, ref) => {
    const { href, ...other } = props;
    return <Link {...other} ref={ref} to={href} />;
  },
);

export default LinkHref;
