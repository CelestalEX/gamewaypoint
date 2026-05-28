const rateLimitMap = new Map<
  string,
  { count: number; lastRequest: number }
>()

export function rateLimit(ip: string) {
  const now = Date.now()
  const windowTime = 60 * 1000 // 1 min
  const maxRequests = 5

  const record = rateLimitMap.get(ip)

  if (record) {
    if (now - record.lastRequest < windowTime) {
      if (record.count >= maxRequests) {
        return false
      }
      record.count++
    } else {
      record.count = 1
      record.lastRequest = now
    }
  } else {
    rateLimitMap.set(ip, {
      count: 1,
      lastRequest: now
    })
  }

  return true
}