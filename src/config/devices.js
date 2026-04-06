// ─── MQTT Broker ─────────────────────────────────────────────────────────────
// WebSocket URL of your Mosquitto broker.
// Default WebSocket port is 9001 — make sure the `listener 9001` + `protocol websockets`
// lines are present in your mosquitto.conf.
export const mqttConfig = {
  url:      import.meta.env.VITE_MQTT_URL,
  username: import.meta.env.VITE_MQTT_USERNAME,
  password: import.meta.env.VITE_MQTT_PASSWORD,
}

// ─── Rooms ───────────────────────────────────────────────────────────────────
// Defines the tab order. Devices not assigned to a listed room are still shown
// under the "All" tab.
export const rooms = ['Main', 'Bedroom', 'Kitchen']

// ─── Devices ─────────────────────────────────────────────────────────────────
// type: 'switch' | 'dimmer' | 'rgb' | 'sensor'
// topic: the zigbee2mqtt friendly name topic (without /set suffix)
//
// stateKey: which payload attribute holds the on/off state.
//   Default: 'state'  →  { "state": "ON" }
//   Multi-endpoint devices use e.g. 'state_l3'  →  { "state_l3": "ON" }
//   For dimmer/rgb, brightness and color keys are derived automatically:
//   'state_l3' → 'brightness_l3', 'color_l3'
//
// For type 'sensor', list the MQTT payload keys to display in `properties`.
// Supported keys with automatic labels/units:
//   temperature, humidity, battery, contact, occupancy,
//   pressure, illuminance, linkquality
// Any other key is shown as-is.
export const devices = [
  {
    id: 'trunk_fan',
    name: 'Trunk Fan',
    room: 'Main',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch/l1/set',
    stateKey: 'state_l1',
  },
  {
    id: 'dachluefter',
    name: 'Maxx Fan',
    room: 'Main',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch/l2/set',
    stateKey: 'state_l2',
  },
  {
    id: 'offroad_lights_hl',
    name: 'Offroadbeleuchtung Hinten Link',
    room: 'Main',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch/l1/set',
    stateKey: 'state_l1',
  },
  {
    id: 'offroad_lights_hr',
    name: 'Offroadbeleuchtung Hinten Rechts',
    room: 'Main',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch/l2/set',
    stateKey: 'state_l2',
  }
]
