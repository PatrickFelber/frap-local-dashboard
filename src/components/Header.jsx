import { Wifi, WifiOff, Loader, Lightbulb, Activity } from 'lucide-react'

const STATUS = {
  connected:    { icon: Wifi,    color: 'text-emerald-400', label: 'Connected' },
  connecting:   { icon: Loader,  color: 'text-amber-400',   label: 'Connecting…', spin: true },
  disconnected: { icon: WifiOff, color: 'text-gray-500',    label: 'Disconnected' },
  error:        { icon: WifiOff, color: 'text-red-400',     label: 'Error' },
}

function FilterToggle({ icon: Icon, label, enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
        ${enabled
          ? 'bg-gray-700 text-gray-200'
          : 'bg-gray-800/50 text-gray-600'}
      `}
    >
      <Icon size={13} strokeWidth={1.75} />
      {label}
    </button>
  )
}

export function Header({ status, showSwitches, showSensors, onToggleSwitches, onToggleSensors }) {
  const cfg = STATUS[status] ?? STATUS.disconnected
  const Icon = cfg.icon

  return (
    <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-800/60">
      <h1 className="text-lg font-semibold tracking-tight text-gray-100 shrink-0">FRAP</h1>

      <div className="flex items-center gap-2">
        <FilterToggle icon={Lightbulb} label="Switches" enabled={showSwitches} onToggle={onToggleSwitches} />
        <FilterToggle icon={Activity}  label="Sensors"  enabled={showSensors}  onToggle={onToggleSensors} />
      </div>

      <div className={`flex items-center gap-2 text-sm font-medium shrink-0 ${cfg.color}`}>
        <Icon size={15} strokeWidth={2} className={cfg.spin ? 'animate-spin' : ''} />
        <span>{cfg.label}</span>
      </div>
    </header>
  )
}
