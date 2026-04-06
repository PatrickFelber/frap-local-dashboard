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
    icon: 'fan'
  },
  {
    id: 'dachluefter',
    name: 'Maxx Fan',
    room: 'Living Room',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch/l2/set',
    stateKey: 'state_l2',
    icon: 'fan'
  },
  {
    id: 'offroad_lights_hl',
    name: 'Offroadbeleuchtung Hinten Link',
    room: 'Outside',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch/l1/set',
    stateKey: 'state_l1',
    icon: 'flashlight'
  },
  {
    id: 'offroad_lights_hr',
    name: 'Offroadbeleuchtung Hinten Rechts',
    room: 'Outside',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Offroadleuchten Hinten Switch/l2/set',
    stateKey: 'state_l2',
    icon: 'flashlight'
  },
  {
    id: 'cpu_temperature',
    name: 'Raspberry Pi CPU Temperatur',
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/frap_raspberry_pi/cpu_temperature/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'CPU Temperature', unit: '°C', format: v => Number(v).toFixed(1) },
    },
    icon: 'cpu'
  },
  {
    id: 'cockpit_temperature',
    name: 'Cockpit Temperature',
    room: 'Cockpit',
    type: 'sensor',
    topic: 'zigbee2mqtt-frap/FRAP - Temperature & Humidity Cockpit',
    payloadKey: 'temperature',
    properties: ['temperature'],
    propertyMeta: {
      value: { label: 'Temperature', unit: '°C', format: v => Number(v).toFixed(1) },
    },
    icon: 'thermometer'
  },
  {
    id: 'cockpit_humidity',
    name: 'Cockpit Humidity',
    room: 'Cockpit',
    type: 'sensor',
    topic: 'zigbee2mqtt-frap/FRAP - Temperature & Humidity Cockpit',
    payloadKey: 'humidity',
    properties: ['humidity'],
    propertyMeta: {
      value: { label: 'Humidity', unit: '%', format: v => Number(v).toFixed(1) },
    },
    icon: 'thermometer'
  },
  {
    id: 'trunk_temperature',
    name: 'Trunk Temperature',
    room: 'Trunk',
    type: 'sensor',
    topic: 'zigbee2mqtt-frap/FRAP - Temperature & Humidity Trunk',
    payloadKey: 'temperature',
    properties: ['temperature'],
    propertyMeta: {
      value: { label: 'Temperature', unit: '°C', format: v => Number(v).toFixed(1) },
    },
    icon: 'thermometer'  
  },
  { 
    id: 'trunk_humidity',   
    name: 'Trunk Humidity',   
    room: 'Trunk',
    type: 'sensor',
    topic: 'zigbee2mqtt-frap/FRAP - Temperature & Humidity Trunk',
    payloadKey: 'humidity',   
    properties: ['humidity'],
    propertyMeta: {
      value: { label: 'Humidity', unit: '%', format: v => Number(v).toFixed(1) },
    },
    icon: 'thermometer'
  },
]
