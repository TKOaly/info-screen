import { TwitterTweetEmbed } from "react-twitter-embed";

const Page = ({ statusCode }) => {
  return (
    <div>
      <pre>VIRHE: SALAINEN SYÖTE</pre>
      <pre>{statusCode}</pre>
      <TwitterTweetEmbed tweetId={"1231157901760307200"} />
    </div>
  );
};

Page.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
