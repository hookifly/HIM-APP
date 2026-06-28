import mixpanel from "mixpanel-browser";

mixpanel.init(
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!,
  {
    track_pageview: false,
  }
);

export default mixpanel;