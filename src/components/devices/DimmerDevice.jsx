import { Lightbulb } from 'lucide-react'

export function DimmerDevice({ device, state, publish }) {
  const sk  = device.stateKey ?? 'state'
  const bk  = sk.replace('state', 'brightness')
  const cmd = device.commandTopic ?? `${device.topic}/set`
  const isOn = state?.[sk] === 'ON'
  const brightness = state?.[bk] ?? 254
  const hasState = state !== undefined
  const pct = Math.round((brightness / 254) * 100)

  const toggle = () => publish(cmd, { [sk]: isOn ? 'OFF' : 'ON' })

  const handleBrightness = (e) => {
    const val = parseInt(e.target.value, 10)
    publish(cmd, { [bk]: val, [sk]: 'ON' })
  }

  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gray-300 leading-tight">{device.name}</span>
        <Lightbulb
          size={16}
          strokeWidth={1.75}
          className={`shrink-0 mt-0.5 transition-colors duration-300 ${isOn ? 'text-forest-400' : 'text-gray-600'}`}
          fill={isOn ? 'currentColor' : 'none'}
          style={isOn ? { opacity: 0.4 + (brightness / 254) * 0.6 } : {}}
        />
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        disabled={!hasState}
        className={`
          w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95
          ${isOn
            ? 'bg-forest-400 text-gray-950 hover:bg-forest-300'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
      >
        {!hasState ? '—' : isOn ? `ON · ${pct}%` : 'OFF'}
      </button>

      {/* Brightness slider — only shown when on */}
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
