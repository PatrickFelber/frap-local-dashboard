import { useState, useEffect, useRef, useCallback } from 'react'
import mqtt from 'mqtt'
import { mqttConfig } from '../config/devices'

/**
 * Connects to the MQTT broker over WebSockets and manages topic subscriptions.
 *
 * @param {string[]} topics - List of topics to subscribe to on connect.
 * @returns {{ messages: Record<string, object>, status: string, publish: Function }}
 */
export function useMqtt(topics) {
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
      topics.forEach(topic => {
        client.subscribe(topic, (err, granted) => {
          if (err) {
            console.error('[mqtt] subscribe error for:', topic, err)
          } else {
            console.log('[mqtt] subscribed:', topic, '→ qos', granted?.[0]?.qos)
          }
        })
      })
    })

    client.on('reconnect', () => setStatus('connecting'))
    client.on('disconnect', () => setStatus('disconnected'))
    client.on('error', (err) => { console.error('[mqtt] error:', err.message); setStatus('error') })
    client.on('offline', () => setStatus('disconnected'))

    client.on('message', (topic, payload) => {
      console.log('[mqtt] message on:', topic, payload.toString())
      try {
        const data = JSON.parse(payload.toString())
        setMessages(prev => ({ ...prev, [topic]: data }))
      } catch {
        console.warn('[mqtt] non-JSON payload on:', topic, payload.toString())
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
