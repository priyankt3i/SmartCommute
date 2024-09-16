import MBTA from 'mbta-client';

require("dotenv").config({
  path: "./.env",
});
// Instantiate MBTA with your API key
const mbta = new MBTA(process.env.api_key);


// Fetch data, passing filters as options. Filter documentation for
// each function: https://api-v3.mbta.com/docs/swagger/index.html#/
const predictions = await mbta.fetchPredictions({ stop: 42 });

// Use an array for filters that accept multiple values
const stops = await mbta.fetchStops({ id: [70080, 'Back Bay'] });

// Some fetch functions accept a `type` or `route_type` filter. This can
// be provided as a string ('bus', 'subway', etc.) or route_type code:
// https://developers.google.com/transit/gtfs/reference/routes-file
// The filter must be valid for the MBTA endpoint, or the request will fail.
// E.g. `fetchRoutes` uses `type`, but `fetchPredictions` uses `route_type`.
const subwayRoutes = await mbta.fetchRoutes({ type: 'subway' });

// Filter by `direction_id` to only get results going in one direction.
// `direction_id` maps to the index of the route's `direction_names`.
// Example: Red line `direction_names` are `['South', 'North']`.
// Include `direction_id: 1` in options for Northbound results.
const north = await mbta.fetchPredictions({ route: 'Red', direction_id: 1 });

// Get results based on `latitude`/`longitude`, and optional `radius`.
const local = await mbta.fetchStops({ latitude: 42.373, longitude: -71.119 });

// Sort by `arrival_time`, `departure_time`, etc. See MBTA docs for each
// endpoint's sort options. `descending: true` will reverse sort order.
const sorted = await mbta.fetchPredictions({
  stop: 42,
  sort: 'arrival_time',
  descending: true,
});

// Alerts have a number of extra filters. See MBTA docs for best practices.
const alerts = await mbta.fetchAlerts({
  sort: 'cause',
  activity: 'BOARD',
  datetime: 'NOW',
  severity: [2, 3],
});
