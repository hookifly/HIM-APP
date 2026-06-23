import mixpanel from "mixpanel-browser";

mixpanel.init(
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!,
  {
    track_pageview: true,
  }
);

export default mixpanel;