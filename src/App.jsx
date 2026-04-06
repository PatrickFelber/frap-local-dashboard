import { useMemo, useState } from 'react'
import { devices, rooms } from './config/devices'
import { useMqtt } from './hooks/useMqtt'
import { Header } from './components/Header'
import { DeviceCard } from './components/DeviceCard'

const ALL = 'All'

export default function App() {
  const topics = useMemo(() => devices.map(d => d.topic), [])
  const { messages, status, publish } = useMqtt(topics)

  const [activeRoom, setActiveRoom] = useState(ALL)

  const tabs = [ALL, ...rooms]

  const visibleDevices = useMemo(
    () => (activeRoom === ALL ? devices : devices.filter(d => d.room === activeRoom)),
    [activeRoom],
  )

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col select-none">
      <Header status={status} />

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
                  ? 'bg-amber-400 text-gray-950 shadow-lg shadow-amber-400/20'
                  : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-gray-200 active:scale-95'}
              `}
            >
              {room}
            </button>
          ))}
        </div>
      </div>

      {/* Device grid */}
      <main className="flex-1 p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {visibleDevices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              state={messages[device.topic]}
              publish={publish}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
