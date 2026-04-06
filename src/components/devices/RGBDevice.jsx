import { Lightbulb } from 'lucide-react'

function toHex({ r = 255, g = 255, b = 255 } = {}) {
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`
}

function fromHex(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  }
}

export function RGBDevice({ device, state, publish }) {
  const sk  = device.stateKey ?? 'state'
  const bk  = sk.replace('state', 'brightness')
  const ck  = sk.replace('state', 'color')
  const cmd = device.commandTopic ?? `${device.topic}/set`
  const isOn = state?.[sk] === 'ON'
  const brightness = state?.[bk] ?? 254
  const color = state?.[ck] ?? { r: 255, g: 180, b: 80 }
  const hasState = state !== undefined

  const hexColor = toHex(color)
  const pct = Math.round((brightness / 254) * 100)

  const toggle = () => publish(cmd, { [sk]: isOn ? 'OFF' : 'ON' })

  const handleBrightness = (e) => {
    publish(cmd, { [bk]: parseInt(e.target.value, 10), [sk]: 'ON' })
  }

  const handleColor = (e) => {
    publish(cmd, { [ck]: fromHex(e.target.value), [sk]: 'ON' })
  }

  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gray-300 leading-tight">{device.name}</span>
        <Lightbulb
          size={16}
          strokeWidth={1.75}
          className="shrink-0 mt-0.5 transition-colors duration-300"
          style={{ color: isOn ? hexColor : '#4b5563', fill: isOn ? hexColor : 'none' }}
        />
      </div>

      {/* Toggle + color picker row */}
      <div className="flex gap-2">
        <button
          onClick={toggle}
          disabled={!hasState}
          className={`
            flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95
            ${isOn
              ? 'bg-forest-400 text-gray-950 hover:bg-forest-300'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}
            disabled:opacity-40 disabled:cursor-not-allowed
          `}
        >
          {!hasState ? '—' : isOn ? 'ON' : 'OFF'}
        </button>

        {/* Color swatch — clicking opens native color picker */}
        <label
          title="Pick color"
          className="relative w-12 rounded-xl border border-gray-700 cursor-pointer overflow-hidden transition-all duration-300"
          style={{ background: isOn ? hexColor : '#374151' }}
        >
          <input
            type="color"
            value={hexColor}
            onChange={handleColor}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>
      </div>

      {/* Brightness slider */}
      {isOn && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Brightness</span>
            <span>{pct}%</span>
          </div>
          <input
            type="range"
            min={1}
            max={254}
            value={brightness}
            onChange={handleBrightness}
          />
        </div>
      )}
    </>
  )
}
