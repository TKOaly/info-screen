import { TwitterTweetEmbed } from "react-twitter-embed";
import React from "react";
import PropTypes from "prop-types";

const Page = ({ statusCode }) => {
  return (
    <div>
      <pre>VIRHE: SALAINEN SYÖTE</pre>
      <pre>{statusCode}</pre>
      <TwitterTweetEmbed tweetId={"1231157901760307200"} />
    </div>
  );
};

// Prop type of anything that can be rendered
// ex. number, string, array etc
Page.propTypes = {
  statusCode: PropTypes.node
};

Page.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
