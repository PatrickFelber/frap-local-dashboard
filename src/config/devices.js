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
    id: 'trunk_light',
    name: 'Trunk Lights',
    room: 'Trunk',
    type: 'switch',
    topic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch',
    commandTopic: 'zigbee2mqtt-frap/FRAP - Kofferraum Switch/l3/set',
    stateKey: 'state_l3',
    icon: 'lightbulb'
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



  { 
    id: 'smartshunt_battery_voltage',
    name: 'Smart Shunt Battery Voltage',
    room: 'Living Room',
    type: 'sensor', 
    topic: 'homeassistant/sensor/smartshunt_c615f5e0ebea/battery_voltage/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Voltage', unit: 'V', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },
  {
    id: 'smartshunt_current',
    name: 'Smart Shunt Current',
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/smartshunt_c615f5e0ebea/current/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Current', unit: 'A', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },
  {
    id: 'smartshunt_remainingminutes',        
    name: 'Smart Shunt Remaining Minutes',        
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/smartshunt_c615f5e0ebea/remainingminutes/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Minutes', unit: 'Min.', format: v => Number(v).toFixed(0) },
    },
    icon: 'battery'
  },
  { 
    id: 'smartshunt_soc',
    name: 'Smart Shunt State Of Charge',
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/smartshunt_c615f5e0ebea/soc/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'State of Charge', unit: '%', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },
  { 
    id: 'smartshunt_consumedah',             
    name: 'Smart Shunt Consumed Ah',  
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/smartshunt_c615f5e0ebea/consumedah/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Consumed Ah', unit: 'Ah', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },





  { 
    id: 'mppt_state',
    name: 'MPPT State',  
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/mppt_c8526f13b1c1/charge_state/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'MPPT State', unit: '', format: v => v },
    },
    icon: 'sun'
  },
  {
    id: 'mppt_charger_error',
    name: 'MPPT Charger Error', 
    room: 'Living Room',  
    type: 'sensor',
    topic: 'homeassistant/sensor/mppt_c8526f13b1c1/charger_error/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Charger Error', unit: '', format: v => v },
    },
    icon: 'sun'
  },
  { 
    id: 'mppt_battery_voltage',
    name: 'MPPT Battery Voltage',
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/mppt_c8526f13b1c1/battery_voltage/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Voltage', unit: 'V', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },
  { 
    id: 'mppt_battery_charging_current',
    name: 'MPPT Battery Charging Current',
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/mppt_c8526f13b1c1/battery_charging_current/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Current', unit: 'A', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },
  { 
    id: 'mppt_power',
    name: 'MPPT Solar Power',
    room: 'Living Room',
    type: 'sensor',
    topic: 'homeassistant/sensor/mppt_c8526f13b1c1/solar_power/state',
    payloadKey: 'value',
    properties: ['value'],
    propertyMeta: {
      value: { label: 'Power', unit: 'W', format: v => Number(v).toFixed(1) },
    },
    icon: 'battery'
  },



]
