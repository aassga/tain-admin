import request from '@/utils/request'
import store from '@/store'

// 取得所有活動資訊
export function getAllActList() {
    return request({
        url: '/prize/listAllAct',
        method: 'get',
    })
}

// 新增活動
export function createAct( data ) {
    return request({
        url: '/prize/createAct',
        method: 'post',
        data
    })
}

// 取得首頁資訊
export function getHomeCount( params ) {
    return request({
        url: '/home/count?actId=' + store.getters.campaign.selected,
        method: 'get',
        params: params
    })
}


// 取得活動配置
export function getActInfo() {
    return request({
        url: '/prize/actInfo/' + store.getters.campaign.selected,
        method: 'get',
    })
}

// 更新活動
export function updateAct( id, data ) {
    return request({
        url: '/prize/updateAct/' + id,
        method: 'post',
        data: data
    })
}

// 取得獎項配置
export function getPrizeList() {
    return request({
        url: '/prize/list/' + store.getters.campaign.selected,
        method: 'get',
    })
}

// 更新獎項
export function updatePrizeAll( data ) {
    return request({
        url: '/prize/updateAll/' + store.getters.campaign.selected,
        method: 'post',
        data: data
    })
}

// 刪除獎項
export function deletePrize( id ) {
    return request({
        url: '/prize/delete/' + id,
        method: 'post',
    })
}

// 取得用戶列表
export function getMemberList( params ) {
    return request({
        url: '/member/list?actId=' + store.getters.campaign.selected,
        method: 'get',
        params: params
    })
}

// 取得用戶資訊
export function getMember( id ) {
    return request({
        url: '/member/' + id,
        method: 'get',
    })
}

// 取得中獎用戶列表
export function getPrizedList( params ) {
    return request({
        url: '/member/prizedlist?actId=' + store.getters.campaign.selected,
        method: 'get',
        params: params
    })
}

// 更新獎品發送進度
export function updatePrizedRemark( data ) {
    return request({
        url: '/member/prizedRemark',
        method: 'post',
        data
    })
}
