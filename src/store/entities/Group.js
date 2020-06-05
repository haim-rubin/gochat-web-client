
import { toNumber } from './util'
export class Group {
    constructor({ ID, Nickname, GroupType }){
        this.ID = toNumber(ID)
        this.Nickname = Nickname
        this.GroupType = toNumber(GroupType)
    }
}