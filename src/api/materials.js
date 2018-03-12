import { fetch } from '@/api'

const CACHE_KEY = 'materials'

let getOrInitMaterials = () => {
  let materialsJsonStr = localStorage.getItem(CACHE_KEY)
  let materials = {
    page: 1,
    page_size: 20,
    has_next: false,
    count: 0,
    results: []
  }
  if (materialsJsonStr) {
    materials = JSON.parse(materialsJsonStr)
  }
  return materials
}

let getMaterialIds = () => {
  let materials = getOrInitMaterials()
  let materialIds = []
  for (let i = 0; i < materials.results.length; i++) {
    materialIds.push(materials.results[i].id)
  }
  return materialIds
}

export let doFetch = (url, params, user = null) => {
  console.log(`doFetch. url: ${url}, params: ${params}, user: ${user}`)
  console.log("params:" + params)
  return new Promise((resolve, reject) => {
    if (user) {
      return fetch('GET', url, params).then(data => {
        // sync local data to server
        let materialIds = getMaterialIds()
        if (materialIds > 0) {
          fetch('PATCH', '/api/favorites/1/', {data: {
            target_type: 'material',
            target_ids: getMaterialIds()
          }}).then(result => {
            localStorage.removeItem(CACHE_KEY)
            return fetch('GET', url, params).then(data => {
              resolve(data)
            })
          })
        } else {
          resolve(data)
        }
      })
    }
    resolve(getOrInitMaterials())
  })
}

export let saveMaterial = (item, user = null) => {
  if (user) {
    return fetch('POST', '/api/favorites/', {data: {target_type: item.model_name, target_id: item.id}})
  } else {
    return new Promise((resolve, reject) => {
      let materials = getOrInitMaterials()
      materials.results.push(item)
      materials.count += 1
      localStorage.setItem(CACHE_KEY, JSON.stringify(materials))
      resolve(materials)
    })
  }
}

export let removeMaterial = (item, user = null) => {
  if (user) {
    return fetch('GET', '/api/delete_favorite/', {params: {target_type: item.model_name, target_id: item.id}})
  } else {
    return new Promise((resolve, reject) => {
      let materials = getOrInitMaterials()
      let flag = false
      for (let i = 0; i < materials.length; i++) {
        if (materials[i].id === item.id) {
          materials.splice(i, 1)
          flag = true
        }
      }
      if (flag) {
        materials.count -= 1
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(materials))
      resolve(materials)
    })
  }
}

export let getUserFavoriteData = (modelName, sortby, user = null) => {
  if (user) {
    return fetch('GET', `/api/favorites/get_user_favorite/?target_type=${modelName}`, {params: {
      sortby: sortby
    }})
  } else {
    return new Promise((resolve, reject) => {
      resolve({ids: getMaterialIds()})
    })
  }
}
