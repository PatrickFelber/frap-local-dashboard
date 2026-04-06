import { Wifi, WifiOff, Loader } from 'lucide-react'

const STATUS = {
  connected:    { icon: Wifi,    color: 'text-emerald-400', label: 'Connected' },
  connecting:   { icon: Loader,  color: 'text-amber-400',   label: 'Connecting…', spin: true },
  disconnected: { icon: WifiOff, color: 'text-gray-500',    label: 'Disconnected' },
  error:        { icon: WifiOff, color: 'text-red-400',     label: 'Error' },
}

export function Header({ status }) {
  const cfg = STATUS[status] ?? STATUS.disconnected
  const Icon = cfg.icon

  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-gray-800/60">
      <h1 className="text-lg font-semibold tracking-tight text-gray-100">Van Dash</h1>
      <div className={`flex items-center gap-2 text-sm font-medium ${cfg.color}`}>
        <Icon size={15} strokeWidth={2} className={cfg.spin ? 'animate-spin' : ''} />
        <span>{cfg.label}</span>
      </div>
    </header>
  )
}
