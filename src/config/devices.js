export const mqttConfig = {
  url:      import.meta.env.VITE_MQTT_URL,
  username: import.meta.env.VITE_MQTT_USERNAME,
  password: import.meta.env.VITE_MQTT_PASSWORD,
}

export const rooms = ['Cockpit', 'Living Room', 'Shower', 'Bed', 'Trunk', 'Outside']

export const devices = [
  {
    id: 'trunk_fan',
    name: 'Trunk Fan',
    room: 'Trunk',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch/l1/set',
    stateKey: 'state_l1',
  },
  {
    id: 'dachluefter',
    name: 'Maxx Fan',
    room: 'Living Room',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch/l2/set',
    stateKey: 'state_l2',
  },
  {
    id: 'offroad_lights_hl',
    name: 'Offroadbeleuchtung Hinten Link',
    room: 'Outside',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch/l1/set',
    stateKey: 'state_l1',
  },
  {
    id: 'offroad_lights_hr',
    name: 'Offroadbeleuchtung Hinten Rechts',
    room: 'Outside',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch/l2/set',
    stateKey: 'state_l2',
  }
]
