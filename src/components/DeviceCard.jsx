import { SwitchDevice } from './devices/SwitchDevice'
import { DimmerDevice } from './devices/DimmerDevice'
import { RGBDevice } from './devices/RGBDevice'
import { SensorDevice } from './devices/SensorDevice'

const COMPONENTS = {
  switch: SwitchDevice,
  dimmer: DimmerDevice,
  rgb:    RGBDevice,
  sensor: SensorDevice,
}

export function DeviceCard({ device, state, publish }) {
  const Component = COMPONENTS[device.type]
  if (!Component) return null

  const isOn = state?.state === 'ON'
  const isSensor = device.type === 'sensor'

  return (
    <div
      className={`
        rounded-2xl p-4 border flex flex-col gap-3 transition-all duration-300
        bg-gray-900
        ${isSensor
          ? 'border-gray-800'
          : isOn
            ? 'border-amber-900/50 shadow-lg shadow-amber-950/30'
            : 'border-gray-800'}
      `}
    >
      <Component device={device} state={state} publish={publish} />
    </div>
  )
}
