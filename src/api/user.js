import request from '@/utils/request.js'
import { format } from '@/utils/apiHelp'
export const getBanner = () => {
  return request({
    url: '/api/comic_v2/getproad',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      adgroupid: 123
    }
  })
}
export const getIndexRecomment = () => {
  return request({
    url: '/api/comic_v2/customerview',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      viewtype: 1
    }
  })
}
// https://mhd.zhuishushenqi.com/comic_v2/getproad?apptype=8&appversion=1.0&channel=web-app&adgroupid=125
export const getIndexClassify = () => {
  return request({
    url: '/api/comic_v2/getproad',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      adgroupid: 125
    }
  })
}
// https://mhd.zhuishushenqi.com/comic_v2/comicsfilterlist_v2?apptype=8&appversion=1.0&channel=web-app
export const getTypesList = (subject, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      adgroupid: 125
    },
    data: format({
      subject,
      pageno,
      pagesize
    })
  })
}
// https://mhd.zhuishushenqi.com/comic_v2/comicsrank?apptype=8&appversion=1.0&channel=web-app

export const getRankList = (ranktype, pageno = 1, pagesize = 20) => {
  return request({
    url: '/api/comic_v2/comicsrank',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app'
    },
    data: format({
      ranktype,
      pageno,
      pagesize
    })
  })
}
// https://mhd.zhuishushenqi.com/comic_v2/comicsfilterlist_v2?apptype=8&appversion=1.0&channel=web-app
export const getVip = (pageno = 1, pagesize = 15, special = 892) => {
  return request({
    url: '/api/comic_v2/comicsfilterlist_v2',
    method: 'POST',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app'
    },
    data: format({
      pageno,
      pagesize,
      special
    })
  })
}
// https://mhd.zhuishushenqi.com/comic/hotsearch?apptype=8&appversion=1.0&channel=web-app&appType=8
export const getHotSearch = () => {
  return request({
    url: '/api/comic/hotsearch',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      appType: 8
    }
  })
}
// https://mhd.zhuishushenqi.com/comic_v2/searchindex?apptype=8&appversion=1.0&channel=web-app&name=22&type=2

export const searchIndex = (name) => {
  return request({
    url: '/api/comic_v2/searchindex',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      name,
      type: 2
    }
  })
}
// https://mhd.zhuishushenqi.com/comic_v2/searchbookauthor?apptype=8&appversion=1.0&channel=web-app&name=%E6%9C%BA%E9%95%BF%E5%A4%A7%E4%BA%BA%E8%BD%BB%E7%82%B9%E7%88%B1&type=2&pageno=1&pagesize=100
export const searchResult = (name) => {
  return request({
    url: '/api/comic_v2/searchbookauthor',
    method: 'GET',
    params: {
      apptype: 8,
      appversion: 1.0,
      channel: 'web-app',
      name,
      type: 2,
      pageno: 1,
      pagesize: 100
    }
  })
}
