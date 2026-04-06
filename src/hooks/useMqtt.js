import { useState, useEffect, useRef, useCallback } from 'react'
import mqtt from 'mqtt'
import { mqttConfig } from '../config/devices'

export function useMqtt(devices) {
  const [messages, setMessages] = useState({})
  const [status, setStatus] = useState('connecting')
  const clientRef = useRef(null)

  useEffect(() => {
    const client = mqtt.connect(mqttConfig.url, {
      clientId: `van-dash-${Math.random().toString(16).slice(2, 10)}`,
      username: mqttConfig.username ?? undefined,
      password: mqttConfig.password ?? undefined,
      reconnectPeriod: 3000,
      keepalive: 30,
    })

    clientRef.current = client

    client.on('connect', () => {
      setStatus('connected')

      // Deduplicate topics (multiple devices can share one topic)
      const topics = [...new Set(devices.map(d => d.topic))]
      topics.forEach(topic => client.subscribe(topic))

      // Request initial state from zigbee2mqtt for each controllable device.
      // Sensors don't support /get and are skipped.
      devices.forEach(device => {
        if (device.type === 'sensor') return
        const getTopic = device.getTopic ?? `${device.topic}/get`
        const sk = device.stateKey ?? 'state'
        client.publish(getTopic, JSON.stringify({ [sk]: '' }))
      })
    })

    client.on('reconnect', () => setStatus('connecting'))
    client.on('disconnect', () => setStatus('disconnected'))
    client.on('error', (err) => { console.error('[mqtt] error:', err.message); setStatus('error') })
    client.on('offline', () => setStatus('disconnected'))

    client.on('message', (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString())
        setMessages(prev => ({ ...prev, [topic]: data }))
      } catch {
        // ignore non-JSON payloads
      }
    })

    return () => client.end(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const publish = useCallback((topic, payload) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish(topic, JSON.stringify(payload))
    }
  }, [])

  return { messages, status, publish }
}
