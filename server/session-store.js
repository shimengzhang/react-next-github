const debug = require('debug')('server:session-store')

function getRedisId(sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor(client) {
    this.client = client
  }

  async get(sid) {
    const id = getRedisId(sid)
    console.log('get session', id)
    const data = await this.client.get(`${id}`)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      // debug(`get session: ${sid}`, result.githubAuth, result.user.login)
      return result
    } catch (err) {
      // debug('parse session error:', err)
    }
  }

  async set(sid, sess, ttl) {

    const id = getRedisId(sid)
    console.log('set session', id)
    if (typeof ttl === 'number') {
      // 传入数据库的是’秒‘，但是给外界使用时，希望传入的是’毫秒‘
      ttl = Math.ceil(ttl / 1000)
    }
    
    try{
      debug(`SET ${sid} ${sess}`)
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        // debug(
        //   `SETEX ${sid} ${ttl} ${sess.githubAuth.access_token} ${
        //     sess.user.login
        //   }`,
        // )
        await this.client.setex(id, ttl, sessStr)
      } else {
        // debug(`SETEX ${sid} ${sess.githubAuth.access_token} ${sess.user.login}`)
        await this.client.set(id, sessStr)
      }
      // debug(`SET ${sid} complete`)
    }catch(error){
      console.error(error)
    }
    
  }

  async destroy(sid) {
    const id = getRedisId(sid)
    console.log('del session', id)
    debug(`DEL ${sid}`)
    await this.client.del(id)
    debug(`DEL ${sid} complete`)
  }
}

module.exports = RedisSessionStore
