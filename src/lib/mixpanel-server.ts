import Mixpanel from "mixpanel";

const mixpanel = Mixpanel.init(
  process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!
);

export default mixpanel;