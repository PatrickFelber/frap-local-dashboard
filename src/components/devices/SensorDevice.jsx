import { Thermometer, Droplets, Battery, DoorOpen, DoorClosed, Activity, Gauge, Sun } from 'lucide-react'
import { ICONS } from './icons.js'

// Metadata for well-known zigbee2mqtt sensor properties
const PROP_META = {
  temperature: {
    label: 'Temperature',
    unit: '°C',
    Icon: Thermometer,
    color: 'text-orange-400',
    format: v => Number(v).toFixed(1),
  },
  humidity: {
    label: 'Humidity',
    unit: '%',
    Icon: Droplets,
    color: 'text-sky-400',
    format: v => Math.round(v),
  },
  battery: {
    label: 'Battery',
    unit: '%',
    Icon: Battery,
    color: 'text-emerald-400',
    format: v => Math.round(v),
  },
  pressure: {
    label: 'Pressure',
    unit: 'hPa',
    Icon: Gauge,
    color: 'text-gray-400',
    format: v => Math.round(v),
  },
  illuminance: {
    label: 'Light',
    unit: 'lx',
    Icon: Sun,
    color: 'text-yellow-400',
    format: v => Math.round(v),
  },
  occupancy: {
    label: 'Motion',
    unit: '',
    Icon: Activity,
    color: 'text-purple-400',
    format: v => (v ? 'Detected' : 'Clear'),
  },
  linkquality: {
    label: 'Signal',
    unit: 'LQI',
    Icon: null,
    color: 'text-gray-500',
    format: v => Math.round(v),
  },
  // contact is handled separately for its two-icon treatment
}

function ContactRow({ value }) {
  const isOpen = !value
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        {isOpen
          ? <DoorOpen size={14} className="text-amber-400" />
          : <DoorClosed size={14} className="text-emerald-400" />}
        Door
      </div>
      <span className={`text-sm font-semibold ${isOpen ? 'text-amber-400' : 'text-emerald-400'}`}>
        {isOpen ? 'Open' : 'Closed'}
      </span>
    </div>
  )
}

function PropertyRow({ prop, value, meta }) {
  meta = meta?.[prop]

  if (!meta) {
    // Unknown property — show key: value as-is
    return (
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 capitalize">{prop}</span>
        <span className="text-sm font-semibold text-gray-300">{String(value)}</span>
      </div>
    )
  }

  const { label, unit, Icon, color, format } = meta

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        {Icon && <Icon size={14} className={color} />}
        {label}
      </div>
      <span className={`text-sm font-semibold ${color}`}>
        {format(value)}{unit ? `\u202f${unit}` : ''}
      </span>
    </div>
  )
}

export function SensorDevice({ device, state }) {
  const properties = device.properties ?? []
  const hasState = state !== undefined
  const meta = { ...PROP_META, ...device.propertyMeta }

  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gray-300 leading-tight">{device.name}</span>
        {(() => {
          const Icon = ICONS[device.icon]
          return Icon
            ? <Icon size={16} strokeWidth={1.75} className="shrink-0 mt-0.5 text-gray-600" />
            : <span className="text-xs text-gray-600 font-mono uppercase tracking-widest shrink-0 mt-0.5">sensor</span>
        })()}
      </div>

      {/* Property values */}
      {!hasState ? (
        <p className="text-xs text-gray-600 italic">Waiting for data…</p>
      ) : (
        <div className="space-y-2">
          {properties.map(prop => {
            const raw = state[prop]
            if (raw === undefined) return null
            return prop === 'contact'
              ? <ContactRow key={prop} value={raw} />
              : <PropertyRow key={prop} prop={prop} value={raw} meta={meta} />
          })}
        </div>
      )}
    </>
  )
}
