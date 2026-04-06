import { useMemo, useState } from 'react'
import { devices, rooms } from './config/devices'
import { useMqtt } from './hooks/useMqtt'
import { Header } from './components/Header'
import { DeviceCard } from './components/DeviceCard'

const ALL = 'All'
const SWITCH_TYPES = ['switch', 'dimmer', 'rgb']

const byName = (a, b) => a.name.localeCompare(b.name)

export default function App() {
  const { messages, status, publish } = useMqtt(devices)

  const [activeRoom, setActiveRoom] = useState(ALL)
  const [showSwitches, setShowSwitches] = useState(true)
  const [showSensors, setShowSensors] = useState(true)

  const tabs = [ALL, ...rooms]

  const filtered = useMemo(() =>
    devices.filter(d => d.type === 'sensor' ? showSensors : showSwitches),
    [showSwitches, showSensors],
  )

  // For the All view: list of { room, devices } in rooms order, alphabetical within
  const groupedSections = useMemo(() => {
    if (activeRoom !== ALL) return null
    return rooms
      .map(room => ({ room, devices: filtered.filter(d => d.room === room).sort(byName) }))
      .filter(s => s.devices.length > 0)
  }, [activeRoom, filtered])

  // For single-room view: flat sorted list
  const flatDevices = useMemo(() => {
    if (activeRoom === ALL) return null
    return filtered.filter(d => d.room === activeRoom).sort(byName)
  }, [activeRoom, filtered])

  const renderCard = (device) => (
    <DeviceCard
      key={device.id}
      device={device}
      state={messages[device.topic]}
      publish={publish}
    />
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col select-none">
      <Header
        status={status}
        showSwitches={showSwitches}
        showSensors={showSensors}
        onToggleSwitches={() => setShowSwitches(v => !v)}
        onToggleSensors={() => setShowSensors(v => !v)}
      />

      {/* Room tabs */}
      <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800/60">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
          {tabs.map(room => (
            <button
              key={room}
              onClick={() => setActiveRoom(room)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                ${activeRoom === room
                  ? 'bg-forest-400 text-gray-950 shadow-lg shadow-forest-400/20'
                  : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-200 active:scale-95'}
              `}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        {groupedSections
          ? groupedSections.map(({ room, devices: roomDevices }) => (
              <section key={room} className="mb-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3 px-1">
                  {room}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {roomDevices.map(renderCard)}
                </div>
              </section>
            ))
          : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {flatDevices.map(renderCard)}
              </div>
            )
        }
      </main>
    </div>
  )
}
