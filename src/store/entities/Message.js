
import { toNumber } from './util'

export class Message {
    constructor({ SenderUserID, GroupID, ToUserID, MessageType, Content }){
	    this.SenderUserID = toNumber(SenderUserID)
	    this.GroupID = toNumber(GroupID)
	    this.ToUserID = toNumber(ToUserID)
	    this.MessageType = toNumber(MessageType)
	    this.Content = Content
	    this.CreateAt = new Date()
    }
}