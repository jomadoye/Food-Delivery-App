import {
  GoogleAnalyticsTracker,
} from 'react-native-google-analytics-bridge';

const googleAnalyticsID = 'UA-100868948-1';

const tracker = new GoogleAnalyticsTracker(googleAnalyticsID);

const track = screen => tracker.trackScreenView(screen);

export default track;
