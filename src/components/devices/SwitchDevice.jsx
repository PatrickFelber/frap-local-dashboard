import { Lightbulb } from 'lucide-react'

export function SwitchDevice({ device, state, publish }) {
  const sk  = device.stateKey ?? 'state'
  const cmd = device.commandTopic ?? `${device.topic}/set`
  const isOn = state?.[sk] === 'ON'
  const hasState = state !== undefined

  const toggle = () => publish(cmd, { [sk]: isOn ? 'OFF' : 'ON' })

  return (
    <>
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-gray-300 leading-tight">{device.name}</span>
        <Lightbulb
          size={16}
          strokeWidth={1.75}
          className={`shrink-0 mt-0.5 transition-colors duration-300 ${isOn ? 'text-amber-400' : 'text-gray-600'}`}
          fill={isOn ? 'currentColor' : 'none'}
        />
      </div>

      {/* Toggle button */}
      <button
        onClick={toggle}
        disabled={!hasState}
        className={`
          w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95
          ${isOn
            ? 'bg-amber-400 text-gray-950 hover:bg-amber-300'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'}
          disabled:opacity-40 disabled:cursor-not-allowed
        `}
      >
        {!hasState ? '—' : isOn ? 'ON' : 'OFF'}
      </button>
    </>
  )
}
